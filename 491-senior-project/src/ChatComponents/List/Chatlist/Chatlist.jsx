import { useEffect, useState } from "react";
import "./Chatlist.css"
import { getAuth } from 'firebase/auth';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

const Chatlist = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [chats, setChats] = useState([])
    const [addMode, setAddMode] = useState(false);

    useEffect(() => {
        const updateChats = onSnapshot(doc(db, "userchats", user.uid), (doc) => {
            setChats(doc.data());
        });

        return () => {
            updateChats();
        }
    }, [user.uid]);

    return(
        <div className ='chatlist'>
            <div className="search">
                <div className="searchbar">
                    <input type="text" placeholder="Search" />
                </div>
                <button className="add">+</button>
            </div>
            {chats.map((chat) => (
                <div className="item" key={chat.chatId}>
                <img src="./defaultprofile.png" alt="" />
                <div className="texts">
                    <span>other user</span>
                    <p>{chat.lastMessage}</p>
                </div>
            </div>
            ))}
            
        </div>
    )
}

export default Chatlist