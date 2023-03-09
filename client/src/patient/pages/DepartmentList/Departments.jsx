import React from 'react';
import Header from '../Components/header/Header';
import Search from './searchbox/Search';
import Cards from './cards/Cards';
import Footer from '../Components/footer/Footer';

const Departments = () => {
    return (
        <div>
            <Header />
            <Search />
            <Cards />
            <Footer />
        </div>
    );
}

export default Departments;
