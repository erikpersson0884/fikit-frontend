import React from "react";
import { Group } from "../../types";

interface EditGroupMenuProps {
    activeGroup: Group | null;
    setActiveGroup: (group: Group) => void;

    groups: Group[];
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
}

const EditGroupMenu: React.FC<EditGroupMenuProps> = ({ activeGroup, setActiveGroup, groups, setGroups }) => {

    function addGroup(year: string, name: string) {
        console.log(localStorage.getItem('adminKey'));
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/people/addGroup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "adminKey" : localStorage.getItem('adminKey'),
                "newGroup": {
                    "year": year,
                    "name": name
                }
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
        <ul className="sidebar noUlFormatting">
            {groups.map((group: Group) => (
                <li className={ activeGroup && activeGroup.id === group.id? "active" : ""} key={group.id} onClick={() => setActiveGroup(group)}>
                        {group.year} {group.name}
                </li>
            ))}
            <li onClick={() => addGroup('', 'New Group')}>
                <img src="images/icons/add.svg" alt="Add Group" />
                Add Group
            </li>
        </ul>
    )
}

export default EditGroupMenu;