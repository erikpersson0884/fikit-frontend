import React from 'react';
import './HomePageNavigation.css';
import { Link } from 'react-router-dom';

const HomePageNavigation = () => {
    const sections = [
        { title: 'Sittande', url: '/sittande' },
        { title: 'Inlägg', url: '/posts' },
        { title: 'Pateter', url: '/patetos' },
        { title: 'Gå med', url: '/join' },
        { title: 'Recept', url: '/recepies' },
        { title: 'Kontakt', url: '/contact' },
    ]
    return (
        <nav className='homePageNavigation'>
            {sections.map((section, index) => (
                <Link className="noAFormatting hoverUnderSlide" key={index} to={section.url} tabIndex={index}>
                    {section.title}
                </Link>
            ))}
        </nav>
    );
};

export default HomePageNavigation;