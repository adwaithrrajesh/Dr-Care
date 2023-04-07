import React from 'react';
import Header from '../Components/header/Header';
import Search from './searchbox/Search';
import List from './List/List';
import Filter from './List/filter/filter';
import Footer from '../Components/footer/Footer';

const Doctors = () => {
    return (
        <div>
            <Header />
            <Search />
            <Filter />
            <List />
            <Footer />
        </div>
    );
}

export default Doctors;
