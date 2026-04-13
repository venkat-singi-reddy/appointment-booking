import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doctorAPI } from '../services/api';
import DoctorCard from '../components/DoctorCard';

const SPECIALIZATIONS = [
  'All', 'Cardiology', 'Neurology', 'Pediatrics',
  'Orthopedics', 'Dermatology', 'General Medicine',
];

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    doctorAPI.getAll()
      .then(res => {
        setDoctors(res.data);
        setFiltered(res.data);
      })
      .catch(() => setError('Failed to load doctors. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = doctors;
    if (selectedSpec !== 'All') {
      result = result.filter(d =>
        d.specialization?.toLowerCase() === selectedSpec.toLowerCase()
      );
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(d =>
        `${d.firstName} ${d.lastName}`.toLowerCase().includes(term) ||
        d.specialization?.toLowerCase().includes(term)
      );
    }
    setFiltered(result);
  }, [selectedSpec, searchTerm, doctors]);

  return (
    <>
      {/* Page Header */}
      <div style={{ background: 'linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)', padding: '4rem 0' }}>
        <div className="container text-white text-center">
          <h1 className="fw-bold mb-2">Our Medical Specialists</h1>
          <p className="text-white-50 mb-0">Meet our team of highly qualified and experienced doctors</p>
        </div>
      </div>

      <div className="container py-5">
        {/* Search & Filter */}
        <div className="row g-3 mb-5">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-wrap gap-2">
              {SPECIALIZATIONS.map(spec => (
                <button
                  key={spec}
                  className={`btn btn-sm ${selectedSpec === spec ? 'btn-primary' : 'btn-outline-secondary'}`}
                  style={{ borderRadius: '20px' }}
                  onClick={() => setSelectedSpec(spec)}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        {!loading && !error && (
          <p className="text-muted mb-4">
            Showing <strong>{filtered.length}</strong> doctor{filtered.length !== 1 ? 's' : ''}
            {selectedSpec !== 'All' && ` in ${selectedSpec}`}
          </p>
        )}

        {/* Content */}
        {loading ? (
          <div className="spinner-container">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center">
            <i className="bi bi-exclamation-circle me-2"></i>{error}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-person-x text-muted" style={{ fontSize: '4rem' }}></i>
            <h4 className="mt-3 text-muted">No doctors found</h4>
            <p className="text-muted">Try adjusting your search or filter criteria</p>
            <button className="btn btn-outline-primary" onClick={() => { setSearchTerm(''); setSelectedSpec('All'); }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {filtered.map(doctor => (
              <div key={doctor.id} className="col-lg-4 col-md-6">
                <DoctorCard doctor={doctor} />
              </div>
            ))}
          </div>
        )}

        {/* Book CTA */}
        {!loading && !error && filtered.length > 0 && (
          <div className="text-center mt-5">
            <Link to="/book" className="btn btn-primary btn-lg px-5" style={{ borderRadius: '12px' }}>
              <i className="bi bi-calendar-plus me-2"></i>Book an Appointment
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Doctors;
