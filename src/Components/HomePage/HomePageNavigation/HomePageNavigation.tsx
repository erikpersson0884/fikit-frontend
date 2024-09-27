import './HomePageNavigation.css';
import { Link } from 'react-router-dom';

const HomePageNavigation = () => {
    const sections = [
        { title: 'Sittande', url: '/sittande' },
        { title: 'Pateter', url: '/patetos' },
        { title: 'Gå med', url: '/join' },
        { title: 'Recept', url: '/recipes' },
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