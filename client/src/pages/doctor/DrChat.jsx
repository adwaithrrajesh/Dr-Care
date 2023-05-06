import React, { useEffect, useRef,useState } from 'react';
import DrChatDetails from '../../components/doctor/chat/DrChatDetails';
import DrChatHeader from '../../components/doctor/chat/DrChatHeader';
import {io} from 'socket.io-client'
import { host } from '../../instance/instance';
import { getDoctorDetails } from '../../API/doctor';

const DrChat = () => {

    const socket = useRef()
    const [currentUser, setCurrentUser] = useState();

 // -------------------------------------GETTING DOCTOR WITH ID-----------------------------------

    useEffect(() => {
        getDoctorIdWithToken()
    }, []);
        const getDoctorIdWithToken = async()=>{
            const response = await getDoctorDetails()
            setCurrentUser(response.data.doctorDetails)
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
            <DrChatHeader />
            <DrChatDetails socket={socket} current={currentUser}/>
        </div>
    );
}

export default DrChat;
