
import React from 'react';
import Navmenu from '../Navmenu/Navmenu';
import {Link} from 'react-router-dom';

import './Header.css';


const Header: React.FC = () => {
    return (
        <header className='pageHeader'>
            <Link to="/" className='headerTitle noAFormatting'>
                <img src="images/logos/fikit.png" className="logo" alt="logo" />
                <h1>FikIT</h1>
            </Link>
            <Navmenu />
        </header>
    );
};

export default Header;