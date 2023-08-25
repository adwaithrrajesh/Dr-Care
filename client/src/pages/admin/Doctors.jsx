import React from 'react';
import List from '../../components/admin/DoctorList';
import SideBar from '../../components/admin/SideBar';

const DoctorList = () => {
    return (
        <div>
            <SideBar />
            <List />
        </div>
    );
}

export default DoctorList;
