import React, { useState } from 'react';
import Chat from '../Chat/Chat.jsx';
import List from '../List/List.jsx';
import Detail from '../Detail/Detail.jsx';
import "./Chatbox.css"

const Chatbox = () => {
    

    return(
        <section>
            <List/>
            <Chat/>
            <Detail/>
        </section>
    )
}

export default Chatbox