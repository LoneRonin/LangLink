import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Hook for programmatic navigation
import { collection, query, where, getDocs } from 'firebase/firestore';  // Firestore imports
import { sendPasswordResetEmail } from 'firebase/auth';  // Import for Firebase Auth
import { auth, db } from '../firebase';  // import Firestore database and Firebase Auth configuration
import './ForgotPass.css';  // Importing CSS for styling

const Forgotpass = () => {
    // State to store the email input
    const [email, setEmail] = useState("");
    // State to store any errors that might occur
    const [error, setError] = useState(null); 
    // State to store success messages (like successful email sent)
    const [successMessage, setSuccessMessage] = useState(null); 
    

    
    // Function to handle the form submission when the user submits the form
    const handleFormSubmit = async (event) => {
        event.preventDefault();  // Prevent the default form submission behavior
        setError(null);  // Clear previous error state (if any)
        setSuccessMessage(null);  // Clear previous success message (if any)
    
        try {
            // Send the password reset email directly
            await sendPasswordResetEmail(auth, email);
            setSuccessMessage("Password reset email sent successfully!");
            clearMessageAfterDelay();
        } catch (error) {
            // Handle errors and show them to the user
            setError(error.message);
            clearMessageAfterDelay();
        }
    };

    // Function to clear any error or success messages after 5 seconds
    const clearMessageAfterDelay = () => {
        setTimeout(() => {
            setError(null);  // Clear the error state
            setSuccessMessage(null);  // Clear the success message state
        }, 5000);  // Time delay set to 5 seconds (5000 ms)
    };
    // Return HTML elements
    return (
        <div className="forgot-password">
            <h1>Forgot Password</h1>
            {/* Form to handle email input and password reset submission */}
            <form onSubmit={handleFormSubmit}>
                <input 
                    type="email" 
                    placeholder="Enter your email"  // Placeholder for the email input
                    value={email}  // Bind input value to the email state
                    onChange={(e) => setEmail(e.target.value)}  // Update state when input changes
                    required  // Input is required
                />
                <button type="submit">Send Reset Link</button>  {/* Button to submit the form */}
            </form>

            {/* Display error message if an error occurs */}
            {error && (
                <div className="incorrect-message">
                    {error}  {/* Render the error message */}
                </div>
            )}

            {/* Display success message when the reset email is successfully sent */}
            {successMessage && (
                <div className="correct-message">
                    {successMessage}  {/* Render the success message */}
                </div>
            )}

            {/* Link to navigate back to the login page */}
            <div className="login-links">
                <a href="/" >Go to Login Page</a>
            </div>
        </div>
    );
};
export default Forgotpass;  // Export the Forgotpass component
