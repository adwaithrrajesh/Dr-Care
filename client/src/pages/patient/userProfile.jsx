import React from 'react';
import Header from '../../components/patient/Header';
import ProfileDetails from '../../components/patient/userProfile/profileDetails';
import Footer from '../../components/patient/Footer';

const UserProfile = () => {
    return (
        <div>
            <Header />
            <ProfileDetails />
            <Footer />
        </div>
    );
}

export default UserProfile;
