import React from 'react'
import './App.css'

import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import { Group, Post } from './types'

import Header from './Components/Header/Header'
import HomePageNavigation from './Components/HomePage/HomePageNavigation/HomePageNavigation'
import LoginDiv from './Components/auth/LoginDiv'

import PeopleDiv from './Components/HomePage/PeopleDiv/PeopleDiv'
import PostGallery from './Components/HomePage/PostGallery/PostGallery'

import EditGroup from './Components/PatetosPage/EditGroup/EditGroup'

import { AuthProvider, useAuth } from './AuthenticationContext'



function App() {
    const [groups, setGroups] = React.useState<Group[]>([]);
    const [posts, setPosts] = React.useState<Post[]>([]);

    React.useEffect(() => {
        fetch('/api/getAllPeople')
          .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
                })
                .then(data => {
                    setGroups(data);
                    // console.log(data)
                })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    React.useEffect(() => {
    fetch('/api/getPosts')
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
        <AuthProvider>
            <BrowserRouter basename='/fikit-frontend/'>
                <Header />


                <Routes>
                    <Route path="/" element={
                        <>
                            <HomePageNavigation />
                            {groups[0] &&
                                <PeopleDiv id="currentBoard" group={groups[0]} />
                            }
                            <PostGallery posts={posts}/>
                            <div id="patetos">
                                {groups.map((group: Group, index: number) => (
                                    <PeopleDiv key={index} group={group} />
                                ))}
                            </div>
                        </>

                    }></Route>

                    <Route path="/adminPanel" element={ 
                            <div className='adminPanel'>
                                {groups.map((group: Group, index: number) => (
                                    <EditGroup key={index} group={group} />
                                ))}
                            </div>
                    }></Route>

                    <Route path="/login" element={
                        <LoginDiv />
                    }></Route>

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;