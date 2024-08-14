import React from 'react';
import './Navmenu.css';

import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthenticationContext';



const Navmenu: React.FC = () => {
    const navItems = [
        { text: 'Home', link: '/' },
        { text: 'adminPanel', link: '/adminPanel' }
    ]

    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated)
    
    return (
        <nav className='Navmenu'>
            {isAuthenticated ?
            navItems.map((item, index) => (
                <Link key={index} to={item.link} className='noAFormatting hoverUnderSlide'>
                    {item.text}
                </Link>
            ))            
            :
            <Link to='/login' className='noAFormatting hoverUnderSlide'>Login</Link>
            }
        </nav>
    )

        

};

export default Navmenu;