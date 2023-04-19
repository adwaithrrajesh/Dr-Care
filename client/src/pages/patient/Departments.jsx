import React from 'react';
import Header from '../../components/patient/Header';
import Search from '../../components/patient/searchbox/DepartmentSearch';
import Cards from '../../components/patient/DepartmentCards';
import Footer from '../../components/patient/Footer';

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
