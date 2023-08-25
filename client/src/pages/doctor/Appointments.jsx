import React from 'react';
import DoctorHeader from '../../components/doctor/DoctorHeader'
import AppointmentList from '../../components/doctor/AppointmentList';
import DoctorFooter from '../../components/doctor/DoctorFooter';

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
