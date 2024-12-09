import { useEffect, useState } from "react";
import "./Chatlist.css"
import { getAuth } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

const Chatlist = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [chats, setChats] = useState([])
    const [addMode, setAddMode] = useState(false);

    useEffect(() => {
        const updateChats = onSnapshot(doc(db, "userchats", user.uid), async (response) => {
            const items = response.data().chats;
            //setChats(doc.data());
            const promises = items.map(async (item) => {
                const userDocRef = doc(db, "users", item.receiverId);
                const userDocSnap = await getDoc(userDocRef);
                const user = userDocSnap.data();

                return {...item, user}
            });
            const chatData = await Promise.all(promises);
            setChats(chatData.sort((a,b) => b.updatedAt - a.updatedAt));
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
                    <img src={chat.user.profilePicture || "./defaultprofile.png"} alt="" />
                    <div className="texts">
                        <span>{chat.user.firstName} {chat.user.lastName}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>))}
            {addMode && <AddUser/>}
        </div>
    )
}

export default Chatlist;