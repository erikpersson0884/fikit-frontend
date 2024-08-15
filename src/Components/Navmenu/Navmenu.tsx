import React from 'react';
import './Navmenu.css';

import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthenticationContext';



const Navmenu: React.FC = () => {
    const navItems = [
        { text: 'Home', link: '/' },
        { text: 'Admin Panel', link: '/adminPanel' },
        { text: 'Upload Post', link: '/uploadPost' }
    ]

    const { isAuthenticated, logout } = useAuth();
    
    return (
        <nav className='navmenu'>
            {isAuthenticated ?
            <>
                {navItems.map((item, index) => (
                    <Link key={index} to={item.link} className='noAFormatting hoverUnderSlide'>
                        {item.text}
                    </Link>
                ))}
                <button className='noButtonFormatting hoverUnderSlide' onClick={logout}>Log Out</button>
            </>
            :
            <Link to='/login' className='noAFormatting hoverUnderSlide'>Login</Link>
            }
        </nav>
    )

        

};

export default Navmenu;