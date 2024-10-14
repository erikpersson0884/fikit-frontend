import React from 'react';
import './Navmenu.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../AuthenticationContext';

interface NavMenuProps {
    showLoginDiv: () => void;
}
const Navmenu: React.FC<NavMenuProps> = ({showLoginDiv}) => {
    const navItems = [
        { text: 'Manage People', link: '/managePeople' },
        { text: 'Manage Recipes', link: '/manageRecipes' },
    ];

    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className='navmenu'>
            {isAuthenticated ? (
                <>
                    {navItems.map((item, index) => (
                        <Link key={index} to={item.link} className='noAFormatting hoverUnderSlide'>
                            {item.text}
                        </Link>
                    ))}
                    <button className='noButtonFormatting hoverUnderSlide' onClick={logout}>Log Out</button>
                </>
            ) : (
                <button className='noButtonFormatting hoverUnderSlide' onClick={showLoginDiv}>Log In</button>
            )}
        </nav>
    );
};

export default Navmenu;
