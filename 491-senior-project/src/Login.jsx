import React, { useState, useEffect } from 'react'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from './firebase';
import './Login.css'

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState(""); // New state for password
  const [logins, setLogins] = useState([]);

  const addLogin = async (e) => {
    e.preventDefault();  
    
    try {
      const docRef = await addDoc(collection(db, "logins"), {
        login: login,
        password: password, // Add password to document
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const fetchPost = async () => {
    await getDocs(collection(db, "logins"))
      .then((querySnapshot) => {              
        const newData = querySnapshot.docs
          .map((doc) => ({...doc.data(), id: doc.id }));
        setLogins(newData);                
        console.log(logins, newData);
      });
  }
 
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <section className="login-container">
      <h1 className="header">Welcome to Language Link!</h1>
      <div className="login">
        <div>
          <input
            type="text"
            placeholder="Please enter your name!"
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password" // Password input type
            placeholder="Please enter your password!"
            onChange={(e) => setPassword(e.target.value)} // Update state with password
          />
        </div>
        <div className="btn-container">
          <button
            type="submit"
            className="btn"
            onClick={addLogin}
          >
            Log In
          </button>
        </div>
        <div className="forgot-password">
          <a href="#">Forgot Password?</a>
        </div>
        <div className="create-account">
          <button className="btn-create-account">Create New Account</button>
        </div>
        <div className="login-content">
          {logins?.map((login, i) => (
            <p key={i}>
              {login.login}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Login;