import React, { useState } from 'react';
import Chat from '../Chat/Chat.jsx';
import List from '../List/List.jsx';
import Detail from '../Detail/Detail.jsx';
import "./Chatbox.css"

const Chatbox = () => {
    

    return(
        <div className='chat-container'>
            <div><List/></div>
            <div><Chat/></div>
        </div>
    )
}

export default Chatbox