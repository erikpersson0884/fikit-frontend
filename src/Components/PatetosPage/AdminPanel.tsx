import React from 'react'
import EditGroup from './EditGroup/EditGroup';

import { Group } from '../../types'

const AdminPanel: React.FC<{groups: Group[]}> = ({groups}) => {
    return (
        <div className='adminPanel'>
            {groups.map((group: Group, index: number) => (
                <EditGroup key={index} group={group} />
            ))}
        </div>
    )
}

export default AdminPanel;