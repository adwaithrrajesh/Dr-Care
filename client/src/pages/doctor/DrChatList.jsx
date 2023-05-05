import React from 'react';
import DoctorHeader from '../../components/doctor/DoctorHeader';
import DoctorChatListDetails from '../../components/doctor/chat/DrChatListDetails';


const DoctorChatList = () => {
    return (
        <div>
            <DoctorHeader />
            <DoctorChatListDetails />
        </div>
    );
}

export default DoctorChatList;
