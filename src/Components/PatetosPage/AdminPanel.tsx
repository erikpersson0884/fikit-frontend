import React from 'react'
import './AdminPanel.css'
import EditGroup from './EditGroup/EditGroup';
import EditGroupMenu from './EditGroupMenu';

import { Group } from '../../types'

const AdminPanel: React.FC<{groups: Group[], setGroups: React.Dispatch<React.SetStateAction<Group[]>>}> = ({groups, setGroups}) => {

    const [activeGroup, setActiveGroup] = React.useState<Group | null>(null);

    return (
        <div className='adminPanel'>
            <EditGroupMenu groups={groups} activeGroup={activeGroup} setActiveGroup={setActiveGroup} setGroups={setGroups} />

            <div className='editGroupContainer'>
                {activeGroup && 
                    <EditGroup group={activeGroup} groups={groups} setGroups={setGroups} />
                }
            </div>
        </div>
    )
}

export default AdminPanel;