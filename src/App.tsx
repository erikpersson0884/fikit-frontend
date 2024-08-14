import React from 'react'
import './App.css'

import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import { Group } from './types'

import Header from './Components/Header/Header'
import HomePageNavigation from './Components/HomePage/HomePageNavigation/HomePageNavigation'
import LoginDiv from './Components/auth/LoginDiv'


import SittandeSection from './Components/HomePage/SittandeSection/SittandeSection'
import PostSection from './Components/HomePage/PostSection/PostSection'
import PatetosSection from './Components/HomePage/PatetosSection/PatetosSection'

import { AuthProvider } from './AuthenticationContext'
import AdminPanel from './Components/PatetosPage/AdminPanel'


function App() {
    const [groups, setGroups] = React.useState<Group[]>([]);

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

    return (
        <AuthProvider>
            <BrowserRouter basename='/fikit-frontend/'>
                <Header />
                <Routes>
                    <Route path="/" element={
                        <>
                            <HomePageNavigation />
                            {groups[0] && <SittandeSection group={groups[0]} />}
                            <PostSection />
                            <PatetosSection groups={groups.slice(1)} />
                        </>

                    }></Route>

                    <Route path="/adminPanel" element={ 
                        <AdminPanel groups={groups} />
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