import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom/client";
import { Link } from 'react-router-dom';
import { collection, query, where, doc, getDocs, getDoc, limit, deleteDoc, setDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import './Friends.css';


const Friends = () => {
    const [friends, setFriends] = useState(null);
    const [emails, setEmails] = useState([]);
    const [suggestions, setSuggestions] = useState(null);
    const [requests, setRequests] = useState(null);
    const [userData, setUserData] = useState(null);
    //uses a state of type set to store array of user data, not optimal but least complicated way of doing it
    //moreso that sets are hard to monitor updates on, allegedly
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [error, setError] = useState(null);
    const [noFriends, setNoFriends] = useState(false);
    const [noRequests, setNoRequests] = useState(false);
    const [pageNum, setPageNum] = useState(0);
    const auth = getAuth();
    const user = auth.currentUser;
    
    //this function takes the query results and updates the state that stores the friend list
    function updateFriendList(docs){
        //setLoading(false)
        const friendList = [];
        const emailList = [];
        //loop that takes the relevant information from each doc, makes an array,
        //then adds it to the set
        docs.forEach((doc) => {
            var friend = doc.data();
            var friendArray = [friend.firstName, friend.lastName, friend.email, doc.id];
            friendList.push(friendArray);
            //console.log(doc.id);
            emailList.push(friend.email);
        });
        setFriends(friendList);
        setEmails(emailList);
        //sets the set state with the finished lists
    }

    //this function is similar to above but updates the suggestions list
    function updateSuggestions(docs){
        const suggestionsList = [];
        //console.log(friends);
        //console.log(emails);

        docs.forEach((doc) => {
            var docEntry = doc.data();
            var entryArray = [docEntry.firstName, docEntry.lastName, docEntry.email, doc.id];
            suggestionsList.push(entryArray);
        });

        if(suggestionsList.length <5){
            constructSuggestionsList();
        }
        else{setSuggestions(suggestionsList);}
        //console.log(suggestionsList);
    }

    //this function is similar to above but handles incoming requests
    function updateRequests(docs){
        const requestsList = [];
        //makes blank array, then populates it w/ arrays of user info w/ incoming requests
        docs.forEach((doc) =>{
            var request = doc.data();
            var requestArray = [request.firstName, request.lastName, request.email, doc.id];
            requestsList.push(requestArray);
        });

        if(requestsList.length <= 0){
            //have a catch case for no incoming requests?
            //setRequests("");
        }else{
            setRequests(requestsList);
        }
    }

    //creates a "friend request" document in another users subcollection
    const sendFriendRequest = async(fid) => {
        try{
            if(user){
                //constrcuts document reference and a document to create
                const reqRef = doc(db, "users", fid, "friendrequests", user.uid);
                const userDoc = {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email
                };
                //uses setDoc to prevent duplicate requests from being made
                await setDoc(reqRef, userDoc);
                /*
                const newRef = doc(deb, "users", user.uid, "outgoingrequests", fid);
                const refDoc = {
                    firstName: fName,
                    lastName: lName,
                    email: email
                };
                await setDoc(newRef, refDoc);
                */
            }
        }
        catch(err){console.log(err);}
        finally{}
    }

    //moves a users details from the requests subcollection to the friends one
    const acceptFriendRequest = async([fN, lN, mail, docID]) => {
        try{
            if(user){
                if(userData == null){fetchUserData();}
                const friendRef = doc(db, "users", user.uid, "friendlist", docID);
                const userDoc = {
                    firstName: fN,
                    lastName: lN,
                    email: mail
                };
                await setDoc(friendRef, userDoc);
                //this constructs an object with the other users information and stores them in the friends list subcollection

                const userRef = doc(db, "users", docID, "friendlist", user.uid);
                const friendDoc = {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email
                }
                await setDoc(userRef, friendDoc);
                //makes a mirrored write to make sure the other user has this user put in their friends list
            }
        }
        catch(err){console.log(err);}
        //after accepting the request, removes it from the database & page
        finally{
            await clearFriendRequest(mail, docID);
            await fetchFriendsList(user.uid);
        }
    }

    //removes a request from a users incoming requests subcollection
    const clearFriendRequest = async(elementID, docID) => {
        try{
            if(user){
                const reqRef = doc(db, "users", user.uid, "friendrequests", docID);
                await deleteDoc(reqRef);

                const userRef = doc(db, "users", docID, "friendrequests", user.uid);
                await deleteDoc(userRef);
                //this is supposed to remove the element from the html
                document.getElementById(elementID).style.display='none';
            }
        }
        catch(err){console.log(err);}
        finally{fetchIncomingRequests;}
    }

    function removeFriendPopup([fName, lName, email, fid]){
        console.log('removing popup')
        var popupID = "popup_"+email;
        var popup = document.getElementById(popupID);
        popup.style.display = ("none");
    }

    function appearFriendPopup([fName, lName, email, fid]){
        console.log('creating popup')
        var popupID = "popup_"+email;
        var popup = document.getElementById(popupID);
        popup.style.display = ("block");
    }

    function blockUserPopup([fName, lName, email, fid]){
        var blockID = "block_"+email;
        var blockElement = document.getElementById(blockID);
        blockElement.style.display = ("block");
    }

    function removeBlockPopup([fName, lName, email, fid]){
        var blockID = "block_"+email;
        var blockElement = document.getElementById(blockID);
        blockElement.style.display = ("none");
    }

    //basic function to clear database of info in friendslist collection (WIP)
    const removeFriend = async([fName, lName, email, fid]) => {
        try{
            if(user){
                const friendRef = doc(db, "users", user.uid, "friendlist", fid);
                await deleteDoc(friendRef);

                const userRef = doc(db, "users", fid, "friendlist", user.uid);
                await deleteDoc(userRef);
            }
        }
        catch(err){console.log(err);}
        finally{
            removeFriendPopup([fName, lName, email, fid]);
            fetchFriendsList(user.uid);
        }
    }

    const blockUser = async([fName, lName, email, uid]) => {
        try{
            if(user){
                const blockedUserDoc = {
                    firstName: fName,
                    lastName: lName,
                }; 
                const blockedUserDocRef = doc(db, "users", user.uid, "blockedusers", uid);
                await setDoc(blockedUserDocRef, blockedUserDoc);

                const blockedByDocRef = doc(db, "users", uid, "blockedby", user.uid);
                const blockedByDoc = {uid: user.uid};
                await setDoc(blockedByDocRef, blockedByDoc);
            }
        }
        catch(err){console.log(err);}
        finally{
            removeFriend([fName, lName, email, uid]);
            //removeSuggestion([fName, lName, email, uid]);
            clearFriendRequest(email, uid);
            removeFriendPopup([fName, lName, email, uid])
        }
    }

    const unBlockUser = async([fName, lName, email, uid]) => {
        try{
            if(user){
                const blockedUserDocRef = doc(db, "users", user.uid, "blockedusers", uid);
                await deleteDoc(blockedUserDocRef);

                const blockedByDocRef = doc(db, "users", uid, "blockedby", user.uid);
                await deleteDoc(blockedByDocRef);
            }
        }
        catch(err){console.log(err);}
    }

    const constructSuggestionsList = async() => {
        try{
            if(user){
                console.log("fetching user suggestions...")
                //query user's friend list
                //query each individual friend for their friend list
                //find users that are friends of friends but not the user's friend
                //ideally we can pick out users from posts a user has recently interacted with, would require keeping track w/ the community feature
                const usersList = collection(db, "users", user.uid, "friendlist");
                const querySnapshot = await getDocs(usersList);
                const friends = [];
                querySnapshot.forEach((doc) => {
                    //console.log(doc.id, " => ", doc.data());
                    //var docEntry=doc.data();
                    var friend = doc.id;
                    friends.push(friend);
                });
                console.log(friends);
                //takes each id for each friend and queries the system for their friends list
                //each user that is not the current user, already a friend, or already logged as a nacquantaince is added
                const acquaintances = [];
                const usersEmailArray = ["test"];
                friends.forEach(async(friendID) => {
                    //console.log(friend);
                    var friendsList = collection(db, "users", friendID, "friendlist");
                    const querySnapshot = await getDocs(friendsList);
                    querySnapshot.forEach((doc) => {
                        var docEntry = doc.data();
                        if((doc.id != user.uid) && !(friends.includes(doc.id)) && !(usersEmailArray.includes(docEntry.email))){
                            var newUser = [docEntry.firstName, docEntry.lastName, docEntry.email, doc.id];
                            acquaintances.push(newUser);
                            usersEmailArray.push(docEntry.email);
                        }
                    });
                });
                //if the current acquantaince list is too short, pulls some users from the general userbase
                if(acquaintances.length < 5){
                    console.log(usersEmailArray);
                    const usersref = collection(db, "users");
                    if(usersEmailArray.length <= 1){
                        var userQuery = query(usersref, where('isDeleted', '!=', true), limit(15));
                    }
                    else{
                        var userQuery = query(usersref, where('email', 'not-in', usersEmailArray), where('isDeleted', 'not-in', [true]), limit(15));
                        //ideally here we would filter out disabled/hidden users, but its not possible to combine multiple instances of 'not-in' and/or '!='
                        //unless this fix works
                    }
                    const querySnapshot = await getDocs(userQuery);
                    querySnapshot.forEach((doc) => {
                        var docEntry = doc.data();
                        if((doc.id != user.uid) && !(friends.includes(doc.id)) && !(usersEmailArray.includes(docEntry.email))){
                            var newUser = [docEntry.firstName, docEntry.lastName, docEntry.email, doc.id];
                            acquaintances.push(newUser);
                            //usersEmailArray.push(docEntry.email);
                        }
                    });
                }
                //ideally this will update the users suggestion collection to minimize the amounts of reads that happens
                setSuggestions(acquaintances);

                for(var n in acquaintances){
                    var userTemp = acquaintances[n];
                    var userTempDoc = {
                        firstName: userTemp[0],
                        lastName: userTemp[1],
                        email: userTemp[2]
                    };
                    var userSuggestionDocRef = doc(db, "users", user.uid, "usersuggestions", userTemp[3]);
                    await setDoc(userSuggestionDocRef, userTempDoc);
                }
            }
        }
        catch(err){console.log(err);}
        finally{setLoading2(false);}
    }

    //async function to retrieve a list of recommended users to send friend requests too (WIP) but functions
    const fetchFriendSuggestions = async() => {
        setLoading2(true);

        try{
            if(user){
                

                const userSuggestions = collection(db, "users", user.uid, "usersuggestions");
                const suggestionQuery = query(userSuggestions);

                getDocs(suggestionQuery)
                .then((querySnapshot) => {
                    updateSuggestions(querySnapshot);
                });
            }
        }
        catch(err){
            console.log(err);
            setError("Error loading suggestions.");
        }
        finally{setLoading2(false);}
    }

    //async function to retrieve a users friend list, then passes it into a constructor
    const fetchFriendsList = async(id) => {
        setError(null);
        setLoading(true);
        try{
            if(user){
                //constructs a database query, pulls the friends list tied to users uid
                const usersList = collection(db, "users", id, "friendlist");
                const userFriendsList = query(usersList);

                getDocs(userFriendsList)
                    .then((querySnapshot) => {
                        updateFriendList(querySnapshot);
                    });


                /*//executes the query, sends results to function
                const querySnapshot = await getDocs(userFriendsList).then((querySnapshot) => {
                    //setLoading(False);
                    updateFriendList(querySnapshot);
                });*/
            }
        }
        catch(err){//on query error, logs in console
            console.log(err);
            setError("Error loading user list.");
        }
        finally{setLoading(false);}
    }

    //async func to retrieve list of incoming friend requests
    const fetchIncomingRequests = async() => {
        try{
            if(user){
                const requestsRef = collection(db, "users", user.uid, "friendrequests");
                const incomingReuqestsQuery = query(requestsRef);

                getDocs(incomingReuqestsQuery)
                .then((querySnapshot) => {
                    updateRequests(querySnapshot);
                });
            }
        }
        catch(err){console.log(err);}

    }
    //async function to retrieve users information, mostly used to send friend requests with accurate information
    const fetchUserData = async() => {
        try{
            if(user){
                const userDocRef = doc(db, 'users', user.uid);
                var userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                    //console.log(userDoc.data());
                    //console.log(userData)
                }
            }
        }
        catch(err){console.log(err);}
    }

    useEffect(() => {//when friends is called, runs this async react effect
        if(user){
            fetchUserData();
            fetchFriendsList(user.uid);
            fetchIncomingRequests();
            fetchFriendSuggestions();
        }
        
    }, []);

    if (error) {return <p>{error}</p>;}
    //if (loading) {return <p>Loading...</p>;}
    if (!user) {return <p>No user data available</p>;}

    return(
        <section className='friendsList'>
            <div>
                <h2>Fwiends</h2>
                <div id = 'friendDisplay'>
                    <p>Welcome to the friend zone</p>
                    {loading && "Loading..."}
                    <ul className='list'>
                        {friends?.map((doc) => (
                            <div key={Math.random()}>
                                <li className='listElement' id={`${doc[2]}`}>{doc[0]} {doc[1]}
                                    <button className='button' id='removeFriendButton' onClick={(event) => appearFriendPopup(doc)}>-</button>
                                    <div id={`popup_${doc[2]}`} className='modal'>
                                        <div className='modal-content'>
                                            <span className='close' onClick={(event) => removeFriendPopup(doc)}>&times;</span>
                                            <p>Are you sure you want to remove this user?</p>
                                            <p>
                                                <button className = 'yesbutton' onClick={(event) => removeFriend(doc)}>Yes</button>
                                                <button className = 'nobutton' onClick={(event) => removeFriendPopup(doc)}>No</button>
                                                <button className = 'blockbutton' onClick={(event) => blockUser(doc)}>Block</button>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
                <div id = 'friendsuggestion'>
                    <p>Make a new friend!</p>
                    {loading2 && "Loading..."}
                    <ul className='list'>
                        {suggestions?.map((doc) => (
                            <div key={Math.random()}>
                                <li className='listElement' id={`${doc[2]}`}>{doc[0]} {doc[1]} 
                                    <button className='button' id='addFriendButton' onClick={(event) => sendFriendRequest(doc[3])}>+</button>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
                <div id = 'requests'>
                    <p>incoming friend requests</p>
                    <ul className='list'>
                        {requests?.map((doc) => (
                            <div key={Math.random()}>
                                <li className='listElement' id={`${doc[2]}`}>{doc[0]} {doc[1]}
                                    <button className='button' id='denyReqButton' onClick={(event) => clearFriendRequest(doc[2], doc[3])}>x</button>
                                    <button className='button' id='acceptReqButton' onClick={(event) => acceptFriendRequest(doc)}>+</button>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Friends;
//TODO:
/** 
 * still need to add filters to other function, 
 * probably need to also make a "blockedby" collection. 
 * also have to update database rules
 * buttons
 * removesuggestion
*/