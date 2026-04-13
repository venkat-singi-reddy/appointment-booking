import React, { useState } from 'react';
import { appointmentAPI } from '../services/api';

const STATUS_STYLES = {
  PENDING: { bg: 'status-pending', icon: 'clock' },
  CONFIRMED: { bg: 'status-confirmed', icon: 'check-circle' },
  CANCELLED: { bg: 'status-cancelled', icon: 'x-circle' },
  COMPLETED: { bg: 'status-completed', icon: 'check2-circle' },
};

function MyAppointments() {
  const [email, setEmail] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);

  const handleSearch = async e => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError('');
    setSearched(false);

    try {
      const res = await appointmentAPI.getByPatientEmail(email.trim());
      setAppointments(res.data);
      setSearchEmail(email.trim());
      setSearched(true);
    } catch (err) {
      setError(err.response?.status === 404
        ? 'No appointments found for this email address.'
        : 'Failed to load appointments. Please try again.');
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    setCancellingId(id);
    try {
      await appointmentAPI.cancel(id);
      setAppointments(appointments.map(a =>
        a.id === id ? { ...a, status: 'CANCELLED' } : a
      ));
    } catch (err) {
      setError('Failed to cancel appointment. Please try again.');
    } finally {
      setCancellingId(null);
    }
  };

  const active = appointments.filter(a => !['CANCELLED', 'COMPLETED'].includes(a.status));
  const past = appointments.filter(a => ['CANCELLED', 'COMPLETED'].includes(a.status));

  return (
    <>
      {/* Page Header */}
      <div style={{ background: 'linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)', padding: '4rem 0' }}>
        <div className="container text-white text-center">
          <h1 className="fw-bold mb-2">My Appointments</h1>
          <p className="text-white-50 mb-0">View and manage your scheduled appointments</p>
        </div>
      </div>

      <div className="container py-5">
        {/* Email Search */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-3 p-4">
              <h5 className="fw-bold mb-3 text-center">
                <i className="bi bi-search me-2 text-primary"></i>Look Up Your Appointments
              </h5>
              <form onSubmit={handleSearch}>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                    {loading ? (
                      <span className="spinner-border spinner-border-sm" role="status"></span>
                    ) : (
                      <><i className="bi bi-search me-1"></i>Search</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-warning d-flex align-items-center justify-content-center mb-4">
            <i className="bi bi-info-circle me-2"></i>{error}
          </div>
        )}

        {searched && !error && (
          <>
            {appointments.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-calendar-x text-muted" style={{ fontSize: '4rem' }}></i>
                <h4 className="mt-3 text-muted">No appointments found</h4>
                <p className="text-muted">No appointments found for <strong>{searchEmail}</strong></p>
              </div>
            ) : (
              <>
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h5 className="fw-bold mb-0">
                    Appointments for <span className="text-primary">{searchEmail}</span>
                  </h5>
                  <span className="badge bg-primary rounded-pill px-3 py-2">
                    {appointments.length} total
                  </span>
                </div>

                {/* Active Appointments */}
                {active.length > 0 && (
                  <div className="mb-5">
                    <h6 className="fw-bold text-success mb-3">
                      <i className="bi bi-calendar-check me-2"></i>Upcoming Appointments
                      <span className="badge bg-success ms-2 rounded-pill">{active.length}</span>
                    </h6>
                    <div className="row g-3">
                      {active.map(appt => (
                        <AppointmentCard
                          key={appt.id}
                          appointment={appt}
                          onCancel={handleCancel}
                          cancellingId={cancellingId}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Past Appointments */}
                {past.length > 0 && (
                  <div>
                    <h6 className="fw-bold text-muted mb-3">
                      <i className="bi bi-clock-history me-2"></i>Past Appointments
                      <span className="badge bg-secondary ms-2 rounded-pill">{past.length}</span>
                    </h6>
                    <div className="row g-3">
                      {past.map(appt => (
                        <AppointmentCard
                          key={appt.id}
                          appointment={appt}
                          onCancel={handleCancel}
                          cancellingId={cancellingId}
                          isPast
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {!searched && !error && (
          <div className="text-center py-5">
            <i className="bi bi-calendar3 text-muted" style={{ fontSize: '4rem' }}></i>
            <h4 className="mt-3 text-muted">Enter your email to view appointments</h4>
            <p className="text-muted">We'll show all appointments associated with your email address</p>
          </div>
        )}
      </div>
    </>
  );
}

function AppointmentCard({ appointment, onCancel, cancellingId, isPast = false }) {
  const style = STATUS_STYLES[appointment.status] || STATUS_STYLES.PENDING;
  const isCancelling = cancellingId === appointment.id;

  return (
    <div className="col-lg-6">
      <div className={`card border-0 shadow-sm rounded-3 h-100 ${isPast ? 'opacity-75' : ''}`}>
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h6 className="fw-bold mb-1">{appointment.doctorName}</h6>
              <small className="text-muted">{appointment.doctorSpecialization}</small>
            </div>
            <span className={`badge ${style.bg} px-3 py-2 rounded-pill`}>
              <i className={`bi bi-${style.icon} me-1`}></i>
              {appointment.status}
            </span>
          </div>

          <div className="row g-2 mb-3">
            <div className="col-6">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-calendar3 text-primary"></i>
                <div>
                  <small className="text-muted d-block">Date</small>
                  <small className="fw-600">{appointment.appointmentDate}</small>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-clock text-primary"></i>
                <div>
                  <small className="text-muted d-block">Time</small>
                  <small className="fw-600">{appointment.appointmentTime?.substring(0, 5)}</small>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-tag text-primary"></i>
                <div>
                  <small className="text-muted d-block">Type</small>
                  <small className="fw-600">{appointment.appointmentType?.replace(/_/g, ' ')}</small>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-hash text-primary"></i>
                <div>
                  <small className="text-muted d-block">Appt. ID</small>
                  <small className="fw-600">#{appointment.id}</small>
                </div>
              </div>
            </div>
          </div>

          {appointment.symptoms && (
            <div className="bg-light rounded-2 p-2 mb-3">
              <small className="text-muted"><strong>Symptoms:</strong> {appointment.symptoms}</small>
            </div>
          )}

          {!isPast && appointment.status !== 'CANCELLED' && (
            <button
              className="btn btn-sm btn-outline-danger w-100"
              style={{ borderRadius: '8px' }}
              onClick={() => onCancel(appointment.id)}
              disabled={isCancelling}
            >
              {isCancelling ? (
                <><span className="spinner-border spinner-border-sm me-2"></span>Cancelling...</>
              ) : (
                <><i className="bi bi-x-circle me-2"></i>Cancel Appointment</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAppointments;
