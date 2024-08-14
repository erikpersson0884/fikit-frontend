import React from 'react';
import './HomePageNavigation.css';

const HomePageNavigation = () => {
    const sections = [
        { title: 'Sittande', url: '#currentBoard' },
        { title: 'Inlägg', url: '#posts' },
        { title: 'Pateter', url: '#patetos' },
        { title: 'Kontakt', url: '#footer' },
    ]
    return (
        <nav className='homePageNavigation'>
            {sections.map((section, index) => (
                <a className="noAFormatting hoverUnderSlide" key={index} href={section.url} tabIndex={index}>
                    {section.title}
                </a>
            ))}
        </nav>
    );
};

export default HomePageNavigation;