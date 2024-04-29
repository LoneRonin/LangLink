import React, { useState, useEffect } from 'react'
import { collection, addDoc, getDocs } from "firebase/firestore";
import {db} from './firebase';
import './Login.css'

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
        } catch (e) {
          console.error("Error adding document: ", e);
        }
  }

  const fetchPost = async () => {
     
      await getDocs(collection(db, "logins"))
          .then((querySnapshot)=>{              
              const newData = querySnapshot.docs
                  .map((doc) => ({...doc.data(), id:doc.id }));
              setLogins(newData);                
              console.log(logins, newData);
          })
     
  }
 
  useEffect(()=>{
      fetchPost();
  }, [])


  return (
      <section className="login-container">
          <div className="login">
              <h1 className="header">
                  LangLink
              </h1>
 
              <div>
 
                  <div>
                      <input
                          type="text"
                          placeholder="Please enter your name!"
                          onChange={(e)=>setLogin(e.target.value)}
                      />
                  </div>
 
                  <div className="btn-container">
                      <button
                          type="submit"
                          className="btn"
                          onClick={addLogin}
                      >
                          Submit
                      </button>
                  </div>
 
              </div>
 
              <div className="login-content">
                  {
                      logins?.map((login,i)=>(
                          <p key={i}>
                              {login.login}
                          </p>
                      ))
                  }
              </div>
          </div>
      </section>
  )
}

export default Login