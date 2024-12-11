import { useState, useEffect, useRef, useContext } from "react"
//import DefaultProf from '../../ProfilePics/defaultprofile.png';
import "./Chat.css"
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import searchContext from "../searchContext";
import { getAuth } from "firebase/auth";

const Chat = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [chat, setChat] = useState();
    const {chatId, otherUser} = useContext(searchContext);
    const [chatIdValue, setChatIdValue] = chatId;
    const [chatter, setChatter] = otherUser;
    const auth = getAuth();
    const user = auth.currentUser;

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior:"smooth" });
    });

    useEffect(() => {
        const unSub = onSnapshot(
            doc(db, "chats", chatIdValue), 
            (res) => {
                setChat(res.data());
            }
        );

        return () => {
            unSub();
        };
    }, [chatId]);

    const handleSend = async () => {
        //console.log("sending: ", text)
        //console.log(chatIdValue);
        if(text === "") return;

        try{
            await updateDoc(doc(db, "chats", chatIdValue), {
                messages:arrayUnion({
                    senderId: user.uid,
                    text,
                    createdAt: new Date(),
                })
            });

            const userIDs = [user.uid, chatter.id];
            
            userIDs.forEach(async (id)=>{
                const userChatsRef = doc(db, "userchats", id);
                const userChatSnapshot = await getDoc(userChatsRef);
                if(userChatSnapshot.exists()){
                    const userChatData = userChatSnapshot.data();
                    const chatIndex = userChatData.chats.findIndex(c=> c.chatId === chatIdValue);

                    userChatData.chats[chatIndex].lastMessage = text;
                    userChatData.chats[chatIndex].isSeen = id === user.uid ? true : false;//returns true if userid, false for other user
                    userChatData.chats[chatIndex].updatedAt = Date.now();

                    await updateDoc(userChatsRef, {chats:userChatData.chats});
                }
            });
        }catch(err){console.log(err);}
    }

    return(
        <div className ='chat'>
            <div className="top">
                <div className="user">
                    <img src="./defaultprofile.png" alt=""/>
                    <div className="texts">
                        <span>{chatter?.firstName} {chatter?.lastName}</span>
                    </div>
                </div>
            </div>

            <div className="center">
                {chat?.messages.map((message) => (
                    <div 
                        className={message.senderId === user?.uid ? "message own" : "message"} 
                        key={message?.createAt}
                        >
                        <div className="texts">
                            <p>{message.text}</p>
                            <span>{}</span>
                        </div>
                    </div>
                ))}
                <div ref={endRef}></div>
            </div>

            <div className="bottom">
                <input
                    type="text" 
                    placeholder="Send a message..." 
                    value={text}
                    onChange={(e)=> setText(e.target.value)}
                />
                <button className="send-button" onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Chat

