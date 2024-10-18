import React from "react";
import './EditPostDiv.css';
import axios from "axios";

import { Post } from '../../../types'

const EditPostDiv: React.FC<{ post: Post }> = ({ post }) => {
    const [image, setImage] = React.useState<File | null>(null);
    const [title, setTitle] = React.useState<string>(post.title);
    const [description, setDescription] = React.useState<string>(post.description);
    const [isFormChanged, setIsFormChanged] = React.useState<boolean>(false);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
            setIsFormChanged(true);
        }
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(event.target.value);
        setIsFormChanged(true);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
        setIsFormChanged(true);
    };

    const updatePost = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent page reload
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

        let updatedPost = new FormData();
        updatedPost.append('title', title);
        updatedPost.append('description', description);
        updatedPost.append('image', image as Blob);     
        updatedPost.append('postId', post.id);
        updatedPost.append('adminKey', localStorage.getItem('adminKey') as string);   

        axios.post(`${API_BASE_URL}/api/posts/updatePost`, updatedPost)
            .then((response) => {
                if (response.status === 200) {
                    post = response.data;
                    setIsFormChanged(false);
                    setIsExpanded(false);
                    setTitle(post.title); // so that the expand says right title
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
    return (
        <div className="editPostDiv">
            {isExpanded ?
                <form className="uploadPostForm " onSubmit={updatePost}>
                    <div>
                        <img
                            className="uploadPostImage"
                            src={image ? URL.createObjectURL(image) : 'images/icons/image.svg'}
                            onClick={() => document.getElementById('postImageInput')?.click()}
                            alt="Post"
                        />

                        <input
                            id="postImageInput"
                            className="hidden"
                            type="file"
                            onChange={handleImageChange}
                        />

                        <label
                            className="uploadPostImageLabel"
                            htmlFor="postImage"
                            onClick={() => document.getElementById('postImageInput')?.click()}
                        >
                            Upload Image
                            <img src="images/icons/upload.svg" alt="Upload" />
                        </label>
                    </div>
                    <div className="uploadPostTextDiv">
                        <textarea placeholder="Title" value={title} onChange={handleTitleChange} />
                        <textarea placeholder="Description" value={description} onChange={handleDescriptionChange}></textarea>

                        <div className="buttonGroup">
                            <button className="cancelButton" onClick={() => setIsExpanded(false)}>
                                Cancel
                            </button>

                            <button className={(image?.name !== post.imageFileName || title===post.title || description === post.description)? 'button noButtonFormatting' : ' noButtonFormatting disabledButton'}>
                                Upload
                            </button>
                        </div>

                    </div>
                </form>

                :

                <button className="expandButton" onClick={() => setIsExpanded(true)}>
                    <h3>{title}</h3>
                    <img src="images/icons/down.svg" alt="Expand" />
                </button>


            }
        </div>
    )
}

export default EditPostDiv;
