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

    //this function is similar to above but updates the suggestions list (WIP)
    //need to add a check to make sure users that are already friends aren't recommended, at least
    function updateSuggestions(docs){
        const suggestionsList = [];
        //console.log(friends);
        //console.log(emails);

        docs.forEach((doc) => {
            var docEntry = doc.data();
            var element = document.getElementById(docEntry.email);
            if(element == null){
                var entryArray = [docEntry.firstName, docEntry.lastName, docEntry.email, doc.id];
                suggestionsList.push(entryArray);
            }
        });
        /*
        if(emails.length <= 0){
            docs.forEach((doc) => {
                //console.log(doc.data());
                var docEntry = doc.data();
    
                if((docEntry.email != user.email)){
                    var entryArray = [docEntry.firstName, docEntry.lastName, docEntry.email, doc.id];
                    suggestionsList.push(entryArray);
                }
            });
        }else{
            docs.forEach((doc) => {
                //console.log(doc.data());
                var docEntry = doc.data();
                //console.log(docEntry.email);
    
                if(!(emails.includes(docEntry.email)) && (docEntry.email != user.email)){
                    var entryArray = [docEntry.firstName, docEntry.lastName, docEntry.email, doc.id];
                    suggestionsList.push(entryArray);
                }
            });
        }*/
        setSuggestions(suggestionsList);
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
                //console.log(userDoc);
                //uses setDoc to prevent duplicate requests from being made
                setDoc(reqRef, userDoc);
            }
        }
        catch(err){
            console.log(err);
        }
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
                setDoc(friendRef, userDoc);
                //this constructs an object with the other users information and stores them in the friends list subcollection

                const userRef = doc(db, "users", docID, "friendlist", user.uid);
                const friendDoc = {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email
                }
                setDoc(userRef, friendDoc);
                //makes a mirrored write to make sure the other user has this user put in their friends list
            }
        }
        catch(err){console.log(err);}
        //after accepting the request, removes it from the database & page
        finally{clearFriendRequest(mail, docID);}
    }

    //removes a request from a users incoming requests subcollection
    const clearFriendRequest = async(elementID, docID) => {
        try{
            if(user){
                const reqRef = doc(db, "users", user.uid, "friendrequests", docID);
                await deleteDoc(reqRef);
                //this is supposed to remove the element from the html
                document.getElementById(elementID).style.display='none';
            }
        }
        catch(err){console.log(err);}
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
        finally{removeFriendPopup([fName, lName, email, fid]);}
    }

    //async function to retrieve a users friend list, then passes it into a constructor
    const fetchFriendsList = async() => {
        setError(null);
        setLoading(true);
        try{
            if(user){
                //constructs a database query, pulls the friends list tied to users uid
                const usersList = collection(db, "users", user.uid, "friendlist");
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

    //async function to retrieve a list of recommended users to send friend requests too (WIP) but functions
    const fetchFriendSuggestions = async(loadLimit) => {
        setLoading2(true);

        try{
            if(user){
                //will only be able to query a NOT-IN for up to 10 nots(friends?)
                //i.e. while querying, can only use 10 friend ids to make sure htey dont get in
                //might be better to then perform a larger, generic query, then filter them on the
                //frontend. since the query itself shouldnt take longer it could be fine
                //could also keep track of highest id fetched and proceed that way, but that would take
                //a lot of finagling to get working right

                const usersList = collection(db, "users");
                const suggestionQuery = query(usersList, limit(loadLimit));

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
        fetchUserData();
        fetchFriendsList();
        fetchIncomingRequests();
        fetchFriendSuggestions(6);
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