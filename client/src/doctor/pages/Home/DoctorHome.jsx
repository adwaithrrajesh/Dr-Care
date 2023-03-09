import React from 'react';
import DoctorHeader from '../Components/Header/DoctorHeader';
import Options from './options/options';
import DoctorFooter from '../Components/footer/DoctorFooter';


const DoctorHome = () => {

    return (
        <div>  
            <DoctorHeader />
            <Options />
            <DoctorFooter />
        </div>
    );
}

export default DoctorHome;
