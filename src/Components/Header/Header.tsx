
import React from 'react';
import Navmenu from './Navmenu/Navmenu';
import {Link} from 'react-router-dom';

import './Header.css';

interface HeaderProps {
    showLoginDiv: () => void;
}

const Header: React.FC<HeaderProps> = ({showLoginDiv}) => {
    return (
        <header className='pageHeader'>
            <Link to="/" className='headerTitle noAFormatting'>
                <img src="images/logos/fikit.png" className="logo" alt="logo" />
                <h1>FikIT</h1>
            </Link>
            <Navmenu showLoginDiv={showLoginDiv} />
        </header>
    );
};

export default Header;