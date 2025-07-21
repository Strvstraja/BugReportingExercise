import { useState } from 'react';
import '../styles/BuggyForm.css';

function BuggyForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset previous error
    setError('');
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setError('All fields are required');
      return;
    }
    
    // Intentional bug: This will always throw an error when trying to submit
    try {
      // The intentional bug: trying to access a property that doesn't exist
      const undefinedObject = undefined;
      undefinedObject.property; // This will throw "Cannot read property 'property' of undefined"
      
      // This code will never execute due to the error above
      setSubmitted(true);
      console.log('Form submitted successfully:', formData);
    } catch (err) {
      setError('An error occurred while submitting the form. Please try again later.');
      console.error('Form submission error:', err);
    }
  };

  return (
    <div className="form-container">
      <h2>Contact Form</h2>
      {submitted ? (
        <div className="success-message">
          <p>Form submitted successfully!</p>
          <button onClick={() => setSubmitted(false)}>Submit Another</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows="4"
            />
          </div>
          
          <div className="submit-button-container">
            <button type="submit" className="submit-button">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default BuggyForm;
