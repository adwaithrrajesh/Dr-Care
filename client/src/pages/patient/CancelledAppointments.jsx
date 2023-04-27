import React from 'react';
import Header from '../../components/patient/Header';
import CancelledAppointmentDetails from '../../components/patient/CancelledAppointmentDetails';

const CancelledAppointments = () => {
    return (
        <div>
            <Header />
            <CancelledAppointmentDetails />
        </div>
    );
}

export default CancelledAppointments;
