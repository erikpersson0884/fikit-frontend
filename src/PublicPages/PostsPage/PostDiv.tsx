import React from "react";
import "./PostDiv.css";

import type { Post } from "../../../types";


import { useState, useEffect } from 'react';

const useImageValidation = (imagePath: string) => {
  const [isValidImage, setIsValidImage] = useState(false);

  useEffect(() => {
    if (!imagePath) return;

    const img = new Image();
    img.src = imagePath;

    img.onload = () => setIsValidImage(true);
    img.onerror = () => setIsValidImage(false);
  }, [imagePath]);

  return isValidImage;
};


const PostDiv: React.FC<{post: Post}> = ({ post }) => {
    const backendUrl = import.meta.env.VITE_POSTIMAGES_URL;
    const imagePath = backendUrl + post.imageFileName;
    const isValidImage = useImageValidation(imagePath);
    
    return (
        <div className="postDiv" style={{backgroundImage: `url(${isValidImage ? imagePath : 'images/logos/fikit.png'}`}}>
            <div className="postImageCaption">
                <h2 className="postTitle">{post.title}</h2>
                <p className="postDescription">{post.description}</p>
            </div>
        </div>
    );
}

export default PostDiv;