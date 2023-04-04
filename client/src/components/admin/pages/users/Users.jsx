import React from 'react';
import SideBar from '../../partials/SideBar';
import List from './list/list';

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
