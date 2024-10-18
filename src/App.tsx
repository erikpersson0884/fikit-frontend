import React from 'react'
import './App.css'

import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import { Group, RecipeT } from './types'

import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import HomePageNavigation from './Components/PageNavigation/PageNavigation'
import LoginDiv from './Components/LoginDiv/LoginDiv'


import SittandeSection from './PublicPages/PeoplePage/SittandePage/SittandeSection'
import PatetosSection from './PublicPages/PeoplePage/PatetosPage/PatetosSection'

import { AuthProvider } from './AuthenticationContext'
import AdminPanel from './AdminPages/ManagePeople/ManagePeople'
import ManageRecipes from './AdminPages/ManageRecipes/ManageRecipes'

import Frontpage from './PublicPages/FrontPage/Fontpage';
import Joinpage from './PublicPages/Joinpage/Joinpage';

import RecipesPage from './PublicPages/RecipesPage/RecipesPage';
import ContactPage from './PublicPages/ContactPage/ContactPage';

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

    const [recipes, setRecipes] = React.useState<RecipeT[]>([]);

    React.useEffect(() => {
        fetch(`${API_BASE_URL}/api/recipes/getAllRecipes`)
          .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
                })
                .then(data => {
                    setRecipes(data);
                })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const [showLoginDiv, setShowLoginDiv] = React.useState<boolean>(false);


    return (
        <AuthProvider>
            <BrowserRouter basename='/fikit-frontend/'>
                <Header showLoginDiv={() => setShowLoginDiv(true)}/>
                <HomePageNavigation/>
                <LoginDiv showLoginDiv={showLoginDiv} setShowLoginDiv={setShowLoginDiv} />

                <Routes>
                    <Route path="/" element={<Frontpage />} />

                    {groups[0] && 
                        <Route path="/sittande" element={<SittandeSection group={groups[0]} /> } />
                    }

                    <Route path="/patetos" element={
                            <PatetosSection groups={groups.slice(1)} />
                    }></Route>


                    <Route path="/recipes" element={ // 
                        <RecipesPage recipes={recipes}/>
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

                    <Route path='/manageRecipes' element={
                        <ManageRecipes recipes={recipes} setRecipes={setRecipes} />
                    }></Route>

                </Routes>
                <Footer />
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;