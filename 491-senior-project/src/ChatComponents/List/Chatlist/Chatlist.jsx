import { useContext, useEffect, useState } from "react";
import "./Chatlist.css"
import { getAuth } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import searchContext from "../../searchContext.jsx";


const Chatlist = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [chats, setChats] = useState([])
    const [addMode, setAddMode] = useState(false);
    const {chatSearch, setChatSearch} = useContext(searchContext)

    useEffect(() => {
        if(!user) return;
        const userId = user.uid;
        console.log("user;", userId);

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
    }, []);

    const handleSelect = async (chat) => {
        
    }

    return(
        <div className ='chatlist'>
            <div className="search">
                <div className="searchbar">
                    <input type="text" placeholder="Search" />
                </div>
                <button className="add" onClick={() => setChatSearch((prev) => !prev)}>+</button>
            </div>
            {chats.map((chat) => (
                <div className="item" key={chat.chatId} onClick={()=>handleSelect(chat)}>
                    <img src={chat.user.profilePicture || "./defaultprofile.png"} alt="" />
                    <div className="texts">
                        <span>{chat.user.firstName} {chat.user.lastName}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>))}
        </div>
    )
}

export default Chatlist;