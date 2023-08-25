import React from 'react';
import SideBar from '../../components/admin/SideBar';
import List from '../../components/admin/UsersList';

const ListUsers = () => {
    return (
        <div>
            <div>
                <SideBar />
                <List />
            </div>
        </div>
    );
}

export default ListUsers;
