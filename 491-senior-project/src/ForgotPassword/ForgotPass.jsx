import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // import Firestore database
import './ForgotPass.css'; 

const Forgotpass = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null); // state for handling errors
    const [submitSuccess, setSubmitSuccess] = useState(false); // state for successfully submitting email
    const navigate = useNavigate(); //Initialize useNavigate

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setError(null); // Reset error state
        setSubmitSuccess(false); // Reset success state

        try {
            // Query Firestore to check if the email exists
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                // Email not found
                setError("Email not found.");
                clearMessageAfterDelay(); // Clear the message after 5 seconds
            } else {
                // Email found, proceed with success actions (e.g., send reset link)
                setSubmitSuccess(true);
                clearMessageAfterDelay(); // Clear the message after 5 seconds
                navigate('/forgotpassword'); // Redirect after successfully submitting email
            }
        } catch (err) {
            setError("An error occurred while checking the email.");
            clearMessageAfterDelay(); // Clear the message after 5 seconds
            console.error(err);
        }
    };

    // Function to clear the message after 5 seconds
    const clearMessageAfterDelay = () => {
        setTimeout(() => {
            setError(null);
            setSubmitSuccess(false);
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
            {error && (
                <div className="incorrect-message">
                    {error}
                </div>
            )} {/* Display error message */}
            {submitSuccess && (
                <div className="correct-message">
                    Email found! Reset link sent.
                </div>
            )} {/* Optional success message */}
            <div className="login-links">
                <a href="/" >Go to Login Page</a>
            </div>
        </div>
    );
};

export default Forgotpass;
