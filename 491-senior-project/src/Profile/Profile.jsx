// Worked on by: Tristan Clayman, Victor Perez

import React, { useEffect, useState } from 'react';
import { getAuth, updateEmail } from 'firebase/auth';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import './Profile.css'; 
import DefaultProf from '../ProfilePics/defaultprofile.png';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  // State to store user data and form data, error handling, and loading state
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false); // Track if we are editing
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    language: '',
    difficulty: '',
    country: '',
    aboutMe: '',
  });
  const [profilePicture, setProfilePicture] = useState(DefaultProf); // Store the uploaded profile picture
  const auth = getAuth(); // Firebase authentication instance
  const user = auth.currentUser; // Get the current authenticated user
  const navigate = useNavigate();  // For navigation after edit

  // useEffect to fetch user data from Firestore
  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);

      // Subscribe to real-time updates using onSnapshot
      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data(); // Retrieve user data
          setUserData(data); // Set user data
          // Populate the form with the fetched data
          setFormData({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            language: data.language || '',
            difficulty: data.difficulty || '',
            country: data.country || '',
            aboutMe: data.aboutMe || '',
          });
          // Set the initial profile picture
          setProfilePicture(data.profilePicture || DefaultProf);
        } else {
          setError('No such document!');
        }
        setLoading(false);
      }, (error) => {
        setError('Error fetching user data'); // Handle data fetching errors
        setLoading(false);
      });

      // Clean up subscription on unmount
      return () => unsubscribe();
    } else {
      setError('No user logged in');  // Handle case where no user is logged in
      setLoading(false);
    }
  }, [user]);

  // Update form data as user types in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle profile picture upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Set the new profile picture
      };
      reader.readAsDataURL(file); // Convert the file to base64 URL
    }
  };

  // Handle form submission to update user profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);

        // Update Firestore with new form data and profile picture
        await updateDoc(userDocRef, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          language: formData.language,
          difficulty: formData.difficulty,
          country: formData.country,
          aboutMe: formData.aboutMe,
          profilePicture: profilePicture, // Update the profile picture in Firestore
        });

        // Update Firebase Auth email if changed
        if (user.email !== formData.email) {
          await updateEmail(user, formData.email);
        }

        // Turn off edit mode after submission
        setEditMode(false);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!userData) {
    return <p>No user data available</p>;
  }

  return (
<section className="profile-container">
  <div className="profile-content">
    <div className="profile-header">
      {editMode ? (
        <label htmlFor="profilePicInput" className="profile-pic-label">
          <img src={profilePicture} alt="Profile" className="profile-picture" />
          <input
            type="file"
            id="profilePicInput"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }} // Hide the file input
            required // Require one upload
          />
        </label>
      ) : (
        <img src={profilePicture} alt="Profile" className="profile-picture" />
      )}
      {/* Display the user's name below the profile picture */}
      <p className="user-name">
      </p>
      <h1>{`${userData.firstName || 'User'} ${userData.lastName || ''}'s Profile`}</h1>
    </div>

    {/* Conditional rendering for edit mode */}
    {editMode ? (
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="input-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="language">Language</label>
          <select id="language" name="language" value={formData.language} onChange={handleChange} required>
            <option value="" disabled>Select a language</option>
            <option value="Japanese">Japanese</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="difficulty">Difficulty</label>
          <select id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange} required>
            <option value="" disabled>Select difficulty</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="country">Country</label>
          <select id="country" name="country" value={formData.country} onChange={handleChange} required>
            <option value="" disabled>Select your country</option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Argentina">Argentina</option>
            <option value="Australia">Australia</option>
            <option value="Brazil">Brazil</option>
            <option value="Canada">Canada</option>
            <option value="China">China</option>
            <option value="France">France</option>
            <option value="Germany">Germany</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Italy">Italy</option>
            <option value="Japan">Japan</option>
            <option value="Kenya">Kenya</option>
            <option value="Mexico">Mexico</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Philippines">Philippines</option>
            <option value="Russia">Russia</option>
            <option value="South Africa">South Africa</option>
            <option value="South Korea">South Korea</option>
            <option value="Spain">Spain</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="Vietnam">Vietnam</option>
          </select>
        </div>
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
        <button type="submit" className="save-button">Save Changes</button>
      </form>
    ) : (
      <div className="profile-details">
        <div className="detail">
          <span className="label">First Name: </span>
          <span className="value">{userData.firstName}</span>
        </div>
        <div className="detail">
          <span className="label">Last Name: </span>
          <span className="value">{userData.lastName}</span>
        </div>
        <div className="detail">
          <span className="label">Email: </span>
          <span className="value">{userData.email}</span>
        </div>
        <div className="detail">
          <span className="label">Language: </span>
          <span className="value">{userData.language}</span>
        </div>
        <div className="detail">
          <span className="label">Difficulty: </span>
          <span className="value">{userData.difficulty}</span>
        </div>
        <div className="detail">
          <span className="label">Country: </span>
          <span className="value">{userData.country}</span>
        </div>
        <div className="detail">
          <span className="label">About Me: </span>
          <span className="value">{userData.aboutMe}</span>
        </div>
        <button className="edit-button" onClick={() => setEditMode(true)}>Edit Profile</button>
      </div>
    )}
  </div>
</section>
  );
};

export default Profile;
