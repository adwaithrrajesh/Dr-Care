import React from 'react';
import Header from '../../components/patient/Header';
import Profile from '../../components/patient/DoctorProfile/Profile/Profile';
import About from '../../components/patient/DoctorProfile/About/About';
import Footer from '../../components/patient/Footer';


const DoctorProfile = () => {

    
    return (
        <div>
            <Header />
            <Profile />
            <About />
            <Footer />
        </div>
    );
}

export default DoctorProfile;
