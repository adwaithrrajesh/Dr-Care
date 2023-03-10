import React from 'react';
import Chat from './chat/chat';
import DoctorHeader from '../Components/Header/DoctorHeader';

const DrChat = () => {
    return (
        <div>
            <DoctorHeader />
            
           <Chat />
        </div>
    );
}

export default DrChat;
