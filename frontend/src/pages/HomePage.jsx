import React from 'react';
import './HomePage.css';
import healthImage from '../assets/images/hospital.jpg';

const HomePage = () => {
  return (
    <div className="homepage">

      {/* Hero Section */}
      <section className="hero-section">
        <img src={healthImage} alt="Healthcare System" className="hero-image-full" />
        <div className="hero-text">
          <h1>Smart Health Record System</h1>
          <p>Revolutionizing healthcare with seamless digital patient record management.</p>
        </div>
      </section>

      {/* Core Features */}
      <section className="section">
        <h2>Core Features</h2>
        <div className="stacked-cards">
          <div className="card">
            <h3>Centralized Health Records</h3>
            <p>Access complete medical histories including prescriptions, allergies, and lab results in a unified format.</p>
          </div>
          <div className="card">
            <h3>Real-time Doctor-Patient Sync</h3>
            <p>Facilitates immediate access to records by authorized doctors to improve diagnosis and treatment speed.</p>
          </div>
          <div className="card">
            <h3>Secure & Compliant</h3>
            <p>Adheres to global standards like HIPAA & GDPR to ensure complete data privacy and security.</p>
          </div>
          <div className="card">
            <h3>Seamless Diagnostics Integration</h3>
            <p>Connects with labs and imaging systems for easy upload and retrieval of medical test reports.</p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section">
        <h2>Use Cases</h2>
        <div className="stacked-cards">
          <div className="card">
            <h3>Hospitals & Clinics</h3>
            <p>Replace paper-based files with digital records that streamline treatment workflows and reduce errors.</p>
          </div>
          <div className="card">
            <h3>Rural Health Centers</h3>
            <p>Bridge the gap between urban and rural healthcare with centralized and easily accessible data.</p>
          </div>
          <div className="card">
            <h3>Telemedicine Platforms</h3>
            <p>Enable virtual consultations with instant access to a patient’s full medical history.</p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section">
        <h2>Our Vision</h2>
        <div className="stacked-cards">
          <div className="card">
            <p>
              We envision a healthcare ecosystem where every patient’s medical journey is secure, connected, and accessible from anywhere. By harnessing digital technology, our health record system aims to improve patient outcomes, reduce administrative burdens, and build a smarter future for healthcare delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <h2>What Healthcare Providers Say</h2>
        <div className="stacked-cards">
          <div className="card testimonial-card">
            <p>"The health record system has streamlined our patient care and saved us hours in paperwork."</p>
            <h4>- Dr. Meena, Apollo Care</h4>
          </div>
          <div className="card testimonial-card">
            <p>"A user-friendly and secure platform for maintaining digital medical records."</p>
            <h4>- IT Head, City Health Clinic</h4>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section">
        <div className="cta-card">
          <h2>Start Managing Digital Health Records Today</h2>
          <p>Join the future of healthcare. Book a demo or contact our team for more information.</p>
          <button className="cta-button">Request a Demo</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Health Record System. All rights reserved.</p>
        <p>Contact: support@healthrecords.io</p>
      </footer>
    </div>
  );
};

export default HomePage;
