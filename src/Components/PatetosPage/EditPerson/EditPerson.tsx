import React from "react";
import './EditPerson.css'

import { Person } from '../../../types'
import axios from "axios";
import PopupButton from "../../PopupButton/PopupButton";

const EditPerson: React.FC<{ person: Person, groupId: string, deletePerson: (id: string) => void }> = ({ person, groupId, deletePerson }) => {
    const [image, setImage] = React.useState<File | null>(null);
    const [name, setName] = React.useState<string>(person.name);
    const [nick, setNick] = React.useState<string>(person.nick);
    const [post, setPost] = React.useState<string>(person.post);
    const [url, setUrl] = React.useState<string>(person.link);
    const [description, setDescription] = React.useState<string>(person.description);
    const [isFormChanged, setIsFormChanged] = React.useState<boolean>(false);

    React.useEffect(() => {
        setName(person.name);
        setNick(person.nick);
        setPost(person.post);
        setUrl(person.link);
        setDescription(person.description);
    }, [person]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
            setIsFormChanged(true);
        }
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        setIsFormChanged(true);
    };

    const handleNickChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNick(event.target.value);
        setIsFormChanged(true);
    };

    const handlePostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPost(event.target.value);
        setIsFormChanged(true);
    };

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
        setIsFormChanged(true);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
        setIsFormChanged(true);
    };

    const updatePerson = (event: React.FormEvent) => {

        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
        event.preventDefault(); // Prevent page reload

        const updatedPerson = {
            id: person.id,
            name,
            nick,
            post,
            link: url,
            description,
        }

        const data = new FormData();
        data.append('personImage', image as Blob);
        data.append('updatedPerson', JSON.stringify(updatedPerson));
        data.append('groupId', groupId);
        if (localStorage.getItem('adminKey')) data.append('adminKey', localStorage.getItem('adminKey') ?? '');
        else throw new Error('Admin key not found');

        axios.post(`${API_BASE_URL}/api/people/updatePerson`, data)
        .then(response => {
            if (response.status === 200) {
                person = response.data;
                setIsFormChanged(false);
            }
        });
    }

    const isFieldChanged = (value: string, originalValue: string) => {
        return value !== originalValue ? "changedField" : "";
    }

    React.useEffect(() => {
        const isFormChanged =
            name !== person.name ||
            nick !== person.nick ||
            post !== person.post ||
            url !== person.link ||
            description !== person.description;

        setIsFormChanged(isFormChanged);
    }, [name, nick, post, url, description, person]);

    const handleDeletePerson = () => {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
        axios.post(`${API_BASE_URL}/api/people/deletePerson`, {
            personId: person.id,
            groupId,
            adminKey: localStorage.getItem('adminKey')
        })
        .then(response => {
            console.log(response);
            deletePerson(person.id);
        })
        .catch(error => {
            console.error("There was an error deleting the person!", error);
        });
    }

    const [showDeletePersonPopup, setShowDeletePersonPopup] = React.useState<boolean>(false);


    return (
        <>
        <form className="editPerson" onSubmit={updatePerson}>
            <div className="inputDiv editPersonImageInputs">
                <div 
                    className="editPersonImage" 
                    style={person.imageFileName?
                        {backgroundImage: `url(${import.meta.env.VITE_PROFILEIMAGES_URL + person.imageFileName})`}
                        :
                        {backgroundImage: `url("images/icons/image.svg")`}
                    }
                >
                    <div className="editImageOverlay" onClick={() =>
                        {
                            const inputElement = document.getElementById(`updatePersonImgageInput${person.id}`);
                            if (inputElement) inputElement.click();
                        }
                    }>
                        <img src="images/icons/edit.svg" alt="edit image" />
                    </div>

                </div>

                <button className="inputDiv editPersonImageInputDiv">
                    <label htmlFor={`updatePersonImgageInput${person.id}`} className="editPersonImageLabel inputDiv">
                        Upload new Image
                        <img src="images/icons/upload.svg" alt="upload image" />
                    </label>
                    <input
                        id={`updatePersonImgageInput${person.id}`}
                        className="hidden"
                        type="file"
                        onChange={handleImageChange}
                    />
                </button>

            </div>
 
            <div className="inputDiv editPersonInputs">
                <div className="inputDiv">
                    <label htmlFor="name">Name</label>
                    <input
                        placeholder="Name"
                        value={name}
                        onChange={handleNameChange}
                        className={isFieldChanged(name, person.name)}
                    />
                </div>

                <div className="inputDiv">
                    <label htmlFor="nick">Nick</label>
                    <input
                        placeholder="Nick"
                        value={nick}
                        onChange={handleNickChange}
                        className={isFieldChanged(nick, person.nick)}
                    ></input>   
                </div>

                <div className="inputDiv">
                    <label htmlFor="post">Post</label>
                    <input
                        placeholder="Post"
                        value={post}
                        onChange={handlePostChange}
                        className={isFieldChanged(post, person.post)}
                    ></input>
                </div>


                <div className="inputDiv">
                    <label htmlFor="url">Url</label>
                    <input
                        placeholder="Url"
                        value={url}
                        onChange={handleUrlChange}
                        className={isFieldChanged(url, person.link)}
                    ></input>
                </div>

            </div>

            <div className="descriptionAndButtons inputDiv">
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={handleDescriptionChange}
                    className={isFieldChanged(description, person.description)}
                ></textarea>

                
                    <button 
                        className={`updateButton ${isFormChanged ? "" : "invisible"}`} 
                        type="submit">
                        Update Person
                    </button>
                
            </div>
            
            <button className="deletePersonButton deleteButton" onClick={() => setShowDeletePersonPopup(true)}>
                <img src="images/icons/delete.svg" alt="delete person" />
            </button>
        </form>

        {showDeletePersonPopup &&
            <PopupButton text="Delete Person" onClick={handleDeletePerson} hide={() => setShowDeletePersonPopup(false)} />
        }
    
        </>
    )
}

export default EditPerson;