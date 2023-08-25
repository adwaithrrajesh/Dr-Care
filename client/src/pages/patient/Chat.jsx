import React, { useEffect, useRef,useState } from 'react';
import ChatDetails from '../../components/patient/chat/ChatDetails';
import ChatHeader from '../../components/patient/chat/ChatHeader';
import {io} from 'socket.io-client'
import { host } from '../../instance/instance';
import { getProfileDetails } from '../../API/user';


const Chat = () => {

    const socket = useRef()
    const [currentUser, setCurrentUser] = useState();


    useEffect(() => {
        getUserIdWithToken()
    }, []);

    const getUserIdWithToken = async() =>{
        const response = await getProfileDetails()
        setCurrentUser(response.data.userDetails)
    }


    // -------------------------------------SocketIO Setup-----------------------------------

    useEffect(() => {
        if(currentUser){
            socket.current = io(host)
            socket.current.emit('add-user',currentUser._id)
        }
    }, [currentUser]);





    return (
        <div>
            <ChatHeader />
            <ChatDetails socket={socket} current={currentUser} />
        </div>
    );
}

export default Chat;
