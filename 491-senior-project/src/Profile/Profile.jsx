// Worked on by: Tristan Clayman, Victor Perez

import React, { useEffect, useState } from 'react';
import { getAuth, updateEmail } from 'firebase/auth';
import { doc, onSnapshot, updateDoc, collection, getDoc, deleteDoc, arrayUnion, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import './Profile.css'; 
import DefaultProf from '../ProfilePics/defaultprofile.png';
import { useNavigate } from 'react-router-dom';
import Friends from '../Friends/Friends';

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
  const [profilePicture, setProfilePicture] = useState(DefaultProf); // Store the uploaded profile picture
  const auth = getAuth(); // Firebase authentication instance
  const user = auth.currentUser; // Get the current authenticated user
  const navigate = useNavigate();  // For navigation after edit
  const [blockedUsers, setBlockedUsers] = useState(null);
  const [noneBlocked, setNoneBlocked] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  const createPopup = (elementId) => {
    const popup = document.getElementById(elementId);
    popup.style.display = ("block");
  }

  const hidePopup = (elementId) => {
    const popup = document.getElementById(elementId);
    popup.style.display = ("none");
  }

  const deleteUserAccount = async() => {
    try{
      if(user){
        const userRef = doc(db, "users", user.uid)
        await updateDoc(userRef,{
            isDeleted: true
        });
        
        setIsDisabled(true);
      }
    }
    catch(err){console.log(err);}
  }

  const reEnableAccount = async() => {
    try{
      if(user){
        const userRef = doc(db, "users", user.uid)
        await updateDoc(userRef,{
          isDeleted: false
        });
        setIsDisabled(false);
      }
    }
    catch(err){console.log(err);}
    //finally{hidePopup('enable-account-popup');}
  }

  const updateAllProfiles = async() => {
    try{
      const usersRef = collection(db, "users");
      const allUsers = await getDocs(usersRef);
      allUsers.forEach(async(guy) => {

        await setDoc(doc(db, "userchats", guy.id), {
          chats:"",
        });
        console.log("updated ", guy.firstName);
      });
    }catch(err){console.log(err);}
  }

  const fetchBlockedUsers = async () => {
    try{
      if(user){
        const blockList = [];
        const blockedUsersRef = collection(db, "users", user.uid, "blockedusers");
        const querySnapshot = await getDocs(blockedUsersRef);
        querySnapshot.forEach((doc) => {
          const blockedUser = doc.data();
          blockList.push({...blockedUser, id: doc.id});
        });
        setBlockedUsers(blockList);
        if(blockList.length >=1){
          setNoneBlocked(false);
        }
      }
    }
    catch(err){console.log(err);}
  };

  const unBlockUser = async(blockedUser) => {
    try{
      if(user){
        const blockedUserDocRef = doc(db, "users", user.uid, "blockedusers", blockedUser.id);
        await deleteDoc(blockedUserDocRef);

        const blockedByDocRef = doc(db, "users", blockedUser.id, "blockedby", user.uid);
        await deleteDoc(blockedByDocRef);
      }
    }
    catch(err){console.log(err);}
    finally{fetchBlockedUsers();}
  };

  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);

      // Subscribe to real-time updates using onSnapshot
      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data(); // Retrieve user data
          setUserData(data); // Set user data
          setIsDisabled(data.isDeleted);
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

  useEffect(() => {
    // Fetch blocked users
    fetchBlockedUsers();
    //updateAllProfiles();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

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
          displayName: formData.firstName + formData.lastName,
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
        <p1 className="user-name">
        </p1>
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

<div className='profileExtras'>
        <div>
          <h2>Blocked Users:</h2>
          <ul className='list'>
          {noneBlocked && "No users blocked."}
              {blockedUsers?.map((doc) => (
                <li className='listElement' id={doc.id} key={doc.id}>{doc.firstName} {doc.lastName}
                  <button className='button' onClick={(event) => createPopup(`popup_${doc.id}`)}>Unblock</button>
                  <div id={`popup_${doc.id}`} className='modal'>
                      <div className='modal-content'>
                        <span className='close' onClick={(event) => hidePopup(`popup_${doc.id}`)}>&times;</span>
                        <p>Unblock this user?</p>
                        <p>
                          <button className = 'yesbutton' onClick={(event) => unBlockUser(doc.id)}>Yes</button>
                          <button className = 'nobutton' onClick={(event) => hidePopup(`popup_${doc.id}`)}>No</button>
                        </p>
                      </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        {!isDisabled && (
          <div id="delete-account">
              <button className="delete-profile-button" onClick={(event) => createPopup('delete-profile-popup')}>Disable Account</button>
              <div id='delete-profile-popup' className='modal'>
                <div className='modal-content'>
                    <span className='close' onClick={(event) => hidePopup('delete-profile-popup')}>&times;</span>
                    <p>Are you sure you want to disable your account?</p>
                    <p>You will be able to re-enable your account by logging in again.</p>
                    <p>Until then, your account will be hidden from other users, but posts and comments made will still be visible.</p>
                    <p>
                      <button className = 'yesbutton' onClick={(event) => deleteUserAccount()}>Yes</button>
                      <button className = 'nobutton' onClick={(event) => hidePopup('delete-profile-popup')}>No</button>
                    </p>
                </div>
              </div>
          </div>
        )}
        {isDisabled && (
          <div id='enable-account'>
              <button className='enable-account-button' onClick={(event) => createPopup('enable-account-popup')}>Re-enable account</button>
              <div id='enable-account-popup' className='modal'>
                <div className='modal-content'>
                    <span className='close' onClick={(event) => removePopup('enable-account-popup')}>&times;</span>
                    <p>Would you like to re-enable your account?</p>
                    <p>You can disable your account again at any time.</p>
                    <p>
                      <button className = 'yesbutton' onClick={(event) => reEnableAccount()}>Yes</button>
                      <button className = 'nobutton' onClick={(event) => removePopup('enable-account-popup')}>No</button>
                    </p>
                </div>
              </div>
          </div>
        )}
      </div>
      </div>
      <div><Friends/></div>

      
    </section>
  );
};

export default Profile;