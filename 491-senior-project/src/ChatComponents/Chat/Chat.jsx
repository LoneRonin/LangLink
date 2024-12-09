import { useState, useEffect, useRef } from "react"
//import DefaultProf from '../ProfilePics/defaultprofile.png';
import "./Chat.css"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const Chat = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [chat, setChat] = useState();

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior:"smooth" });
    });

    useEffect(() => {
        const fetchChat = onSnapshot(doc(db,"chats", ""), (res)=> {
            setChat(res.data())
        })

        return () => {
            fetchChat();
        }
    },[])

    return(
        <div className ='chat'>
            <div className="top">
                <div className="user">
                    <img src="./defaultprofile.png" alt=""/>
                    <div className="texts">
                        <span>Other User</span>
                    </div>
                </div>
            </div>
            <div className="center">
                <div className="message">
                    <img src=".defaultprofile.png" alt=""/>
                    <div className="texts">
                        <p>hey now, youre a rockstar, get your game on, go play ay ay</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>hey somebody once told me that the world was gonna roll me</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./491-senior-project\src\ProfilePics\defaultprofile.png" alt=""/>
                    <div className="texts">
                        <p>i ain't the sharpest tool in the shed</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <input type="text" placeholder="Send a message..." />
                <button className="send-button">Send</button>
            </div>
        </div>
    )
}

export default Chat

