import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top"
         style={{ background: 'linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)' }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <i className="bi bi-heart-pulse-fill text-white fs-4"></i>
          <span>HealthCare<span className="text-warning">Plus</span></span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-1">
            <li className="nav-item">
              <Link
                className={`nav-link px-3 rounded-3 fw-500 ${isActive('/') ? 'active bg-white bg-opacity-20' : ''}`}
                to="/"
                onClick={() => setExpanded(false)}
              >
                <i className="bi bi-house me-1"></i>Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link px-3 rounded-3 ${isActive('/doctors') ? 'active bg-white bg-opacity-20' : ''}`}
                to="/doctors"
                onClick={() => setExpanded(false)}
              >
                <i className="bi bi-person-badge me-1"></i>Our Doctors
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link px-3 rounded-3 ${isActive('/appointments') ? 'active bg-white bg-opacity-20' : ''}`}
                to="/appointments"
                onClick={() => setExpanded(false)}
              >
                <i className="bi bi-calendar-check me-1"></i>My Appointments
              </Link>
            </li>
            <li className="nav-item ms-lg-2">
              <Link
                className="btn btn-warning fw-600 px-4 text-dark"
                to="/book"
                onClick={() => setExpanded(false)}
                style={{ borderRadius: '8px', fontWeight: '600' }}
              >
                <i className="bi bi-calendar-plus me-1"></i>Book Now
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
