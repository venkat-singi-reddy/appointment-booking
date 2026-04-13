import React from 'react';
import { Link } from 'react-router-dom';

function DoctorCard({ doctor }) {
  const initials = `${doctor.firstName?.[0] || ''}${doctor.lastName?.[0] || ''}`;

  return (
    <div className="doctor-card card h-100">
      <div className="card-body text-center p-4">
        {doctor.profileImage ? (
          <img
            src={doctor.profileImage}
            alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
            className="doctor-avatar mb-3"
          />
        ) : (
          <div className="doctor-avatar-placeholder mb-3">{initials}</div>
        )}

        <h5 className="fw-bold mb-1">
          Dr. {doctor.firstName} {doctor.lastName}
        </h5>
        <span className="badge-specialization d-inline-block mb-2">
          {doctor.specialization}
        </span>

        {doctor.qualification && (
          <p className="text-muted small mb-1">
            <i className="bi bi-mortarboard me-1"></i>{doctor.qualification}
          </p>
        )}
        {doctor.experience && (
          <p className="text-muted small mb-2">
            <i className="bi bi-briefcase me-1"></i>{doctor.experience} experience
          </p>
        )}

        {doctor.bio && (
          <p className="text-muted small mb-3" style={{ lineHeight: '1.5' }}>
            {doctor.bio.length > 100 ? `${doctor.bio.substring(0, 100)}...` : doctor.bio}
          </p>
        )}

        <div className="d-flex align-items-center justify-content-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map(star => (
            <i key={star} className="bi bi-star-fill text-warning small"></i>
          ))}
          <span className="text-muted small ms-1">(4.9)</span>
        </div>

        <div className="d-flex align-items-center justify-content-center mb-3">
          <span className={`badge ${doctor.available ? 'bg-success' : 'bg-secondary'} rounded-pill`}>
            <i className={`bi bi-${doctor.available ? 'check-circle' : 'x-circle'} me-1`}></i>
            {doctor.available ? 'Available' : 'Unavailable'}
          </span>
        </div>

        <Link
          to={`/book/${doctor.id}`}
          className="btn btn-primary w-100"
          style={{ borderRadius: '8px' }}
        >
          <i className="bi bi-calendar-plus me-2"></i>Book Appointment
        </Link>
      </div>
    </div>
  );
}

export default DoctorCard;
