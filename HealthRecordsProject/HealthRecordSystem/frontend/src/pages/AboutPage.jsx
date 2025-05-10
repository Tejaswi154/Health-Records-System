import React from 'react';
import './AboutPage.css';
import hospitalImage from '../assets/images/hospital-building.jpg';
import visionImage from '../assets/images/vision.jpg';
import servicesImage from '../assets/images/services.jpg';

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <p className="about-intro">
        Welcome to our Health Record Management System — where innovation meets care. 
        Our goal is to digitize health records securely, enabling both patients and healthcare providers 
        to access essential information anytime, anywhere.
      </p>

      <div className="about-boxes">
        {/* Box 1: Hospital Overview */}
        <div className="about-box">
          <img src={hospitalImage} alt="Hospital Building" className="about-box-image" />
          <div className="about-box-content">
            <h2>Our Hospital</h2>
            <p>
              Established in 2005, our hospital is a multi-specialty institution known for 
              excellence in patient care. With 500+ beds, modern ICUs, and modular operation theatres, 
              we serve thousands every month with compassion and technology.
            </p>
          </div>
        </div>

        {/* Box 2: Our Vision */}
        <div className="about-box">
          <img src={visionImage} alt="Our Vision" className="about-box-image" />
          <div className="about-box-content">
            <h2>Our Vision</h2>
            <p>
              To be a trailblazer in healthcare by empowering patients and physicians 
              with a seamless digital health record ecosystem. We aim for preventive care, 
              personalized treatment, and nationwide health access.
            </p>
          </div>
        </div>

        {/* Box 3: Our Services */}
        <div className="about-box">
          <img src={servicesImage} alt="Our Services" className="about-box-image" />
          <div className="about-box-content">
            <h2>Our Services</h2>
            <ul>
              <li>🩺 Outpatient & Inpatient Management</li>
              <li>🧬 Digital Lab Reports & Prescriptions</li>
              <li>🚨 24x7 Emergency & Ambulance Services</li>
              <li>📊 Real-time Health Monitoring Dashboards</li>
              <li>🔐 Secure Cloud-Based Health Records</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Extra Section: Our Mission & Values */}
      <div className="about-extra">
        <h2>Our Mission</h2>
        <p>
          To bridge the gap between traditional healthcare and modern technology, ensuring 
          quality care is accessible, reliable, and data-driven. We believe every individual 
          deserves a health record system that is secure, simple, and empowering.
        </p>

        <h2>Core Values</h2>
        <ul className="core-values">
          <li>❤️ Patient-Centric Care</li>
          <li>🔍 Transparency & Accountability</li>
          <li>🚀 Innovation-Driven Services</li>
          <li>🤝 Ethical & Inclusive Practice</li>
          <li>🔒 Data Security & Privacy First</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
