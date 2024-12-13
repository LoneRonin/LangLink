import { useContext, useEffect, useState } from "react";
import "./Chatlist.css"
import { getAuth } from 'firebase/auth';
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import searchContext from "../../searchContext.jsx";
import DefaultProf from '../../../ProfilePics/defaultprofile.png';


const Chatlist = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [chats, setChats] = useState([])
    const {chatSearch, chatId, otherUser} = useContext(searchContext)
    const [searchValue, setSearchValue] = chatSearch;
    const [chatIdValue, setChatIdValue] = chatId;
    const [otherChatter, setOtherChatter] = otherUser;
    const [isChatEmpty, setIsChatEmpty] = useState(true);
    const [chatterProfilePicture, setChatterProfilePicture] = useState(DefaultProf);

    useEffect(() => {
        if(!user) return;

        const updateChats = onSnapshot(doc(db, "userchats", user.uid), async (response) => {
            const items = response.data().chats;
            //setChats(doc.data());
            const promises = items.map(async (item) => {
                const userDocRef = doc(db, "users", item.receiverId);
                const userDocSnap = await getDoc(userDocRef);
                const newUser = userDocSnap.data();

                return {...item, newUser}
            });
            const chatData = await Promise.all(promises);
            setChats(chatData.sort((a,b) => b.updatedAt - a.updatedAt));
            if(chatData.length!=0){setIsChatEmpty(false);}
        });

        return () => {
            updateChats();
        }
    }, []);

    const handleSelect = async (chat) => {
        const userChats = chats.map((item) => {
            const { user, ...rest } = item;
            return rest;
        });

        const chatIndex = userChats.findIndex(
            (item) => item.chatId === chat.chatId
        );

        userChats[chatIndex].isSeen = true;//returns true
        const userChatsRef = doc(db, "userchats", user.uid);
        try{await updateDoc(userChatsRef, {chats:userChats});}
        catch(err){console.log(err);}
        
        
        //console.log(chat.chatId);
        //console.log(chat.newUser);
        //console.log(chat.receiverId);
        const chatter = chat.newUser;
        chatter.id = chat.receiverId;
        setChatIdValue(chat.chatId);
        setOtherChatter(chatter);
        setSearchValue(false);
    }

    return(
        <div className ='chatlist'>
            <div className="search">
                <div className="searchbar">
                    <input type="text" placeholder="Search" />
                </div>
                <button className="add" onClick={() => setSearchValue((prev) => !prev)}>+</button>
            </div>
            {!user && <div><p>Please log in to chat.</p></div>}
            {isChatEmpty && <div><p>Add a user to chat!</p></div>}
            {chats.map((chat) => (
                <div className="item" key={chat.chatId} onClick={()=>handleSelect(chat)}>
                    <img src={chat.newUser?.profilePicture || chatterProfilePicture} alt="" />
                    <div className="texts">
                        <span>{chat.newUser?.firstName} {chat.newUser?.lastName}</span>
                        <p>{chat?.lastMessage}</p>
                    </div>
                </div>))}
        </div>
    )
}

export default Chatlist;