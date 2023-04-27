import React from 'react';
import Header from '../../components/patient/Header';
import EditDetails from '../../components/patient/userProfile/editUserProfile/EditDetails';
import Footer from '../../components/patient/Footer';

const EditUserProfile = () => {
    return (
        <div>
            <Header />
            <EditDetails />
            <Footer />
        </div>
    );
}

export default EditUserProfile;
