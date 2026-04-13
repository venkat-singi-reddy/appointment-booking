import React from 'react';

function ServiceCard({ icon, title, description, color }) {
  return (
    <div className="service-card card h-100 p-4">
      <div className="card-body text-center">
        <div
          className="service-icon mb-3"
          style={{ background: `linear-gradient(135deg, ${color}20, ${color}40)` }}
        >
          <i className={`bi bi-${icon}`} style={{ color }}></i>
        </div>
        <h5 className="fw-bold mb-2">{title}</h5>
        <p className="text-muted small mb-0">{description}</p>
      </div>
    </div>
  );
}

export default ServiceCard;
