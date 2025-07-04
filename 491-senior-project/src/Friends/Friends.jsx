import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom/client";
import { Link } from 'react-router-dom';
import { collection, query, where, doc, getDocs, getDoc, limit, deleteDoc, setDoc, addDoc, onSnapshot } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import './Friends.css';


const Friends = () => {
    const [friends, setFriends] = useState(null);
    const [emails, setEmails] = useState([]);
    const [suggestions, setSuggestions] = useState(null);
    const [requests, setRequests] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userLanguage, setUserLanguage] = useState("Spanish");
    //uses a state of type set to store array of user data, not optimal but least complicated way of doing it
    //moreso that sets are hard to monitor updates on, allegedly
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [error, setError] = useState(null);
    const [noFriends, setNoFriends] = useState(false);
    const [noRequests, setNoRequests] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;
    
    //this function takes the query results and updates the state that stores the friend list
    const updateFriendList = (docs) => {
        //setLoading(false)
        const friendList = [];
        const emailList = [];
        //loop that takes the relevant information from each doc, makes an array,
        //then adds it to the set
        docs.forEach((doc) => {
            const friend = doc.data();
            friendList.push({ ...friend, id: doc.id });
            emailList.push(friend.email);
        });
        if(friendList.length <= 0){
            setNoFriends(true);
        }
        setFriends(friendList);
        setEmails(emailList);
        //sets the set state with the finished lists
    };

    

    //this function is similar to above but handles incoming requests
    const updateRequests = (docs) => {
        const requestsList = [];
        //makes blank array, then populates it w/ arrays of user info w/ incoming requests
        docs.forEach((doc) =>{
            const request = doc.data();
            requestsList.push({ ...request, id: doc.id });
        });
        console.log(requestsList)

        if(requestsList.length <= 0){
            setNoRequests(true);
        }else{
            setRequests(requestsList);
        }
    }

    //creates a "friend request" document in another users subcollection
    const sendFriendRequest = async(recipient) => {
        try{
            if(!user){
                console.error("User is not authenticated");
                return;
            }

            //constrcuts document reference and a document to create
            const reqRef = doc(db, "users", recipient.id, "friendrequests", user.uid);
            //uses setDoc to prevent duplicate requests from being made
            await setDoc(reqRef, {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                timestamp: new Date(),
            });
            console.log("Friend request sent successfully!");

            await deleteDoc(doc(db, "users", user.uid, "usersuggestions", recipient.id));

            // Now add a notification for the recipient about the new friend request
            const notificationRef = collection(db, "users", recipient.id, "notifications");
            await addDoc(notificationRef, {
                message: `${user.displayName} sent you a friend request.`,
                timestamp: new Date(),
                read: false,
                type: "friend_request", // Optional: Type of notification to distinguish from other notifications
            });
    
            console.log("Friend request notification added to recipient's notifications");
        }
        catch(err){console.log(err);}
    };

    //moves a users details from the requests subcollection to the friends one
    const acceptFriendRequest = async(friend) => {
        //console.log(friend)
        try{
            if(user){
                const friendRef = doc(db, "users", user.uid, "friendlist", friend.id);
                const userDoc = {
                    firstName: friend.firstName,
                    lastName: friend.lastName,
                    email: friend.email
                };
                await setDoc(friendRef, userDoc);
                //this constructs an object with the other users information and stores them in the friends list subcollection

                const userRef = doc(db, "users", friend.id, "friendlist", user.uid);
                const friendDoc = {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email
                }
                await setDoc(userRef, friendDoc);
                //makes a mirrored write to make sure the other user has this user put in their friends list
                
                const notifRef = doc(db, "users", friend.id, "notifications", user.uid);
                const notification = {
                    type: "friend_accept",
                    message: `${userData.firstName} ${userData.lastName} accepted your friend request.`,
                    timestamp: new Date(),
                    fromUserId: user.uid,
                };
                await setDoc(notifRef, notification);
            }
        }
        catch(err){console.log(err);}
        //after accepting the request, removes it from the database & page
        finally{
            clearFriendRequest(friend.email, friend.id);
            fetchFriendsList(user.uid);
            clearUserSuggestion(friend.id);
        }
    }

    const clearUserSuggestion = async(id) => {
        try{
            if(user){
                const suggRef = doc(db, "users", user.uid, "usersuggestions", id);
                const userRef = doc(db, "users", id, "usersuggestions", user.uid);

                await deleteDoc(suggRef);
                await deleteDoc(userRef);
            }
        }
        catch(err){console.log(err);}
    }

    //removes a request from a users incoming requests subcollection
    const clearFriendRequest = async(elementID, id) => {
        try{
            if(user){
                const reqRef = doc(db, "users", user.uid, "friendrequests", id);
                await deleteDoc(reqRef);

                const userRef = doc(db, "users", id, "friendrequests", user.uid);
                await deleteDoc(userRef);
                //this is supposed to remove the element from the html
                //document.getElementById(elementID).style.display='none';
            }
        }
        catch(err){console.log(err);}
        //finally{fetchIncomingRequests;}
    }

    function removeFriendPopup(friend){
        //console.log('removing popup')
        var popupID = "popup_"+friend.email;
        var popup = document.getElementById(popupID);
        popup.style.display = ("none");
    }

    function appearFriendPopup(friend){
        //console.log('creating popup')
        var popupID = "popup_"+friend.email;
        var popup = document.getElementById(popupID);
        popup.style.display = ("block");
    }

    function blockUserPopup(friend){
        var blockID = "block_"+friend.email;
        var blockElement = document.getElementById(blockID);
        blockElement.style.display = ("block");
    }

    function removeBlockPopup(friend){
        var blockID = "block_"+friend.email;
        var blockElement = document.getElementById(blockID);
        blockElement.style.display = ("none");
    }

    //basic function to clear database of info in friendslist collection (WIP)
    const removeFriend = async(friend) => {
        try{
            if(user){
                const friendRef = doc(db, "users", user.uid, "friendlist", friend.id);
                await deleteDoc(friendRef);

                const userRef = doc(db, "users", friend.id, "friendlist", user.uid);
                await deleteDoc(userRef);
            }
        }
        catch(err){console.log(err);}
        finally{
            //removeFriendPopup(friend);
            //fetchFriendsList(user.uid);
        }
    };

    const blockUser = async(friend) => {
        try{
            if(user){
                const blockedUserDoc = {
                    firstName: friend.firstName,
                    lastName: friend.lastName,
                }; 
                const blockedUserDocRef = doc(db, "users", user.uid, "blockedusers", friend.id);
                await setDoc(blockedUserDocRef, blockedUserDoc);

                const blockedByDocRef = doc(db, "users", friend.id, "blockedby", user.uid);
                const blockedByDoc = {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                };
                await setDoc(blockedByDocRef, blockedByDoc);
            }
        }
        catch(err){console.log(err);}
        finally{
            removeFriend(friend);
            //removeSuggestion([fName, lName, email, uid]);
            clearFriendRequest(friend);
            removeFriendPopup(friend)
        }
    };

    const unBlockUser = async(friend) => {
        try{
            if(user){
                const blockedUserDocRef = doc(db, "users", user.uid, "blockedusers", friend.id);
                await deleteDoc(blockedUserDocRef);

                const blockedByDocRef = doc(db, "users", friend.id, "blockedby", user.uid);
                await deleteDoc(blockedByDocRef);
            }
        }
        catch(err){console.log(err);}
    };

    const constructSuggestionsList = async() => {
        try{
            if(user){
                console.log("fetching user suggestions...")
                //query user's friend list

                //query each individual friend for their friend list
                //find users that are friends of friends but not the user's friend
                //ideally we can pick out users from posts a user has recently interacted with, would require keeping track w/ the community feature
                const friendsList = collection(db, "users", user.uid, "friendlist");
                const querySnapshot = await getDocs(friendsList);
                const userFriends = [];
                querySnapshot.forEach((doc) => {
                    //console.log(doc.id, " => ", doc.data());
                    //var docEntry=doc.data();
                    const userFriend = doc.id;
                    userFriends.push(userFriend);
                });
                //console.log("friend length", userFriends.length);
                
                //takes each id for each friend and queries the system for their friends list
                //each user that is not the current user, already a friend, or already logged as a nacquantaince is added
                const usersEmailArray = ["test"];
                const acquaintancesList = [];
                //console.log("created ", acquaintancesList.length ,acquaintancesList);

                if(userFriends.length >0){
                    const friendPromises = userFriends.map(async(userRef) => {
                        //console.log(userRef);
                        const friendsListRef = collection(db, "users", userRef, "friendlist");
                        const querySnapshot = await getDocs(friendsListRef);
                        querySnapshot.forEach((friendOfAFriend) => {
                            const docEntry = friendOfAFriend.data();
                            //console.log(docEntry)
                            if((friendOfAFriend.id != user.uid) && !(userFriends.includes(friendOfAFriend.id)) && !(usersEmailArray.includes(docEntry.email))){
                                usersEmailArray.push(docEntry.email);
                                acquaintancesList.push({ ...docEntry, id: friendOfAFriend.id })
                                console.log("array",acquaintancesList);
                            }
                        });
                    });
                    const acquaintance = await Promise.all(friendPromises);
                }
                
                //acquaintances.pop();
                //console.log("emails:", usersEmailArray);
                //console.log("list: ", acquaintancesList.length);


                //if the current acquantaince list is too short, pulls some users from the general userbase
                if(acquaintancesList.length < 4){
                    //console.log(userLanguage);
                    const usersref = collection(db, "users");
                    const userQuery = query(usersref, where('email', 'not-in', usersEmailArray), where('language', '==', userLanguage));
                    const querySnapshot = await getDocs(userQuery);
                    querySnapshot.forEach((doc) => {
                        const docEntry = doc.data();
                        //console.log(doc.data());
                        if((doc.id != user.uid) && !(userFriends.includes(doc.id)) && !(usersEmailArray.includes(docEntry.email))){
                            if(docEntry.isDisabled != true){
                                acquaintancesList.push({ ...docEntry, id: doc.id });
                            }
                        }
                    });
                }

                //console.log(acquaintancesList);

                const newSuggestions = [];
                //console.log(acquaintances);
                if(acquaintancesList.length >8){
                    const acqLength = acquaintancesList.length;
                    for(let i=0; i<9; i++){
                        const randIndex = Math.floor(Math.random() * acqLength);
                        //console.log(randIndex);
                        const newUser = acquaintancesList[randIndex]
                        newSuggestions.push(newUser);
                    }
                }else{acquaintancesList.forEach((guy) => {
                    newSuggestions.push(guy);
                });}
                //console.log(newSuggestions);
                //ideally this will update the users suggestion collection to minimize the amounts of reads that happens
                //setSuggestions(acquaintances);
                newSuggestions.forEach(async (guy) => {
                    const userSuggestionDocRef = doc(db, "users", user.uid, "usersuggestions", guy.id);
                    const userTempDoc = {
                        firstName: guy.firstName,
                        lastName: guy.lastName,
                        email: guy.email,
                    };
                    await setDoc(userSuggestionDocRef, userTempDoc);
                });
                
            }
        }
        catch(err){console.log(err);}
        finally{setLoading2(false);}
    };


    //async function to retrieve a users friend list, then passes it into a constructor
    const fetchFriendsList = async(id) => {
        setError(null);
        setLoading(true);
        try{
            if(user){
                //constructs a database query, pulls the friends list tied to users uid
                const usersList = collection(db, "users", id, "friendlist");
                const userFriendsList = query(usersList);
                const querySnapshot = await getDocs(userFriendsList);
                updateFriendList(querySnapshot);
            }
        }catch(err){//on query error, logs in console
            console.error("Error loading user list:", err);;
            setError("Error loading user list.");
        }
        finally{setLoading(false);}
    }

    //async func to retrieve list of incoming friend requests
    const fetchIncomingRequests = async() => {
        try{
            if(user){
                const requestsRef = collection(db, "users", user.uid, "friendrequests");
                const incomingRequestsQuery = query(requestsRef);
                const querySnapshot = await getDocs(incomingRequestsQuery);
                updateRequests(querySnapshot);
            }
        }
        catch(err){console.error("Error fetching incoming requests:", err);}

    }
    //async function to retrieve users information, mostly used to send friend requests with accurate information
    const fetchUserData = async() => {
        try{
            if(user){
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                }
            }
        }
        catch(err){console.error("Error fetching user data:", err);}
    }

    

    useEffect(() => {//when friends is called, runs this async react effect
        if(!user) return;
        const userDataSnapshot = onSnapshot(doc(db, "users", user.uid), async(doc) => {
            const data = doc.data();
            //console.log(data.language);
            setUserData(data);
            setUserLanguage(data.language);
        });

        const friendQuery = query(collection(db, "users", user.uid, "friendlist"));
        const friendsListSnapshot = onSnapshot(friendQuery, async(friendSnap) => {
            const promises = friendSnap.docs.map(async (userDoc) => {
                const userDocRef = doc(db, "users", userDoc.id)
                const userDocSnap = await getDoc(userDocRef);
                if(userDocSnap.exists()){
                    const docEntry = userDocSnap.data();
                    return {...docEntry, id: userDocSnap.id};
                }
            });
            const friendData = await Promise.all(promises);
            setFriends(friendData);
            setLoading(false);
            if(friendData.length == 0){setNoFriends(true);}
            else{setNoFriends(false);}
        });

        const requestQuery = query(collection(db, "users", user.uid, "friendrequests"));
        const requestsSnapshot = onSnapshot(requestQuery, async(reqSnap) => {
            const promises = reqSnap.docs.map(async(userDoc)=>{
                const userDocRef = doc(db, "users", userDoc.id)
                const userDocSnap = await getDoc(userDocRef);
                if(userDocSnap.exists()){
                    const docEntry = userDocSnap.data();
                    return {...docEntry, id: userDocSnap.id};
                }
            });
            const requestData = await Promise.all(promises);
            setRequests(requestData);
            if(requestData.length == 0){setNoRequests(true);}
            else{setNoRequests(false);}
        });

        const suggestionQuery = query(collection(db, "users", user.uid, "usersuggestions"));
        const suggestionsSnapshot = onSnapshot(suggestionQuery, async(suggSnap) => {
            const promises = suggSnap.docs.map(async(userDoc)=>{
                const userDocRef = doc(db, "users", userDoc.id)
                const userDocSnap = await getDoc(userDocRef);
                if(userDocSnap.exists()){
                    const docEntry = userDocSnap.data();
                    return {...docEntry, id: userDocSnap.id};
                }
            });
            const suggestionData = await Promise.all(promises);
            //console.log(suggestionData);
            setLoading2(false);
            //constructSuggestionsList();
            if(suggestionData.length <1){constructSuggestionsList();}
            else{setSuggestions(suggestionData);}
        });

        return () => {
            userDataSnapshot();
            friendsListSnapshot();
            requestsSnapshot();
            suggestionsSnapshot();
        }
        
    }, [user]);

    if (error) {return <p>{error}</p>;}
    //if (loading) {return <p>Loading...</p>;}
    if (!user) {return <p>No user data available</p>;}

    return(
        <section>
            <div  className='friendsList'>
                <div id = 'requests'>
                    {!noRequests && <h2>Incoming Requests</h2>}
                    <ul className='list'>
                        {requests?.map((request) => (
                            <li className='listElement' key={request.id} id={request.email}>
                                <span>{request.firstName} {request.lastName}</span>
                                <button className='friendbutton' id='denyReqButton' onClick={(event) => clearFriendRequest(request)}>x</button>
                                <button className='friendbutton' id='acceptReqButton' onClick={(event) => acceptFriendRequest(request)}>+</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div id = 'friendDisplay' className='friends'>
                    <h2>Friends:</h2>
                    {loading && "Loading..."}
                    {noFriends && <span>No friends :u</span>}
                    <ul className='list'>
                        {friends?.map((friend) => (
                            <li className='listElement' key={friend.id} id={friend.email}>
                                <span>{friend.firstName} {friend.lastName}</span>
                                <button className='friendbutton' id='removeFriendButton' onClick={(event) => appearFriendPopup(friend)}>-</button>
                                <div id={`popup_${friend.email}`} className='modal'>
                                    <div className='modal-content'>
                                        <span className='close' onClick={(event) => removeFriendPopup(friend)}>&times;</span>
                                        <p className='modal-p'>Are you sure you want to remove this user?</p>
                                        <p className='modal-p'>
                                            <button className = 'yesbutton' onClick={(event) => removeFriend(friend)}>Yes</button>
                                            <button className = 'nobutton' onClick={(event) => removeFriendPopup(friend)}>No</button>
                                            <button className = 'blockbutton' onClick={(event) => blockUser(friend)}>Block</button>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div id = 'friendsuggestion' className='suggestions'>
                    <h2>Suggested Users:</h2>
                    {loading2 && "Loading..."}
                    <ul className='list'>
                        {suggestions?.map((guy) => (
                            <li className='listElement' key={guy.id} id={guy.id}>
                                <span>{guy.firstName} {guy.lastName} </span>
                                <button className='friendbutton' id='addFriendButton' onClick={(event) => sendFriendRequest(guy)}>+</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Friends;