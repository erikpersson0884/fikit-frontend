import React from 'react'
import './AdminPanel.css'
import EditGroup from './EditGroup/EditGroup';
import AddGroupDiv from './AddGroupDiv';

import { Group } from '../../types'
import { setgroups } from 'process';

const AdminPanel: React.FC<{groups: Group[], setGroups: React.Dispatch<React.SetStateAction<Group[]>>}> = ({groups, setGroups}) => {

    const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    function addGroup(year: string, name: string) {
        console.log(localStorage.getItem('adminKey'));
        fetch(`${VITE_API_BASE_URL}/api/people/addGroup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "adminKey" : localStorage.getItem('adminKey'),
                "year": year,
                "name": name
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                return response.json();
            }
        })
        .then(newGroup => {
            setGroups([...groups, newGroup]);
        })
    }

    return (
        <div className='adminPanel'>
            {groups.map((group: Group, index: number) => (
                <EditGroup key={index} group={group} />
            ))}
            <AddGroupDiv addGroup={addGroup} />
        </div>
    )
}

export default AdminPanel;