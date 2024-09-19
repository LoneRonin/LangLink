import React, { useEffect } from 'react';
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import './Friends.css';


const Friends = () => {
    const [friendModel, setFriend] = useState({
        email: "",
        firstName: "",
        lastName: ""
    })

    useEffect(() => {
        try{
            //friends = new Set([]);
            console.log("initializing");
            const usersList = collection(db, "users");
            const q = query(usersList, where("language", "==", "spanish"));
        
            getDocs(q).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                });
            });
            
        }
        catch(err){
            console.log("Error loading user list.", err);
        }
    }, []);

    //document.getElementById("friendDisplay").onload = function() {loadTest()};

    return(
        <section className='friendsList' id="friendsList">
            <div id='friendDisplay'>
                <h2>Fwiends</h2>
                <p>Welcome to the friend zone</p>
            </div>
        </section>
    );
};

export default Friends;