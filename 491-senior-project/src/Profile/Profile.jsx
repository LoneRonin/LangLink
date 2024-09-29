import React, { useEffect, useState } from 'react';
import { getAuth, updateEmail } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure correct path to firebase.js
import './Profile.css'; // Optional for styling
import DefaultProf from '../ProfilePics/defaultprofile.png';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
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
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate(); // For navigation after edit

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData(data);
            setFormData({
              firstName: data.firstName || '',
              lastName: data.lastName || '',
              email: data.email || '',
              language: data.language || '',
              difficulty: data.difficulty || '',
              country: data.country || '',
              aboutMe: data.aboutMe || '',
            });
          } else {
            setError('No such document!');
          }
        } else {
          setError('No user logged in');
        }
      } catch (error) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);

        // Update Firestore
        await updateDoc(userDocRef, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          language: formData.language,
          difficulty: formData.difficulty,
          country: formData.country,
          aboutMe: formData.aboutMe,
        });

        // Update Firebase Auth email
        if (user.email !== formData.email) {
          await updateEmail(user, formData.email);
        }

        setEditMode(false); // Turn off edit mode after submission
        navigate('/profile'); // Optional: navigate to profile after saving
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
          <img src={userData.profilePicture || DefaultProf} alt="Profile" className="profile-picture" />
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
            <span className="label">First Name: </span> {/* */}
            <span className="value">{userData.firstName || 'N/A'}</span>
          </div>
          <div className="detail">
            <span className="label">Last Name: </span> {/*  */}
            <span className="value">{userData.lastName || 'N/A'}</span>
          </div>
          <div className="detail">
            <span className="label">Email: </span> {/*  */}
            <span className="value">{userData.email || 'N/A'}</span>
          </div>
          <div className="detail">
            <span className="label">Language: </span> {/*  */}
            <span className="value">{userData.language || 'N/A'}</span>
          </div>
          <div className="detail">
            <span className="label">Difficulty: </span> {/*  */}
            <span className="value">{userData.difficulty || 'N/A'}</span>
          </div>
          <div className="detail">
            <span className="label">Country: </span> {/*  */}
            <span className="value">{userData.country || 'N/A'}</span>
          </div>
          <div className="detail">
            <span className="label">About Me: </span> {/*  */}
            <span className="value">{userData.aboutMe || 'N/A'}</span>
          </div>
          <button onClick={() => setEditMode(true)} className="edit-profile-button">Edit Profile</button>
        </div>
      )}
    </div>
  </section>
);
};

export default Profile;