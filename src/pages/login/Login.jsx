import React, { useState, useRef } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate(); // Use useNavigate to redirect after login

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError(''); // Clear any previous errors

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setIsLoading(true); // Show loading indicator

    try {
      // Simulate authentication using a mock API call (replace with your actual API)
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      // Store authentication token or user data in localStorage or state management
      localStorage.setItem('authToken', data.token); // Example token storage

      navigate('/home'); // Redirect to home page after successful login
    } catch (error) {
      setError('Invalid email or password'); // Set error message
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  return (
    
    <div className="login-container">
      
      <div>
      <form onSubmit={handleSubmit}>
        <div className="login-header">
          <h1>Login</h1>
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="login-form">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            required
          />
          <button type="submit" disabled={isLoading}onClick={navigate("/")}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
