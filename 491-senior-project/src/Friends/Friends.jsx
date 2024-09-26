import React, { useEffect } from 'react';
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { Link } from 'react-router-dom';
import { collection, query, where, doc, getDocs } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import './Friends.css';


const Friends = () => {
    const [friends, setFriends] = useState([]);
    const [friendHTML, setFriendHTML] = useState(null);
    //uses a state of type set to store array of user data, not optimal but least complicated way of doing it
    //moreso that sets are hard to monitor updates on, allegedly
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const auth = getAuth();
    const user = auth.currentUser;
    
    function updateFriendList(docs){//function to take query results and display them
        //setLoading(false)
        const friendList = new Set();
        docs.forEach((doc) => {//loop that takes the relevant information from each doc, makes an array, then adds it to the set
            var friend = doc.data();
            var friendArray = [friend.firstName, friend.lastName, friend.email];
            friendList.add(friendArray);
            //console.log(doc.email, doc.firstName, doc.lastName);
            //console.log(doc.data());
        });
        setFriends(friendList);
        //sets the set state with the finished list
        //the set is constructed and updated in this way to prevent multiple simultaneous executes of this function leading to duplicate entries
        printFriendsList();//calls function to display the updated list
    }

    function printFriendsList(){
        //clearFriendsList();//first, clears any current html in the list
        const friendList = friends;//grabs the set of user data
        var text = "";
        var barcount = 1;
        for(const i of friendList){//iterates through every user, creates a paragraph that contains their info, with a custom class id for css
            //console.log(i);
            text += "<p"+" class = 'friendBar"+barcount+"' >";
            text += i[0] + " " + i[1] + "";
            text += "</p>"
            if(barcount == 1){barcount = 2}
            else{barcount = 1}//the barcount is just for the alternating css
        }
        //console.log(text);
        //document.getElementById("friendDisplay").innerHTML = text;//injects new html into the page
        setFriendHTML(text);
        console.log(text);
    }

    function clearFriendsList(){
        document.getElementById("friendDisplay").innerHTML = "";
        //literally just replaces any html in the box with a blank
    }

    const sendFriendRequest = async() =>{
        const userDocRef = doc(db, 'users', user.uid);
        const friendReqsRef = userDocRef.collection('friendrequests');
        friendReqsRef.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
            });
        })
        .catch((error) => {
            console.log('Error getting documents: ', error);
        });
    }

    function updateList(){
        document.getElementById("friendDisplay").innerHTML = friendHTML
        console.log(friendHTML)
    }
    useEffect(() => {
        if(loading == false){
            updateList();
        }
    }, [loading])

    useEffect(() => {//when friends is called, runs this async react effect
        const fetchFriendsList = async() => {
            setError(null);
            setLoading(true);
            try{
                if(user){
                    //constructs a database query, this is a temp one that just pulls from the general userbase
                    const usersList = collection(db, "users");
                    const userFriendsList = query(usersList, where("language", "==", "Spanish"));
    
                    //const userDocRef = doc(db, 'users', user.uid);
                    //const userFriendList = userDocRef.collection('friendlist');
                    
                    //executes the query, sends results to function
                    const querySnapshot = await getDocs(userFriendsList).then((querySnapshot) => {
                        //setLoading(False);
                        updateFriendList(querySnapshot);
                    });
                }
            }
            catch(err){//on query error, logs in console
                console.log(err);
                setError("Error loading user list.");
            }
            finally{setLoading(false);}
        }
        fetchFriendsList();
    }, [user]);

    if (error) {return <p>{error}</p>;}
    if (loading) {return <p>Loading...</p>;}
    //if (!userData) {return <p>No user data available</p>;}

    return(
        <section className='friendsList'>
            <div>
                <h2>Fwiends</h2>
                <p>Welcome to the friend zone</p>
                <div id = 'friendDisplay'>
                </div>
            </div>
        </section>
    );
};

export default Friends;