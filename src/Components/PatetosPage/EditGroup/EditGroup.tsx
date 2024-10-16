import React from "react";
import './EditGroup.css'

import { Group, Person } from '../../../types';
import axios from "axios";
import EditPerson from "../EditPerson/EditPerson";
import PopupButton from "../../PopupButton/PopupButton";

interface EditGroupProps {
    group: Group;
    groups: Group[];
    setGroups: (groups: Group[]) => void;
}

const EditGroup: React.FC<EditGroupProps> = ({ group, groups, setGroups }) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
    
    React.useEffect(() => {
        setYear(group.year);
        setName(group.name);
    }, [group]);

    
    // Create local state for input fields
    const [year, setYear] = React.useState<number>(group.year);
    const [name, setName] = React.useState<string>(group.name);

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
            if (response.status === 200) {
                const remainingGroups = groups.filter(g => g.id !== group.id);
                setGroups(remainingGroups);
            } else {
                throw new Error("Error deleting group");
            }
        })
        .catch(error => {
            console.error("There was an error deleting the group!", error);
        });
    }

    const addPerson = (groupId: string) => {
        fetch(`${API_BASE_URL}/api/people/addPerson`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                adminKey: localStorage.getItem('adminKey'),
                groupId: groupId,
            }),
        }).then (response => response.json())
        .then((newPerson: Person) => {
            const newGroups = groups.map(group => {
                if (group.id === groupId) {
                    group.people.push(newPerson);
                }
                return group;
            })
            setGroups(newGroups);
        })
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

    const [showDeleteGroupPopup, setShowDeleteGroupPopup] = React.useState<boolean>(false);
    console.log(group.name);
    return (
        <div className="editGroupDiv">
            <header className="editGroupHeader">
                <div className="editGropYearAndName">
                    <div className="inputDiv">
                        <label htmlFor={`editGroupYear-${group.id}`}>Year:</label>
                        <input 
                            id={`editGroupYear-${group.id}`} 
                            placeholder="Year" 
                            value={year} 
                            onChange={handleYearChange} 
                            className="noInputFormatting"
                        />
                    </div>
                    <div className="inputDiv">
                        <label htmlFor={`editGroupNickname-${group.id}`}>Nickname:</label>
                        <input 
                            id={`editGroupNickname-${group.id}`} 
                            placeholder="Nickname" 
                            value={name} 
                            onChange={handleNicknameChange} 
                            className="noInputFormatting" 
                        />
                    </div>
                </div>

                <div className="editGroupButtons">
                    <button 
                        className="updateButton" 
                        onClick={handleUpdateGroup}
                    >
                        Update Group
                    </button>
                    <button 
                        className="deleteButton" 
                        onClick={() => setShowDeleteGroupPopup(true)}
                    >
                        Delete Group
                    </button>
                </div>

            </header>

            <hr />

            <div className="editGroupPeople">
                {group.people.map((person: Person, index: number) => (
                    <EditPerson key={index} person={person} groupId={group.id} deletePerson={deletePerson}/>
                ))}

                <button onClick={() => addPerson(group.id)}>
                    <img src="images/icons/add.svg" alt="add person" className="addPersonIcon" />
                    <p className="addPersonText">Add person</p>
                </button>
            </div>
            
            <PopupButton show={showDeleteGroupPopup} text="Delete Group" onClick={handleDeleteGroup} hide={() => setShowDeleteGroupPopup(false)}/>
            
        </div>
    );
}

export default EditGroup;
