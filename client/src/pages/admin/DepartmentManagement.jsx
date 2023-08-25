import React from 'react';
import SideBar from '../../components/admin/SideBar'
import DepartmentList from '../../components/admin/DepartmentList';

const DepartmentManagement = () => {
    return (
        <div>
            <SideBar />
            <DepartmentList />
        </div>
    );
}

export default DepartmentManagement;
