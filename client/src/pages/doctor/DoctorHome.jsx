import React from 'react';
import DoctorHeader from '../../components/doctor/DoctorHeader';
import Options from '../../components/doctor/HomeScreenOptions';
import DoctorFooter from '../../components/doctor/DoctorFooter';


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
