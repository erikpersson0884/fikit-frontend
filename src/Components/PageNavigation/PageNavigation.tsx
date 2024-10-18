import './PageNavigation.css';
import { Link, useLocation } from 'react-router-dom';

const HomePageNavigation = () => {
    const sections = [
        { title: 'Sittande', url: '/sittande' },
        { title: 'Pateter', url: '/patetos' },
        { title: 'Gå med', url: '/join' },
        { title: 'Recept', url: '/recipes' },
        { title: 'Kontakt', url: '/contact' },
    ]

    const location = useLocation();

    return (
        <nav className='homePageNavigation'>
            {sections.map((section, index) => (
                <Link 
                    className={`noAFormatting hoverUnderSlide ${location.pathname === section.url ? 'currentPage' : ''}`}
                    key={index} 
                    to={section.url} 
                    tabIndex={index}
                >
                    {section.title}
                </Link>
            ))}
        </nav>
    );
};

export default HomePageNavigation;