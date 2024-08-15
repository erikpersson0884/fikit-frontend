import React from "react";
import './UploadPost.css';
import axios from "axios";

const UploadPost: React.FunctionComponent = () => {

    const [image, setImage] = React.useState<File | null>(null);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    const uploadPost = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent page reload
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

        const newPost = new FormData();
        newPost.append('title', title);
        newPost.append('description', description);
        newPost.append('postImage', image as Blob);     
        newPost.append('adminKey', localStorage.getItem('adminKey') as string);   

        axios.post(`${API_BASE_URL}/api/posts/addPost`, newPost)
            .then((response) => {
                if (response.status === 200) {
                    // Handle successful post upload
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="uploadPost">
            <h2>Upload Post</h2>
            <hr />
            <form id="uploadPostForm" className="uploadPostForm" onSubmit={uploadPost}>
                <div className="content-fit">
                    <img 
                        className="uploadPostImage" 
                        src={image ? URL.createObjectURL(image) : 'images/icons/image.svg'} 
                        onClick={() => document.getElementById('uploadPostImageInput')?.click()}
                        alt="Post" 
                    />

                    <input 
                        id="uploadPostImageInput" 
                        className="hidden" 
                        type="file" 
                        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                    />

                    <label 
                        className="uploadPostImageLabel" 
                        htmlFor="uploadPostImage" 
                        onClick={() => document.getElementById('uploadPostImageInput')?.click()}
                    >
                        Upload Image
                        <img src="images/icons/upload.svg" alt="Upload" />
                    </label>
                </div>
                <div className="uploadPostTextDiv">
                    <textarea placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                    <button className={(image !== null || title || description)? 'button noButtonFormatting' : ' noButtonFormatting disabledButton'}>
                        Upload
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UploadPost;
