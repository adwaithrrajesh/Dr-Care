import React from 'react';
import Header from '../Components/header/Header';
import Banner from './banner/Banner';
import About from './about/About';
import Doctors from './doctors/Doctors';
import Departments from './departments/Departments';
import Footer from '../Components/footer/Footer';


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
