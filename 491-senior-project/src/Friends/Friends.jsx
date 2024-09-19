import React, { useEffect } from 'react';
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import './Friends.css';


const Friends = () => {
    //const [friend, setFriend] = useState(null);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        try{
            //friends = new Set([]);
            //console.log("initializing");
            const usersList = collection(db, "users");
            const q = query(usersList, where("language", "==", "Spanish"));
        
            getDocs(q).then((querySnapshot) => {
                updateFriendList(querySnapshot);
            });
            
        }
        catch(err){
            console.log("Error loading user list.", err);
        }
    }, []);

    function updateFriendList(docs){
        const friendList = new Set();
        docs.forEach((doc) => {
            var friend = doc.data();
            var friendArray = [friend.firstName, friend.lastName, friend.email];
            friendList.add(friendArray);
            //console.log(doc.email, doc.firstName, doc.lastName);
            //console.log(doc.data());
        });
        setFriends(friendList);
        //console.log(friendList);
        printFriendsList();
    }

    function printFriendsList(){
        clearFriendsList();
        const friendList = friends;
        var text = "";
        for(const i of friendList){
            console.log(i);
            text += "<p>";
            text += "First Name: " + i[0] + " Last Name: " + i[1] + "";
            text += "</p>"
        }
        //console.log(text);
        document.getElementById("friendDisplay").innerHTML = text;
    }

    function clearFriendsList(){
        document.getElementById("friendDisplay").innerHTML = "";
    }

    return(
        <section className='friendsList'>
            <div>
                <h2>Fwiends</h2>
                <p>Welcome to the friend zone</p>
                <div id = 'friendDisplay'></div>
            </div>
        </section>
    );
};

export default Friends;