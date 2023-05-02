import React from 'react';
import DoctorHeader from '../../components/doctor/DoctorHeader';
import DoctorDashboardDetails from '../../components/doctor/dashboard';
const DoctorDashboard = () => {
    return (
        <div>
            <DoctorHeader />
            <DoctorDashboardDetails />
        </div>
    );
}

export default DoctorDashboard;
