import React from 'react';
import DoctorHeader from '../Components/Header/DoctorHeader'
import AppointmentList from './AppointmentList/AppointmentList';
import DoctorFooter from '../Components/footer/DoctorFooter';

const Appointments = () => {
    return (
        <div>
            <DoctorHeader />
            <AppointmentList />
            <DoctorFooter />
        </div>
    );
}

export default Appointments;
