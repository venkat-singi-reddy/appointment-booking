import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer text-white pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row g-4">
          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <i className="bi bi-heart-pulse-fill fs-3 text-warning"></i>
              <h5 className="mb-0 fw-bold">HealthCare<span className="text-warning">Plus</span></h5>
            </div>
            <p className="text-white-50 small">
              Your trusted healthcare partner. We provide world-class medical services
              with compassionate care and cutting-edge technology.
            </p>
            <div className="d-flex gap-2 mt-3">
              {['facebook', 'twitter-x', 'instagram', 'linkedin'].map(icon => (
                <a key={icon} href="#!" className="btn btn-sm btn-outline-light rounded-circle"
                   style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className={`bi bi-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold text-warning mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              {[
                { label: 'Home', to: '/' },
                { label: 'Our Doctors', to: '/doctors' },
                { label: 'Book Appointment', to: '/book' },
                { label: 'My Appointments', to: '/appointments' },
              ].map(link => (
                <li key={link.label} className="mb-2">
                  <Link to={link.to} className="text-white-50 small">
                    <i className="bi bi-chevron-right me-1 small"></i>{link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-warning mb-3">Our Services</h6>
            <ul className="list-unstyled">
              {[
                'Cardiology', 'Neurology', 'Pediatrics',
                'Orthopedics', 'Dermatology', 'General Medicine'
              ].map(service => (
                <li key={service} className="mb-2">
                  <span className="text-white-50 small">
                    <i className="bi bi-dot me-1"></i>{service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-warning mb-3">Contact Us</h6>
            <ul className="list-unstyled">
              <li className="mb-2 text-white-50 small">
                <i className="bi bi-geo-alt me-2 text-warning"></i>
                123 Medical Center Drive, Healthcare City, HC 10001
              </li>
              <li className="mb-2 text-white-50 small">
                <i className="bi bi-telephone me-2 text-warning"></i>
                +1 (555) 000-1234
              </li>
              <li className="mb-2 text-white-50 small">
                <i className="bi bi-envelope me-2 text-warning"></i>
                info@healthcareplus.com
              </li>
              <li className="text-white-50 small">
                <i className="bi bi-clock me-2 text-warning"></i>
                Mon–Fri: 8AM–8PM | Sat: 9AM–5PM
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary mt-4 mb-3" />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-white-50 small mb-2 mb-md-0">
            &copy; {new Date().getFullYear()} HealthCarePlus. All rights reserved.
          </p>
          <p className="text-white-50 small mb-0">
            Built with <i className="bi bi-heart-fill text-danger small"></i> for better healthcare
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
