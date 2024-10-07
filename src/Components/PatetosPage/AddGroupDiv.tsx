import React, { FormEvent } from 'react';

const AddGroupDiv: React.FC<{ addGroup: (year: string, name: string) => void }> = ({ addGroup }) => {
    let [newGroupYear, setNewGroupYear] = React.useState<string>("");
    let [newGroupName, setNewGroupName] = React.useState<string>("");

    
    const handleNewGroupYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewGroupYear(event.target.value);
    };

    const handleNewGroupNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewGroupName(event.target.value);
    };

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        addGroup(newGroupYear, newGroupName);
    }

    return (
        <form className='addGroupDiv'>
            <input id="newGroupYearInput" type="text" placeholder="Year" onChange={handleNewGroupYearChange}/>
            <input id="newYearNameInput" type='text' placeholder='Group Name' onChange={handleNewGroupNameChange} />


            <button className='button addGroupButton noButtonFormatting' onClick={(e) => handleSubmit(e)}>
                <img src='images/icons/addCircle.svg' alt='add patetos group' />
                <p>Add Group</p>
            </button>
        </form>

    )
}

export default AddGroupDiv;