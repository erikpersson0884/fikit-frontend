import React from "react";
import './EditGroup.css'

import { Group, Person } from '../../../types';
import axios from "axios";
import EditPerson from "../EditPerson/EditPerson";

const EditGroup: React.FC<{ group: Group }> = ({ group }) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
    const [showPeople, setShowPeople] = React.useState<boolean>(false);
    
    // Create local state for input fields
    const [year, setYear] = React.useState<string>(group.year);
    const [nickname, setNickname] = React.useState<string>(group.nickname);

    // Toggle function
    function toggleShowPeople() {
        setShowPeople(!showPeople);
    }

    // Handle input changes
    function handleYearChange(event: React.ChangeEvent<HTMLInputElement>) {
        setYear(event.target.value);
    }

    function handleNicknameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNickname(event.target.value);
    }

    function handleUpdateGroup() {
        axios.post(`${API_BASE_URL}/api/people/updateGroup`, {
            updatedgroup: {
                id: group.id,
                year,
                nickname
            }, adminKey: localStorage.getItem('adminKey')
        })

        // document.location.reload();
    }

    return (
        <div className="EditGroup">
            <header>
                <label htmlFor={`editGroupYear-${group.id}`}>Year:</label>
                <input 
                    id={`editGroupYear-${group.id}`} 
                    placeholder="Year" 
                    value={year} 
                    onChange={handleYearChange} 
                    className="noInputFormatting"
                />
                <label htmlFor={`editGroupNickname-${group.id}`}>Nickname:</label>
                <input 
                    id={`editGroupNickname-${group.id}`} 
                    placeholder="Nickname" 
                    value={nickname} 
                    onChange={handleNicknameChange} 
                    className="noInputFormatting" 
                />
                <button className="updateGroupButton noButtonFormatting" onClick={handleUpdateGroup}>Update Group</button>
            </header>

            {showPeople && 
                <div className="editGroupPeople">
                    {group.people.map((person: Person, index: number) => (
                        <EditPerson key={index} person={person} groupId={group.id} />
                    ))}
                </div>
            }

            <button className="noButtonFormatting expandGroup" onClick={toggleShowPeople}>
                <img src={showPeople ? "/images/icons/up.svg" : "/images/icons/down.svg"} alt="Toggle people" />
            </button>
        </div>
    );
}

export default EditGroup;
