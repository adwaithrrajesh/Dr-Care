import React from 'react';
import ChatDetails from '../../components/patient/chat/ChatDetails';
import ChatHeader from '../../components/patient/chat/ChatHeader';

const Chat = ({ socket }) => {
    return (
        <div>
            <ChatHeader />
            <ChatDetails socket={socket} />
        </div>
    );
}

export default Chat;
