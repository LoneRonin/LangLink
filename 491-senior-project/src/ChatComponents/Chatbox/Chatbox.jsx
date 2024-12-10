import React, { createContext, useState } from 'react';
import Chat from '../Chat/Chat.jsx';
import List from '../List/List.jsx';
import Chatlist from '../List/ChatList/Chatlist.jsx';
import Detail from '../Detail/Detail.jsx';
import AddUser from '../List/Chatlist/addUser/addUser.jsx';
import "./Chatbox.css"
import searchContext from '../searchContext.jsx';
import chatContext from '../chatContext.jsx';


const Chatbox = () => {
    const [chatSearch, setChatSearch] = useState(true);
    const [chatId, setChatId] = useState(null);
    const [isCurrentUserBlocked, setIsCurrentUserBlocked] = useState(false);
    const [isReceiverBlocked, setIsReceiverBlocked] = useState(false);

    return(
        <searchContext.Provider value={{chatSearch, setChatSearch}}>
            <div className='chat-container'>
                <List/>
                {!chatSearch && <Chat/>}
                {chatSearch && <AddUser/>}
            </div>
        </searchContext.Provider>
        
    )
}

export default Chatbox;