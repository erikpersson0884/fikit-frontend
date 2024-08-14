import React from "react";
import './EditPerson.css'

import {Person} from '../../../types'

const EditPerson:React.FC<Person> = ({person}) => {
    return (
        <div className="editPerson">
            <img className="editPersonImage" src="images/icons/upload.svg" alt="upload image" />

            {/* <div className="test"> */}
            <input placeholder="Name" value={person.name}></input>
            <input placeholder="Nick" value={person.nick}></input>
            <input placeholder="Post" value={person.post}></input>
            <input placeholder="url" value={person.url}></input>
            {/* </div> */}
            <textarea placeholder="Description" value={person.description}></textarea>
        </div>
    )

}

export default EditPerson;