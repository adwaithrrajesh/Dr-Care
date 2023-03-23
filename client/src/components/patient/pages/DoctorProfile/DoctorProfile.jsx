import React from 'react';
import Header from '../Components/header/Header';
import Profile from './Profile/Profile';
import About from './About/About';
import Footer from '../Components/footer/Footer';


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
