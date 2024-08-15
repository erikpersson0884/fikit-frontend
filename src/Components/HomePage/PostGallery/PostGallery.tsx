import React from "react";

import { Post } from "../../../types";
import PostDiv from "./PostDiv";


const PostGallery: React.FC<{ posts: Post[] }> = ({ posts }) => {
    return (
        <div id="posts">
            {posts.map((post: Post, index) => (
                <PostDiv key={index} post={post} />
            ))}
        </div>
    );
}

export default PostGallery;