import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';  // Import for Firebase Auth
import { auth, db } from '../firebase';  // import Firestore database and Firebase Auth
import './ForgotPass.css'; 

const Forgotpass = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null); // state for handling errors
    const [successMessage, setSuccessMessage] = useState(null); // state for success messages
    const navigate = useNavigate(); // Initialize useNavigate

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setError(null); 
        setSuccessMessage(null); 
    
        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                // Email not found
                setError("Email not found.");
                clearMessageAfterDelay(); // Clear the message after 5 seconds
            } else {
                // Email found, proceed to send reset password email
                await sendPasswordResetEmail(auth, email);
                setSuccessMessage("Password reset email sent successfully!");
                clearMessageAfterDelay(); // Clear the message after 5 seconds
            }
        //     await sendPasswordResetEmail(auth, email);
        //     setSuccessMessage("Password reset link has been sent. Please check your email.");
        //     clearMessageAfterDelay();
        } 
            catch (error) {
            setError("An error occurred while sending the reset email.");
            clearMessageAfterDelay();
        }
    };

    // Function to clear the message after 5 seconds
    const clearMessageAfterDelay = () => {
        setTimeout(() => {
            setError(null);
            setSuccessMessage(null);
        }, 5000); // Clear messages after 5 seconds
    };

    return (
        <div className="forgot-password">
            <h1>Forgot Password</h1>
            <form onSubmit={handleFormSubmit}>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <button type="submit">Send Reset Link</button>
            </form>

            {/* Display error message */}
            {error && (
                <div className="incorrect-message">
                    {error}
                </div>
            )}

            {/* Display success message when reset email is sent */}
            {successMessage && (
                <div className="correct-message">
                    {successMessage}
                </div>
            )}

            <div className="login-links">
                <a href="/" >Go to Login Page</a>
            </div>
        </div>
    );
};

export default Forgotpass;
