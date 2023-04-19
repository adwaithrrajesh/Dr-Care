import React from 'react';
import SideBar from '../../components/admin/SideBar';
import VerificationList from '../../components/admin/DoctorVerificationList'

const DoctorVerification = () => {
    return (
        <div>
            <SideBar />
            <VerificationList />
        </div>
    );
}

export default DoctorVerification;
