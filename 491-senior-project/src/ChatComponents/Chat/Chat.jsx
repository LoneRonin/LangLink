import { useState, useEffect, useRef } from "react"
//import DefaultProf from '../src/ProfilePics/defaultprofile.png';
import "./Chat.css"

const Chat = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior:"smooth" });
    });

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
                        <p>hey</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>hey</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./491-senior-project\src\ProfilePics\defaultprofile.png" alt=""/>
                    <div className="texts">
                        <p>hey</p>
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

