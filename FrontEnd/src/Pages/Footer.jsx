import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const subject = e.target.subject.value;
    const message = e.target.message.value;
    
    window.location.href = `mailto:support@finspectre.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`)}`;
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <button 
          className="footer-btn"
          onClick={() => setShowForm(!showForm)}
        >
          Contact Us
        </button>
        <div className="copyright">
          ©️ 2024 FinSpectre. All rights reserved.
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="close-btn"
              onClick={() => setShowForm(false)}
            >
              &times;
            </button>
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Contact Us</h3>
              <div className="form-group">
                <input type="text" name="name" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="text" name="subject" placeholder="Subject" required />
              </div>
              <div className="form-group1">
                <textarea name="message" placeholder="Your Message" required></textarea>
              </div>
              <button type="submit" className="footer-btn">Send Message</button>
            </form>
          </div>
        </div>
      )}
    </footer>


  );
};

export default Footer;
