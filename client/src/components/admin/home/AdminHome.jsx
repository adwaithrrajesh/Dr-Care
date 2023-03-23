import React from 'react';
import AdminSidebar from '../partials/AdminSidebar';
import Dashboard from './dashboard/dashboard';

const AdminHome = () => {
    return (
        <div>
            <div className="flex">
            <AdminSidebar />
            <Dashboard />
            </div>
        </div>
    );
}

export default AdminHome;
