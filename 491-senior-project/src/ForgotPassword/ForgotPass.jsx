import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './ForgotPass.css'; 

const Forgotpass = () => {
    const navigate = useNavigate();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted');
        // Here you would typically validate the form and send it to the server
        // For now, we'll just redirect to the home page
        navigate('/');
    };

    return (
        <div className="forgot-password">
            <h1>Forgot Password</h1>
            <form onSubmit={handleFormSubmit}>
                <input type="email" placeholder="Enter your email" />
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );
};

export default Forgotpass;
