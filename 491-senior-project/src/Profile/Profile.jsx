// Profile.jsx
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, collection, getDocs, deleteDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure correct path to firebase.js
import './Profile.css'; // Optional for styling
import DefaultProf from '../ProfilePics/defaultprofile.png';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const [blockedUsers, setBlockedUsers] = useState(null);
  const [noneBlocked, setNoneBlocked] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  function deleteUserAccountPopup(){
    var popupID = "delete-profile-popup";
    var popup = document.getElementById(popupID);
    popup.style.display=("block");
  }

  function removeDeletePopup(){
    var popupID = "delete-profile-popup";
    var popup = document.getElementById(popupID);
    popup.style.display=("none");
  }

  function unBlockPopup(fid){
    //console.log("creating popup");
    var blockID = "popup_"+fid;
    var blockElement = document.getElementById(blockID);
    blockElement.style.display = ("block");
  }

  function removeBlockPopup(fid){
    //console.log('removing popup');
    var blockID = "popup_"+fid;
    var blockElement = document.getElementById(blockID);
    blockElement.style.display = ("none");
  }

  const deleteUserAccount = async() => {
    try{
      if(user){
        const userRef = doc(db, "users", user.uid)
        await updateDoc(userRef,{
          isDeleted: arrayUnion(true)
        });
        
        setIsDisabled(true);
      }
    }
    catch(err){console.log(err);}
  }

  const unBlockUser = async(uid) => {
    try{
        if(user){
          //console.log(uid);
          const blockedUserDocRef = doc(db, "users", user.uid, "blockedusers", uid);
          await deleteDoc(blockedUserDocRef);

          const blockedByDocRef = doc(db, "users", uid, "blockedby", user.uid);
          await deleteDoc(blockedByDocRef);
        }
    }
    catch(err){console.log(err);}
    finally{fetchBlockedUsers()};
}

  const fetchBlockedUsers = async() => {
    try{
      if(user){
        const blockList = [];
        const blockedUsersRef = collection(db, "users", user.uid, "blockedusers");
        const querySnapshot = await getDocs(blockedUsersRef);
        querySnapshot.forEach((doc) => {
          //console.log(doc.id, " => ", doc.data());
          //var docEntry=doc.data();
          var user = doc.data();
          var userArray = [user.firstName, user.lastName, doc.id];
          blockList.push(userArray);
        });
        setBlockedUsers(blockList);
        if(blockList.length >=1){
          setNoneBlocked(false);
        }
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
    fetchBlockedUsers();
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
        <div>
          <p>Blocked Users:</p>
          <p>{noneBlocked && "No users blocked."}</p>
          <ul className='list'>
            {blockedUsers?.map((doc) => (
              <div key={Math.random()}>
                <li className='listElement' id={`${doc[2]}`}>{doc[0]} {doc[1]}
                  <button className='button' onClick={(event) => unBlockPopup(doc[2])}>Unblock</button>
                  <div id={`popup_${doc[2]}`} className='modal'>
                    <div className='modal-content'>
                      <span className='close' onClick={(event) => removeBlockPopup(doc[2])}>&times;</span>
                      <p>Unblock this user?</p>
                      <p>
                        <button className = 'yesbutton' onClick={(event) => unBlockUser(doc[2])}>Yes</button>
                        <button className = 'nobutton' onClick={(event) => removeBlockPopup(doc[2])}>No</button>
                      </p>
                    </div>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
        {!isDisabled && (
          <div id="delete-account">
            <button className="delete-profile-button" onClick={(event) => deleteUserAccountPopup()}>Disable Account</button>
            <div id='delete-profile-popup' className='modal'>
              <div className='modal-content'>
                <span className='close' onClick={(event) => removeDeletePopup(doc)}>&times;</span>
                <p>Are you sure you want to disable your account?</p>
                <p>You will be able to re-enable your account by logging in again.</p>
                <p>Until then, your account will be hidden from other users, but posts and comments made will still be visible.</p>
                <p>
                  <button className = 'yesbutton' onClick={(event) => deleteUserAccount()}>Yes</button>
                  <button className = 'nobutton' onClick={(event) => removeDeletePopup(doc)}>No</button>
                </p>
              </div>
            </div>
          </div>
        )}
        {isDisabled && (
          <div id='enable-account'>
            <button className='enable-account-button'>Re-enable account</button>
            <div id='enable-account-popup' className='modal'>
              <div className='modal-content'>
                <span className='close' onClick={(event) => removeDeletePopup(doc)}>&times;</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
