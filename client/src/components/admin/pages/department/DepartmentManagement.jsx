import React from 'react';
import SideBar from '../../partials/SideBar'
import DepartmentList from './list/DepartmentList';

const DepartmentManagement = () => {
    return (
        <div>
            <SideBar />
            <DepartmentList />
        </div>
    );
}

export default DepartmentManagement;
