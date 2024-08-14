import React from 'react';
import { Person } from '../../types';
import './PersonDiv.css';


const PersonDiv: React.FC<Person> = ({person}) => {
    const backendUrl = import.meta.env.VITE_PROFILEIMAGES_URL;

    return (
        <div className='person'>
            <div className='personTextImage'>
                <div className='personImage' style={
                    {
                        backgroundImage: `url(${backendUrl + person.imageFile})`
                    }
                }></div>
                <div className='personText'>
                    <h2 className='personNick'>{person.nick}</h2>
                    <p className='personDescription'>{person.description}</p>
                </div>
            </div>
            <p className='personPost'>{person.post}</p>
        </div>
    );
};

export default PersonDiv;