import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from './firebase';
import './Login.css';

const Login = () => {
  const [login, setLogin] = useState("");
  const [logins, setLogins] = useState([]);

  const addLogin = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "logins"), {
        login: login,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const fetchLogins = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "logins"));
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setLogins(newData);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    fetchLogins();
  }, []);

  return (
    <section className="login-container">
      <div className="login">
        <h1 className="header">LangLink</h1>
        
        <form onSubmit={addLogin} className="login-form">
          <input
            type="text"
            placeholder="Please enter your name!"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="input-field"
          />
          <button
            type="submit"
            className="btn"
          >
            Submit
          </button>
        </form>

        <div className="login-content">
          {logins.length > 0 ? (
            logins.map((loginItem, index) => (
              <p key={index} className="login-item">
                {loginItem.login}
              </p>
            ))
          ) : (
            <p>No logins available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
