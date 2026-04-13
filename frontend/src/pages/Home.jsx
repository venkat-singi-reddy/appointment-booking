import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doctorAPI } from '../services/api';
import DoctorCard from '../components/DoctorCard';
import ServiceCard from '../components/ServiceCard';

const SERVICES = [
  {
    icon: 'heart-pulse',
    title: 'Cardiology',
    description: 'Expert cardiac care, from preventive screenings to advanced heart disease treatment.',
    color: '#e53935',
  },
  {
    icon: 'activity',
    title: 'Neurology',
    description: 'Comprehensive neurological care for brain, spine, and nervous system conditions.',
    color: '#8e24aa',
  },
  {
    icon: 'person-hearts',
    title: 'Pediatrics',
    description: 'Dedicated child healthcare focusing on growth, development, and wellness.',
    color: '#43a047',
  },
  {
    icon: 'bandaid',
    title: 'Orthopedics',
    description: 'Specialized care for bones, joints, muscles, and sports-related injuries.',
    color: '#fb8c00',
  },
  {
    icon: 'eyeglasses',
    title: 'Dermatology',
    description: 'Advanced skin care treatments for medical and cosmetic dermatology needs.',
    color: '#00acc1',
  },
  {
    icon: 'clipboard2-pulse',
    title: 'General Medicine',
    description: 'Primary care services for all ages including check-ups and health management.',
    color: '#1e88e5',
  },
];

const TESTIMONIALS = [
  {
    name: 'Jennifer Adams',
    text: 'HealthCarePlus made it so easy to book my appointment. The doctors are incredibly professional and caring.',
    rating: 5,
    avatar: 'JA',
  },
  {
    name: 'Marcus Rodriguez',
    text: 'I was able to find the right specialist and get an appointment the same week. Excellent service!',
    rating: 5,
    avatar: 'MR',
  },
  {
    name: 'Sophie Chen',
    text: 'The online booking system is seamless and the reminder notifications are very helpful.',
    rating: 5,
    avatar: 'SC',
  },
];

function Home() {
  const [featuredDoctors, setFeaturedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    doctorAPI.getAvailable()
      .then(res => setFeaturedDoctors(res.data.slice(0, 3)))
      .catch(() => setFeaturedDoctors([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section text-white">
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="mb-4">
                <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-600 mb-3 d-inline-block">
                  <i className="bi bi-shield-check me-1"></i>Trusted Healthcare Provider
                </span>
              </div>
              <h1 className="hero-title text-white mb-4">
                Your Health Is Our<br />
                <span className="text-warning">Top Priority</span>
              </h1>
              <p className="hero-subtitle text-white-50 mb-5">
                Book appointments with top-rated specialists in minutes.
                Experience world-class healthcare with compassionate, personalized care
                for you and your family.
              </p>
              <div className="d-flex flex-wrap gap-3 mb-5">
                <Link to="/book" className="btn btn-warning btn-lg fw-bold px-5 py-3 text-dark"
                      style={{ borderRadius: '12px' }}>
                  <i className="bi bi-calendar-plus me-2"></i>Book Appointment
                </Link>
                <Link to="/doctors" className="btn btn-outline-light btn-lg px-5 py-3"
                      style={{ borderRadius: '12px' }}>
                  <i className="bi bi-people me-2"></i>Our Doctors
                </Link>
              </div>

              {/* Stats */}
              <div className="hero-stats">
                <div className="row g-3 text-center">
                  {[
                    { value: '50+', label: 'Expert Doctors' },
                    { value: '10K+', label: 'Happy Patients' },
                    { value: '15+', label: 'Specialties' },
                    { value: '24/7', label: 'Support' },
                  ].map(stat => (
                    <div key={stat.label} className="col-3">
                      <div className="fw-bold fs-4 text-warning">{stat.value}</div>
                      <div className="text-white-50 small">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-5 d-none d-lg-block text-center">
              <div className="position-relative">
                <div style={{
                  width: '420px',
                  height: '420px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255,255,255,0.2)'
                }}>
                  <i className="bi bi-hospital text-white" style={{ fontSize: '10rem', opacity: 0.8 }}></i>
                </div>
                {/* Floating cards */}
                <div className="position-absolute top-0 end-0 bg-white rounded-3 shadow p-3"
                     style={{ minWidth: '160px' }}>
                  <div className="d-flex align-items-center gap-2">
                    <div className="rounded-circle bg-success d-flex align-items-center justify-content-center"
                         style={{ width: '36px', height: '36px', minWidth: '36px' }}>
                      <i className="bi bi-check-lg text-white"></i>
                    </div>
                    <div>
                      <div className="fw-bold text-dark small">Appointment</div>
                      <div className="text-success small">Confirmed!</div>
                    </div>
                  </div>
                </div>
                <div className="position-absolute bottom-0 start-0 bg-white rounded-3 shadow p-3"
                     style={{ minWidth: '160px' }}>
                  <div className="d-flex align-items-center gap-2">
                    <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center"
                         style={{ width: '36px', height: '36px', minWidth: '36px' }}>
                      <i className="bi bi-star-fill text-white small"></i>
                    </div>
                    <div>
                      <div className="fw-bold text-dark small">Rating</div>
                      <div className="text-primary small">4.9 / 5.0 ⭐</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5 bg-light">
        <div className="container py-3">
          <div className="text-center mb-5">
            <h2 className="section-title">How It Works</h2>
            <div className="section-divider mx-auto"></div>
            <p className="text-muted mt-3">Book your appointment in 3 simple steps</p>
          </div>
          <div className="row g-4 justify-content-center">
            {[
              { step: '01', icon: 'search', title: 'Find a Doctor', desc: 'Browse our network of specialist doctors by specialty or name.' },
              { step: '02', icon: 'calendar3', title: 'Book Appointment', desc: 'Select your preferred date and time slot from available options.' },
              { step: '03', icon: 'check-circle', title: 'Get Confirmation', desc: 'Receive instant confirmation and reminders for your appointment.' },
            ].map((item, idx) => (
              <div key={idx} className="col-md-4">
                <div className="text-center p-4">
                  <div className="position-relative d-inline-block mb-4">
                    <div style={{
                      width: '80px', height: '80px',
                      background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto'
                    }}>
                      <i className={`bi bi-${item.icon} text-white`} style={{ fontSize: '1.8rem' }}></i>
                    </div>
                    <span className="position-absolute top-0 start-100 translate-middle badge bg-warning text-dark fw-bold rounded-circle"
                          style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.step}
                    </span>
                  </div>
                  <h5 className="fw-bold mb-2">{item.title}</h5>
                  <p className="text-muted small">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-5">
        <div className="container py-3">
          <div className="text-center mb-5">
            <h2 className="section-title">Our Medical Services</h2>
            <div className="section-divider mx-auto"></div>
            <p className="text-muted mt-3 mx-auto" style={{ maxWidth: '600px' }}>
              We offer a comprehensive range of medical specialties, ensuring you receive
              the right care from the right specialist.
            </p>
          </div>
          <div className="row g-4">
            {SERVICES.map((service, idx) => (
              <div key={idx} className="col-lg-4 col-md-6">
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-5 bg-light">
        <div className="container py-3">
          <div className="text-center mb-5">
            <h2 className="section-title">Meet Our Specialists</h2>
            <div className="section-divider mx-auto"></div>
            <p className="text-muted mt-3">Our team of highly qualified and experienced medical professionals</p>
          </div>

          {loading ? (
            <div className="spinner-container">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {featuredDoctors.map(doctor => (
                <div key={doctor.id} className="col-lg-4 col-md-6">
                  <DoctorCard doctor={doctor} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-5">
            <Link to="/doctors" className="btn btn-outline-primary btn-lg px-5"
                  style={{ borderRadius: '12px' }}>
              <i className="bi bi-people me-2"></i>View All Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <div className="container py-3">
          <div className="text-center mb-5">
            <h2 className="section-title">What Our Patients Say</h2>
            <div className="section-divider mx-auto"></div>
          </div>
          <div className="row g-4">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="col-md-4">
                <div className="testimonial-card card h-100 p-4">
                  <div className="card-body">
                    <div className="d-flex gap-1 mb-3">
                      {[...Array(t.rating)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill text-warning"></i>
                      ))}
                    </div>
                    <p className="text-muted mb-4">"{t.text}"</p>
                    <div className="d-flex align-items-center gap-3">
                      <div style={{
                        width: '48px', height: '48px',
                        background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: '700', fontSize: '0.9rem'
                      }}>
                        {t.avatar}
                      </div>
                      <div>
                        <div className="fw-bold small">{t.name}</div>
                        <div className="text-muted small">Verified Patient</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #1976d2, #0d47a1)' }}>
        <div className="container py-3 text-center text-white">
          <h2 className="fw-bold mb-3" style={{ fontSize: '2.5rem' }}>
            Ready to Take Care of Your Health?
          </h2>
          <p className="text-white-50 mb-4 mx-auto" style={{ maxWidth: '500px', fontSize: '1.1rem' }}>
            Schedule your appointment today and take the first step towards better health.
          </p>
          <Link to="/book" className="btn btn-warning btn-lg fw-bold px-5 py-3 text-dark"
                style={{ borderRadius: '12px' }}>
            <i className="bi bi-calendar-heart me-2"></i>Book Your Appointment
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
