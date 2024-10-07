import React from "react";
import './EditPerson.css'

import { Person } from '../../../types'
import axios from "axios";

const EditPerson: React.FC<{ person: Person, groupId: string, deletePerson: (id: string) => void }> = ({ person, groupId, deletePerson }) => {
    const [image, setImage] = React.useState<File | null>(null);
    const [name, setName] = React.useState<string>(person.name);
    const [nick, setNick] = React.useState<string>(person.nick);
    const [post, setPost] = React.useState<string>(person.post);
    const [url, setUrl] = React.useState<string>(person.link);
    const [description, setDescription] = React.useState<string>(person.description);
    const [isFormChanged, setIsFormChanged] = React.useState<boolean>(false);

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



    return (
        <form className="editPerson" onSubmit={updatePerson}>
            <img
                className="editPersonImage"
                src="images/icons/upload.svg"
                alt="upload image"
                onClick={() => document.getElementById(`updatePersonImgageInput${person.id}`)?.click()}
            />
            <input
                id={`updatePersonImgageInput${person.id}`}
                className="hidden"
                type="file"
                onChange={handleImageChange}>
            </input>

            <input
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
                className={isFieldChanged(name, person.name)}
            ></input>
            <input
                placeholder="Nick"
                value={nick}
                onChange={handleNickChange}
                className={isFieldChanged(nick, person.nick)}
            ></input>
            <input
                placeholder="Post"
                value={post}
                onChange={handlePostChange}
                className={isFieldChanged(post, person.post)}
            ></input>
            <input
                placeholder="Url"
                value={url}
                onChange={handleUrlChange}
                className={isFieldChanged(url, person.link)}
            ></input>
            <textarea
                placeholder="Description"
                value={description}
                onChange={handleDescriptionChange}
                className={isFieldChanged(description, person.description)}
            ></textarea>

            {   
                isFormChanged && 
            <button 
                className={`button noButtonFormatting ${isFormChanged ? "" : "invisible"}`} 
                type="submit">
                Update Person
            </button>
            }
            
            <button className="button noButtonFormatting" onClick={handleDeletePerson}>Delete Person</button>
            
        </form>
    )
}

export default EditPerson;