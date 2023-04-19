import React from 'react';
import Header from '../../components/patient/Header';
import Banner from '../../components/patient/home/Banner';
import About from '../../components/patient/home/About';
import Doctors from '../../components/patient/home/DoctorSideScroll';
import Departments from '../../components/patient/home/DepartmentSideScroll';
import Footer from '../../components/patient/Footer';


const Home = () => {
    return (
        <div>
            <Header />
            <Banner />
            <About />
            <Doctors />
            <Departments />
            <Footer />
        </div>
    );
}

export default Home;
