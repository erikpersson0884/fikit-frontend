import React from 'react';
import './EditPosts.css';

import EditPostDiv from '../EditPostDiv/EditPostDiv';
import { Post } from '../../../types';

const EditPosts: React.FC = () => {
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
        <div className='editPosts uploadPost'>
            <h2>Edit Existing Post:</h2>
            <hr />
            {posts.map((post) => (
                <EditPostDiv key={post.id} post={post} />
            ))}
        </div>
    );
}

export default EditPosts;