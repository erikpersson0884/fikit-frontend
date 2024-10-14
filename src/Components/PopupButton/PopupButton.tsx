import React from 'react';

import './PopupButton.css';

interface PopupButtonProps {
    text: string;
    onClick: () => void;
    hide: () => void;
}

const PopupButton: React.FC<PopupButtonProps> = ({text, onClick, hide}) => {
    return (
        <div className='shadowBox' onClick={hide}>
            <div className='popupButton'>
                <h2>{text}</h2>
                <div className='buttonDiv'>
                    <button className="" onClick={hide}>Cancel</button>
                    <button className=" deleteButton" onClick={onClick}>{text}</button>
                </div>
            </div>
        </div>
    );
}

export default PopupButton;
