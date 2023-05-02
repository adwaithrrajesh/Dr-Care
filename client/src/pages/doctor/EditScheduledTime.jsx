import React from 'react';
import DoctorHeader from '../../components/doctor/DoctorHeader';
import EditScheduledTimeForm from '../../components/doctor/EditScheduledTimeForm';

const EditScheduledTime = () => {
    return (
        <div>
            <DoctorHeader />
            <EditScheduledTimeForm />
        </div>
    );
}

export default EditScheduledTime;
