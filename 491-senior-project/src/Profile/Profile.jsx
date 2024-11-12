// Profile.jsx
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure correct path to firebase.js
import './Profile.css'; // Optional for styling
import DefaultProf from '../ProfilePics/defaultprofile.png';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  function deleteUserAccountPopup(){
    var popupID = "";
    var popup = document.getElementById(popupID);
    popup.style.display=("block");
  }

  function removeDeletePopup(){
    var popupID = "";
    var popup = document.getElementById(popupID);
    popup.style.display=("none");
  }

  const deleteUserAccount = async() => {
    try{
      if(user){
        //
      }
    }
    catch(err){console.log(err);}
  }

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
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
        <div className="profile-details">
          <div className="detail">
            <span className="label">First Name:</span>
            <span className="value">{userData.firstName || 'N/A'}</span>
          </div>
          <div className="detail">
            <span className="label">Last Name:</span>
            <span className="value">{userData.lastName || 'N/A'}</span>
          </div>
          <div className="detail">
            <span className="label">Email:</span>
            <span className="value">{userData.email || 'N/A'}</span>
          </div>
          <div className="detail">
            <span className="label">Language:</span>
            <span className="value">{userData.language || 'N/A'}</span>
          </div>
          <div className="detail">
            <span className="label">Difficulty:</span>
            <span className="value">{userData.difficulty || 'N/A'}</span>
          </div>
          <div className="detail">
            <span className="label">Country:</span>
            <span className="value">{userData.country || 'N/A'}</span>
          </div>
          <div className="detail">
            <span className="label">About Me:</span>
            <span className="value">{userData.aboutMe || 'N/A'}</span>
          </div>
        </div>
        <button className="edit-profile-button">Edit Profile</button>
        <button className="delete-profile-button" onClick={(event) => deleteUserAccountPopup()}>Delete Profile</button>
        <div id='delete-profile-popup' className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={(event) => removeDeletePopup(doc)}>&times;</span>
            <p>Are you sure you want to delete your account?</p>
            <p>
              <button className = 'yesbutton' onClick={(event) => deleteUserAccount()}>Yes</button>
              <button className = 'nobutton' onClick={(event) => removeDeletePopup(doc)}>No</button>
            </p>
          </div>
          </div>
      </div>
    </section>
  );
};

export default Profile;
