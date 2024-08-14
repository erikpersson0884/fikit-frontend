import React from 'react';
import PersonDiv from '../PersonDiv/PersonDiv';
import { Group, Person } from '../../types';
import './PeopleDiv.css';


const PeopleDiv: React.FC<Group> = ({ group }) => {
    return (
        <div className='peopleDiv'>
            {group.people.map((person: Person, index: number) => (
                <PersonDiv key={index} person={person} />
            ))}
        </div>
    );
};

export default PeopleDiv;