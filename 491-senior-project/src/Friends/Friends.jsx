import React, { useEffect } from 'react';
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { Link } from 'react-router-dom';
import { collection, query, where, doc, getDocs, addDoc, limit } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import './Friends.css';


const Friends = () => {
    const [friends, setFriends] = useState([]);
    const [emails, setEmails] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [requests, setRequests] = useState([]);
    //uses a state of type set to store array of user data, not optimal but least complicated way of doing it
    //moreso that sets are hard to monitor updates on, allegedly
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [error, setError] = useState(null);
    const [pageNum, setPageNum] = useState(0);
    const loadLimit = 5;
    const auth = getAuth();
    const user = auth.currentUser;
    
    function updateFriendList(docs){//function to take query results and set state
        //setLoading(false)
        const friendList = [];
        const emailList = [];
        docs.forEach((doc) => {//loop that takes the relevant information from each doc, makes an array, then adds it to the set
            var friend = doc.data();
            var friendArray = [friend.firstName, friend.lastName, friend.email];
            friendList.push(friendArray);
            //console.log(doc.id);
            emailList.push(friend.email);
            //console.log(friend.email);
        });
        setFriends(friendList);
        setEmails(emailList);
        //sets the set state with the finished list
    }

    function updateSuggestions(docs){
        const suggestionsList = [];
        //console.log(friends);
        //console.log(emails);

        if(emails.length <= 0){
            docs.forEach((doc) => {
                //console.log(doc.data());
                var docEntry = doc.data();
                //console.log(docEntry.email);
    
                if((docEntry.email != user.email)){
                    var entryArray = [docEntry.firstName, docEntry.lastName, docEntry.email];
                    suggestionsList.push(entryArray);
                }
            });
        }else{
            docs.forEach((doc) => {
                //console.log(doc.data());
                var docEntry = doc.data();
                //console.log(docEntry.email);
    
                if(!(emails.includes(docEntry.email)) && (docEntry.email != user.email)){
                    var entryArray = [docEntry.firstName, docEntry.lastName, docEntry.email];
                    suggestionsList.push(entryArray);
                }
            });
        }
        setSuggestions(suggestionsList);
        //console.log(suggestionsList);
    }

    function updateRequests(docs){
        const requestsList = [];
        docs.forEach((doc) =>{
            var request = doc.data();
            var requestArray = [request.firstName, request.lastName, request.email];
            requestsList.push(requestArray);
        });

        if(requestsList.length <= 0){
            //have a catch case for no incoming requests?
            //setRequests("");
        }else{
            setRequests(requestsList);
        }
    }

    const sendFriendRequest = async(fN, lN, mail) => {
        try{
            if(user){
                const reqRef = collection(db, "users", user.uid, "friendrequests");
                const userDoc = {
                    firstName: fN,
                    lastName: lN,
                    email: mail
                };
                console.log(userDoc);
                addDoc(reqRef, userDoc);//unsure if this is correct rn lol aha
            }
        }
        catch(err){
            console.log(err);
        }
    }

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

    const fetchFriendSuggestions = async() => {
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

    const fetchIncomingRequests = async() => {
        try{
            if(user){
                const requestsRef = collection(db, "users", user.uid, "friendlist");
                const incomingReuqestsQuery = query(requestsRef);

                getDocs(incomingReuqestsQuery)
                .then((querySnapshot) => {
                    updateRequests(querySnapshot);
                });
            }
        }
        catch(err){console.log(err);}

    }

    useEffect(() => {//when friends is called, runs this async react effect
        fetchFriendsList();
        fetchIncomingRequests();
        fetchFriendSuggestions();
    }, [user]);

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
                    <ul>{friends?.map((doc) => (
                            <div key={Math.random()}>
                                <li>{doc[0]} {doc[1]}</li>
                            </div>
                        ))}
                    </ul>
                </div>
                <div id = 'friendsuggestion'>
                    <p>Make a new friend!</p>
                    {loading2 && "Loading..."}
                    <ul>{suggestions?.map((doc) => (
                            <div key={Math.random()}>
                                <li>{doc[0]} {doc[1]}</li><button id='addFriendButton' onClick={(event) => sendFriendRequest(doc[0], doc[1], doc[2])}>+</button>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Friends;