import React from "react";
import './EditGroup.css'

import { Group, Person } from '../../../types';
import axios from "axios";
import EditPerson from "../EditPerson/EditPerson";


const EditGroup: React.FC<{ group: Group; groups: Group[]; addPerson: any; setGroups: (groups: Group[]) => void }> = ({ group, groups, addPerson, setGroups }) => {

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
    const [showPeople, setShowPeople] = React.useState<boolean>(false);
    
    // Create local state for input fields
    const [year, setYear] = React.useState<number>(group.year);
    const [name, setName] = React.useState<string>(group.name);

    // Toggle function
    function toggleShowPeople() {
        setShowPeople(!showPeople);
    }

    // Handle input changes
    function handleYearChange(event: React.ChangeEvent<HTMLInputElement>) {
        const yearAsNumber = Number(event.target.value);
        setYear(yearAsNumber);
    }

    function handleNicknameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handleUpdateGroup() {
        axios.post(`${API_BASE_URL}/api/people/updateGroup`, {
            updatedgroup: {
                id: group.id,
                year,
                name,
            }, 
            adminKey: localStorage.getItem('adminKey')
        })
        .then(response => {
            const updatedGroup = response.data;
            updateGroup(updatedGroup);
        })
        .catch(error => {
            console.error("There was an error updating the group!", error);
        });
    }

    function updateGroup(groupToUpdate: Group) {
        const newGroups = groups.map(group => 
            group.id === groupToUpdate.id ? groupToUpdate : group
        );
        setGroups(newGroups);
    }


    function handleDeleteGroup() {
        axios.post(`${API_BASE_URL}/api/people/deleteGroup`, {
            groupId: group.id,
            adminKey: localStorage.getItem('adminKey')
        })
        .then(response => {
            const remainingGroups = groups.filter(g => g.id !== group.id);
            setGroups(remainingGroups);
        })
        .catch(error => {
            console.error("There was an error deleting the group!", error);
        });
    }

    function deletePerson(personId: string) {
        const updatedGroups = groups.map(group => {
            const updatedPeople = group.people.filter(person => person.id !== personId);
            return {
                ...group,
                people: updatedPeople
            }
        });
        setGroups(updatedGroups);
    }

    return (
        <div className="EditGroup">
            <header>
                <div>
                    <label htmlFor={`editGroupYear-${group.id}`}>Year:</label>
                    <input 
                        id={`editGroupYear-${group.id}`} 
                        placeholder="Year" 
                        value={year} 
                        onChange={handleYearChange} 
                        className="noInputFormatting"
                    />
                </div>
                <div>
                    <label htmlFor={`editGroupNickname-${group.id}`}>Nickname:</label>
                    <input 
                        id={`editGroupNickname-${group.id}`} 
                        placeholder="Nickname" 
                        value={name} 
                        onChange={handleNicknameChange} 
                        className="noInputFormatting" 
                    />
                </div>
                <button 
                    className="updateGroupButton noButtonFormatting" 
                    onClick={handleUpdateGroup}
                >
                    Update Group
                </button>
                <button 
                    className="updateGroupButton noButtonFormatting" 
                    onClick={handleDeleteGroup}
                >
                    Delete Group
                </button>
            </header>

            {showPeople && 
                <div className="editGroupPeople">
                    {group.people.map((person: Person, index: number) => (
                        <EditPerson key={index} person={person} groupId={group.id} deletePerson={deletePerson}/>
                    ))}

                    <button onClick={() => addPerson(group.id)}>
                        <img src="images/icons/add.svg" alt="add person" className="addPersonIcon" />
                        <p className="addPersonText">Add person</p>
                    </button>
                </div>
            }



            <button className="noButtonFormatting expandGroup" onClick={toggleShowPeople}>
                <img src={showPeople ? "images/icons/up.svg" : "images/icons/down.svg"} alt="Toggle pe</button>ople" />
            </button>
        </div>
    );
}

export default EditGroup;
