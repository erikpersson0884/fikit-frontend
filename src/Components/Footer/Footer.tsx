import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    
    return (
        <footer className='pageFooter'>
            <a href="https://www.instagram.com/fikit_chalmers" className='noAFormatting'>
                <img src="images/logos/instagram.png" width={50} alt="instagram" />
            </a>

            <p>Skriven av 
                <a href="https://github.com/erikpersson0884" className='noAFormatting hoverUnderSlide'> Göken
                </a>
            </p>

            <a href="mailto:fikit@chalmers.it" className='noAFormatting hoverUnderSlide'>fikit@chalmers.it</a>
        </footer>
    );
}

export default Footer;