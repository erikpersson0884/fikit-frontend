import React from 'react';
import './Fontpage.css';


const Fontpage: React.FC = () => {
    return (
        <div className='frontpage'>
            <h1>
                Välkommen till FikIT 
                <br/> 
                IT-sektionens bästa fika förening!
            </h1>

            <img src="images/frontpage.jpg" alt="FikIT" /> 
        </div>
    );
};

export default Fontpage;