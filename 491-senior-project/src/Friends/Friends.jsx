import React from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import './Friends.css';


const Friends = () => {
    
    const loadTest = async() => {
        try{
            console.log("initializing");
            const usersList = collection(db, "users");
            const q = query(usersList, where("language", "==", "spanish"));
        
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            return(console.log(doc.id, " => ", doc.data()));
            });
        }
        catch(err){
            return(console.log("Error loading user list.", err));
        }
    }

    //document.getElementById("friendDisplay").onload = function() {loadTest()};

    return(
        <section className='friendsList' id="friendsList">
            <div id='friendDisplay'>
                <h2>Fwiends</h2>
                <p onLoad={loadTest()}>Welcome to the friend zone</p>
            </div>
        </section>
    );
};

export default Friends;