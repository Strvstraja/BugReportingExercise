import { useState, useEffect } from 'react';
import '../styles/RegistrationForm.css';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    age: '',
    gender: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear specific error when user starts typing in that field
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Validate confirm email
    if (!formData.confirmEmail.trim()) {
      newErrors.confirmEmail = 'Please confirm your email';
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Emails do not match';
    }
    
    // Validate age
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else {
      const ageNum = parseInt(formData.age, 10);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        newErrors.age = 'Please enter a valid age';
      } else if (ageNum <= 18) {
        newErrors.age = 'You must be over 18 to register';
      }
    }
    
    // Validate gender
    if (!formData.gender) {
      newErrors.gender = 'Please select a gender option';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid, proceed with submission
      setIsSubmitted(true);
      console.log('Registration form submitted:', formData);
    } else {
      console.log('Form has errors, cannot submit');
    }
  };

  return (
    <div className="registration-container">
      {isSubmitted ? (
        <div className="success-message">
          <h3>Registration Successful!</h3>
          <p>Thank you for registering, {formData.firstName}!</p>
          <button onClick={() => setIsSubmitted(false)}>Register Another</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? 'error' : ''}
            />
            {errors.firstName && <span className="error-text">{errors.firstName}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? 'error' : ''}
            />
            {errors.lastName && <span className="error-text">{errors.lastName}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmEmail">Confirm Email Address</label>
            <input
              type="email"
              id="confirmEmail"
              name="confirmEmail"
              value={formData.confirmEmail}
              onChange={handleChange}
              className={errors.confirmEmail ? 'error' : ''}
            />
            {errors.confirmEmail && <span className="error-text">{errors.confirmEmail}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              min="1"
              max="120"
              value={formData.age}
              onChange={handleChange}
              className={errors.age ? 'error' : ''}
            />
            {errors.age && <span className="error-text">{errors.age}</span>}
          </div>
          
          <div className="form-group">
            <label>Gender</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                />
                Male
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                />
                Female
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="not_specified"
                  checked={formData.gender === 'not_specified'}
                  onChange={handleChange}
                />
                Do not specify
              </label>
            </div>
            {errors.gender && <span className="error-text">{errors.gender}</span>}
          </div>
          
          <div className="submit-button-container">
            <button type="submit" className="register-button">Register</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default RegistrationForm;
