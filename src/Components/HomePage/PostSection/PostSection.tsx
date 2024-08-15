import React from "react";
import { Post } from "../../../types";
import PostGallery from "../PostGallery/PostGallery";
import './PostSection.css';

const PostSection = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
    const [posts, setPosts] = React.useState<Post[]>([]);

    React.useEffect(() => {
        fetch(`${API_BASE_URL}/api/posts/getAllPosts`)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
                })
                .then(data => {
                    setPosts(data);
                })
                .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <section id="postSection">
            <h2>Posts</h2>
            <PostGallery posts={posts}/>
        </section>
    )
}

export default PostSection;