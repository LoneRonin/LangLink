import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Your Firestore initialization
import { useNavigate } from 'react-router-dom';
import './LanguageSelection.css';

const LanguageSelection = () => {
  const [formData, setFormData] = useState({
    language: '',
    difficulty: '',
    country: '',
    aboutMe: ''
  });
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        // Update Firestore with the language selection data
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
          language: formData.language,
          difficulty: formData.difficulty,
          country: formData.country,
          aboutMe: formData.aboutMe
        });
        
        // Redirect to the profile page after successful submission
        navigate('/profile', { state: { formData } });
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  return (
    <section className="language-selection-container">
      <div className="language-selection-content">
        <h1>Profile Setup</h1>
        <form onSubmit={handleSubmit}>
          {/* Language Selection */}
          <div className="input-group">
            <label htmlFor="language">Language you want to learn</label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a language</option>
              <option value="japanese">Japanese</option>
              <option value="spanish">Spanish</option>
            </select>
          </div>

          {/* Display the flag based on the selected language */}
          {formData.language && (
            <div className="flag-display">
              {formData.language === 'japanese' && <img src="/path-to-japan-flag.png" alt="Japanese Flag" />}
              {formData.language === 'spanish' && <img src="/path-to-spanish-flag.png" alt="Spanish Flag" />}
            </div>
          )}

          {/* Level of Difficulty */}
          <div className="input-group">
            <label htmlFor="difficulty">Level of Difficulty</label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select your current level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
            </select>
          </div>

          {/* Country Selection */}
          <div className="input-group">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select your country</option>
              <option value="US">United States</option>
              <option value="CN">China</option>
              <option value="ES">Spain</option>
              {/* Add other countries as needed */}
            </select>
          </div>

          {/* About Me Section */}
          <div className="input-group">
            <label htmlFor="aboutMe">About Me</label>
            <textarea
              id="aboutMe"
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleChange}
              placeholder="Tell us a little about yourself"
              rows="4"
              required
            />
          </div>

          <button type="submit" className="continue-button">Continue</button>
        </form>
      </div>
    </section>
  );
};

export default LanguageSelection;
