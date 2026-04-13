import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doctorAPI, patientAPI, appointmentAPI } from '../services/api';

const APPOINTMENT_TYPES = [
  'General Consultation',
  'Follow-up Visit',
  'Emergency',
  'Routine Check-up',
  'Second Opinion',
];

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
];

function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState(null);

  const [patientForm, setPatientForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
  });

  const [appointmentForm, setAppointmentForm] = useState({
    doctorId: doctorId || '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: 'General Consultation',
    symptoms: '',
    notes: '',
  });

  useEffect(() => {
    doctorAPI.getAvailable()
      .then(res => setDoctors(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError('Failed to load doctors'));
  }, []);

  useEffect(() => {
    if (doctorId) {
      setAppointmentForm(prev => ({ ...prev, doctorId }));
    }
  }, [doctorId]);

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const selectedDoctor = doctors.find(d => d.id === parseInt(appointmentForm.doctorId));

  const handlePatientChange = e => {
    setPatientForm({ ...patientForm, [e.target.name]: e.target.value });
  };

  const handleAppointmentChange = e => {
    setAppointmentForm({ ...appointmentForm, [e.target.name]: e.target.value });
  };

  const handlePatientSubmit = e => {
    e.preventDefault();
    setError('');
    if (!patientForm.firstName || !patientForm.lastName || !patientForm.email) {
      setError('Please fill in all required fields.');
      return;
    }
    setStep(2);
  };

  const handleAppointmentSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!appointmentForm.doctorId || !appointmentForm.appointmentDate || !appointmentForm.appointmentTime) {
      setError('Please select a doctor, date, and time slot.');
      return;
    }

    setLoading(true);
    try {
      // Create or find patient
      const patientRes = await patientAPI.createOrFind(patientForm);
      const patient = patientRes.data;

      // Book appointment
      const payload = {
        doctorId: parseInt(appointmentForm.doctorId),
        patientId: patient.id,
        appointmentDate: appointmentForm.appointmentDate,
        appointmentTime: appointmentForm.appointmentTime + ':00',
        appointmentType: appointmentForm.appointmentType.toUpperCase().replace(/\s+/g, '_'),
        symptoms: appointmentForm.symptoms,
        notes: appointmentForm.notes,
      };

      const res = await appointmentAPI.book(payload);
      setBookedAppointment(res.data);
      setSuccess(true);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success && step === 3) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="booking-form-card card text-center p-5">
              <div className="mb-4">
                <div style={{
                  width: '80px', height: '80px',
                  background: 'linear-gradient(135deg, #43a047, #66bb6a)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto'
                }}>
                  <i className="bi bi-check-lg text-white" style={{ fontSize: '2.5rem' }}></i>
                </div>
              </div>
              <h2 className="fw-bold text-success mb-2">Appointment Booked!</h2>
              <p className="text-muted mb-4">Your appointment has been successfully scheduled.</p>

              {bookedAppointment && (
                <div className="card bg-light border-0 rounded-3 p-4 mb-4 text-start">
                  <div className="row g-2">
                    <div className="col-6">
                      <small className="text-muted d-block">Doctor</small>
                      <strong className="small">{bookedAppointment.doctorName}</strong>
                    </div>
                    <div className="col-6">
                      <small className="text-muted d-block">Specialty</small>
                      <strong className="small">{bookedAppointment.doctorSpecialization}</strong>
                    </div>
                    <div className="col-6">
                      <small className="text-muted d-block">Date</small>
                      <strong className="small">{bookedAppointment.appointmentDate}</strong>
                    </div>
                    <div className="col-6">
                      <small className="text-muted d-block">Time</small>
                      <strong className="small">{bookedAppointment.appointmentTime?.substring(0, 5)}</strong>
                    </div>
                    <div className="col-12">
                      <small className="text-muted d-block">Status</small>
                      <span className="badge bg-warning text-dark">
                        {bookedAppointment.status}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="d-flex gap-3 justify-content-center">
                <button className="btn btn-outline-primary" onClick={() => {
                  setStep(1); setSuccess(false); setPatientForm({
                    firstName: '', lastName: '', email: '', phone: '',
                    dateOfBirth: '', gender: ''
                  });
                  setAppointmentForm({
                    doctorId: doctorId || '', appointmentDate: '',
                    appointmentTime: '', appointmentType: 'General Consultation',
                    symptoms: '', notes: ''
                  });
                }}>
                  <i className="bi bi-calendar-plus me-2"></i>Book Another
                </button>
                <button className="btn btn-primary" onClick={() => navigate('/appointments')}>
                  <i className="bi bi-list-check me-2"></i>View Appointments
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <div style={{ background: 'linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)', padding: '4rem 0' }}>
        <div className="container text-white text-center">
          <h1 className="fw-bold mb-2">Book an Appointment</h1>
          <p className="text-white-50 mb-0">Fill in your details to schedule your visit</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Progress Steps */}
            <div className="d-flex align-items-center justify-content-center mb-5">
              {[
                { num: 1, label: 'Patient Info' },
                { num: 2, label: 'Appointment' },
              ].map((s, idx) => (
                <React.Fragment key={s.num}>
                  <div className="text-center">
                    <div style={{
                      width: '44px', height: '44px',
                      borderRadius: '50%',
                      background: step >= s.num
                        ? 'linear-gradient(135deg, #1976d2, #42a5f5)'
                        : '#e0e0e0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: step >= s.num ? 'white' : '#9e9e9e',
                      fontWeight: '700', margin: '0 auto 4px',
                      fontSize: '1rem'
                    }}>
                      {step > s.num ? <i className="bi bi-check-lg"></i> : s.num}
                    </div>
                    <small className={step >= s.num ? 'text-primary fw-600' : 'text-muted'}>{s.label}</small>
                  </div>
                  {idx < 1 && (
                    <div style={{
                      height: '2px', flex: 1,
                      background: step > 1 ? 'linear-gradient(90deg, #1976d2, #42a5f5)' : '#e0e0e0',
                      margin: '0 12px', marginBottom: '24px'
                    }}></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {error && (
              <div className="alert alert-danger d-flex align-items-center mb-4">
                <i className="bi bi-exclamation-triangle me-2"></i>{error}
              </div>
            )}

            <div className="booking-form-card card">
              <div className="card-body p-4 p-md-5">
                {/* Step 1: Patient Info */}
                {step === 1 && (
                  <form onSubmit={handlePatientSubmit}>
                    <h4 className="fw-bold mb-4">
                      <i className="bi bi-person-circle me-2 text-primary"></i>Your Information
                    </h4>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-600">First Name <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="firstName"
                          className="form-control"
                          placeholder="John"
                          value={patientForm.firstName}
                          onChange={handlePatientChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-600">Last Name <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="lastName"
                          className="form-control"
                          placeholder="Doe"
                          value={patientForm.lastName}
                          onChange={handlePatientChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-600">Email Address <span className="text-danger">*</span></label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="john.doe@example.com"
                          value={patientForm.email}
                          onChange={handlePatientChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-600">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          className="form-control"
                          placeholder="+1 (555) 000-0000"
                          value={patientForm.phone}
                          onChange={handlePatientChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-600">Date of Birth</label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          className="form-control"
                          value={patientForm.dateOfBirth}
                          onChange={handlePatientChange}
                          max={today}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-600">Gender</label>
                        <select name="gender" className="form-select" value={patientForm.gender} onChange={handlePatientChange}>
                          <option value="">Select gender</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                      <button type="submit" className="btn btn-primary px-5 py-2">
                        Next: Select Appointment <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </form>
                )}

                {/* Step 2: Appointment Details */}
                {step === 2 && (
                  <form onSubmit={handleAppointmentSubmit}>
                    <h4 className="fw-bold mb-4">
                      <i className="bi bi-calendar-heart me-2 text-primary"></i>Appointment Details
                    </h4>
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label fw-600">Select Doctor <span className="text-danger">*</span></label>
                        <select
                          name="doctorId"
                          className="form-select"
                          value={appointmentForm.doctorId}
                          onChange={handleAppointmentChange}
                          required
                        >
                          <option value="">Choose a doctor...</option>
                          {doctors.map(d => (
                            <option key={d.id} value={d.id}>
                              Dr. {d.firstName} {d.lastName} — {d.specialization}
                            </option>
                          ))}
                        </select>
                        {selectedDoctor && (
                          <div className="d-flex align-items-center gap-2 mt-2 p-2 bg-light rounded-3">
                            <div style={{
                              width: '40px', height: '40px', borderRadius: '50%',
                              background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: 'white', fontWeight: '700', fontSize: '0.8rem', minWidth: '40px'
                            }}>
                              {selectedDoctor.firstName[0]}{selectedDoctor.lastName[0]}
                            </div>
                            <div>
                              <div className="fw-bold small">Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}</div>
                              <div className="text-muted small">{selectedDoctor.qualification} · {selectedDoctor.experience}</div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-600">Appointment Date <span className="text-danger">*</span></label>
                        <input
                          type="date"
                          name="appointmentDate"
                          className="form-control"
                          value={appointmentForm.appointmentDate}
                          onChange={handleAppointmentChange}
                          min={today}
                          max={maxDateStr}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-600">Appointment Type <span className="text-danger">*</span></label>
                        <select
                          name="appointmentType"
                          className="form-select"
                          value={appointmentForm.appointmentType}
                          onChange={handleAppointmentChange}
                        >
                          {APPOINTMENT_TYPES.map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-600">Select Time Slot <span className="text-danger">*</span></label>
                        <div className="d-flex flex-wrap gap-2 mt-1">
                          {TIME_SLOTS.map(slot => (
                            <button
                              key={slot}
                              type="button"
                              className={`btn btn-sm ${appointmentForm.appointmentTime === slot
                                ? 'btn-primary'
                                : 'btn-outline-secondary'}`}
                              style={{ minWidth: '72px', borderRadius: '8px' }}
                              onClick={() => setAppointmentForm({ ...appointmentForm, appointmentTime: slot })}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                        {!appointmentForm.appointmentTime && (
                          <small className="text-muted mt-1 d-block">Please select a time slot</small>
                        )}
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-600">Symptoms / Reason for Visit</label>
                        <textarea
                          name="symptoms"
                          className="form-control"
                          rows="3"
                          placeholder="Describe your symptoms or reason for this appointment..."
                          value={appointmentForm.symptoms}
                          onChange={handleAppointmentChange}
                        ></textarea>
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-600">Additional Notes</label>
                        <textarea
                          name="notes"
                          className="form-control"
                          rows="2"
                          placeholder="Any additional information for the doctor..."
                          value={appointmentForm.notes}
                          onChange={handleAppointmentChange}
                        ></textarea>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                      <button type="button" className="btn btn-outline-secondary px-4" onClick={() => setStep(1)}>
                        <i className="bi bi-arrow-left me-2"></i>Back
                      </button>
                      <button type="submit" className="btn btn-primary px-5 py-2" disabled={loading}>
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Booking...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-calendar-check me-2"></i>Confirm Appointment
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookAppointment;
