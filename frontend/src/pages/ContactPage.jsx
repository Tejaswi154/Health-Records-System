import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h1>Reach Out to Us</h1>
      <p className="contact-intro">
        We’re here to assist you. Get in touch with us through the options below.
      </p>

      <div className="contact-container">
        {/* Contact Information */}
        <div className="contact-info">
          <h2>How to Reach Us</h2>
          <p><strong>Location:</strong> 123 Wellness Road, Health City, Country</p>
          <p><strong>Phone:</strong> +1 555 987 6543</p>
          <p><strong>Email:</strong> hello@wellnesscare.com</p>
          <p><strong>Operating Hours:</strong> Monday to Friday, 8:00 AM - 5:00 PM</p>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <h2>Send Us Your Inquiry</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Your Full Name</label>
              <input type="text" id="name" name="name" placeholder="Enter your full name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" name="email" placeholder="Enter your email address" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" placeholder="Let us know how we can assist you" required></textarea>
            </div>
            <button type="submit" className="submit-button">Submit Inquiry</button>
          </form>
        </div>
      </div>

      {/* Why Contact Us Section */}
      <div className="why-contact-us">
        <h2>Why You Should Reach Out</h2>
        <ul>
          <li>Get more information about our health services and treatments.</li>
          <li>Schedule a consultation with one of our experienced healthcare providers.</li>
          <li>Provide valuable feedback to help us enhance your experience.</li>
          <li>Learn about our latest wellness programs and offerings.</li>
        </ul>
      </div>
    </div>
  );
};

export default ContactPage;
