import React from 'react';
import SideBar from '../../components/admin/SideBar';
import AdminDashboardDetails from '../../components/admin/dashboard';

const AdminDashboard = () => {
    return (
        <div>
            <SideBar />   
            <AdminDashboardDetails />
        </div>
    );
}

export default AdminDashboard;
