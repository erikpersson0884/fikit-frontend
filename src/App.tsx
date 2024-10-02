import React from 'react'
import './App.css'

import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import { Group } from './types'

import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import HomePageNavigation from './Components/HomePage/HomePageNavigation/HomePageNavigation'
import LoginDiv from './Components/auth/LoginDiv'


import SittandeSection from './Components/HomePage/SittandeSection/SittandeSection'
import PatetosSection from './Components/HomePage/PatetosSection/PatetosSection'

import { AuthProvider } from './AuthenticationContext'
import AdminPanel from './Components/PatetosPage/AdminPanel'

import Frontpage from './Components/HomePage/FrontPage/Fontpage';
import Joinpage from './Components/HomePage/Joinpage/Joinpage';

import RecipesPage from './Components/HomePage/Recipes/RecipesPage';
import ContactPage from './Components/HomePage/ContactPage/ContactPage';

function App() {
    const [groups, setGroups] = React.useState<Group[]>([]);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

    React.useEffect(() => {
        fetch(`${API_BASE_URL}/api/people/getAllGroups`)
          .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
                })
                .then(data => {
                    setGroups(data);
                })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <AuthProvider>
            <BrowserRouter basename='/fikit-frontend/'>
                <Header />
                <HomePageNavigation />
                <Routes>

                    <Route path="/" element={<Frontpage />} />

                    {groups[0] && 
                        <Route path="/sittande" element={<SittandeSection group={groups[0]} /> } />
                    }

                    <Route path="/patetos" element={
                            <PatetosSection groups={groups.slice(1)} />
                    }></Route>


                    <Route path="/recipes" element={ // 
                        <RecipesPage />
                    }></Route>

                    <Route path="/join" element={
                        <Joinpage />
                    }></Route>

                    <Route path="/contact" element={
                        <ContactPage />
                    }></Route>


                    <Route path="/managePeople" element={ 
                        <AdminPanel groups={groups} setGroups={setGroups} />
                    }></Route>

                    <Route path="/login" element={
                        <LoginDiv />
                    }></Route>

                </Routes>
                <Footer />
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;