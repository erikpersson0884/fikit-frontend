import React from 'react';
import './PostPage.css';

import UploadPost from './UploadPost/UploadPost';
import EditPosts from './EditPosts/EditPosts';

import { Post } from '../../../types';


const PostsPage: React.FC = () => {


    return (
        <div className='postPage'>
            <UploadPost />
            <hr />
            <EditPosts />
        </div>
    );
}

export default PostsPage;