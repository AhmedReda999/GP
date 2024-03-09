import React, { useState, useRef } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';

function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError(''); // Clear any previous errors

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      setError('Passwords must match');
      return;
    }

    setIsLoading(true); // Show loading indicator

    try {
      // Simulate registration using a mock API call (replace with your actual API)
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();

      // Store authentication token or user data in localStorage or state management
      localStorage.setItem('authToken', data.token); // Example token storage

      navigate('/home'); // Redirect to home page after successful registration
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  return (

    <div className="register-container">
      {/* Added Header */}
      <div className="logo_1">
        <header>
          <h1>Travelmania</h1>
        </header>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="register-header">
          <h1>Register</h1>
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="register-form">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" ref={nameRef} required />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" ref={emailRef} required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" ref={passwordRef} required />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            ref={confirmPasswordRef}
            required
          />
          <button type="submit" disabled={isLoading} onClick={navigate("/")}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>

      <footer>
        <span>
          <a href="https://www.gmail.com/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGoogle} />
          </a>
        </span>
        
        <span>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </span>

        <span>
          <a href="https://www.apple.com/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faApple} />
          </a>
        </span>

      </footer>
    </div>
  );
}

export default Register;
