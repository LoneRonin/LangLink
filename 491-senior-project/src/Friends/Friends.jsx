import React, { useEffect } from 'react';
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { Link } from 'react-router-dom';
import { collection, query, where, doc, getDocs, addDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import './Friends.css';


const Friends = () => {
    const [friends, setFriends] = useState([]);
    const [emails, setEmails] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    //uses a state of type set to store array of user data, not optimal but least complicated way of doing it
    //moreso that sets are hard to monitor updates on, allegedly
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [error, setError] = useState(null);
    const [pageNum, setPageNum] = useState(0);
    const loadLimit = 20;
    const auth = getAuth();
    const user = auth.currentUser;
    
    function updateFriendList(docs){//function to take query results and set state
        //setLoading(false)
        const friendList = new Set();
        const emailList = new Set();
        docs.forEach((doc) => {//loop that takes the relevant information from each doc, makes an array, then adds it to the set
            var friend = doc.data();
            var friendArray = [friend.firstName, friend.lastName, friend.email];
            friendList.add(friendArray);
            emailList.add(friend.email);
            //console.log(doc.email, doc.firstName, doc.lastName);
            //console.log(doc.data());
        });
        setFriends(friendList);
        setEmails(emailList);
        //sets the set state with the finished list
    }

    function updateSuggestions(docs){
        const suggestionsList = new Set();
        docs.forEach((doc) => {
            //console.log(doc.data());
            var docEntry = doc.data();
            if(emails.has(docEntry.email)){
                var entryArray = [docEntry.firstName, docEntry.lastName, docEntry.email];
                suggestionsList.add(entryArray);
            }
        });
        setSuggestions(suggestionsList);
    }

    const sendFriendRequest = async(fN, lN, email) => {
        try{
            if(user){
                const reqRef = collection(db, "users", user.uid, /*put whatever the requests col is called here*/);
                const userDoc = {
                    firstName: fN,
                    lastName: lN,
                    email: email
                };
                addDoc(doc(reqRef), userDoc);//unsure if this is correct rn lol aha
            }
        }
        catch(err){}
        finally{}
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



    useEffect(() => {//when friends is called, runs this async react effect
        fetchFriendsList();
        fetchFriendSuggestions();
    }, [user]);

    if (error) {return <p>{error}</p>;}
    //if (loading) {return <p>Loading...</p>;}
    //if (!userData) {return <p>No user data available</p>;}

    return(
        <section className='friendsList'>
            <div>
                <h2>Fwiends</h2>
                <p>Welcome to the friend zone</p>
                {loading && "Loading..."}
                <div id = 'friendDisplay'></div>
                <ul>{Array?.from(friends).map((doc) => (
                        <div key={Math.random()}>
                            <li>{doc[0]} {doc[1]}</li>
                        </div>
                    ))}
                </ul>
                <div id = 'friendsuggestion'>
                    <p>Make a new friend!</p>
                    {loading2 && "Loading..."}
                    {suggestions}
                </div>
            </div>
        </section>
    );
};

export default Friends;