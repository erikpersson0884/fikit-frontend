import React from "react";
import './LoginDiv.css';

import { useAuth } from '../../AuthenticationContext';
import { useNavigate, NavigateFunction } from 'react-router-dom'; // Import NavigateFunction

const LoginDiv: React.FC = () => {
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const { login } = useAuth();
    const navigate: NavigateFunction = useNavigate(); // Change the type of history to NavigateFunction





    function handleLogin(event: React.FormEvent) {
        event.preventDefault(); 

        fetch('auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    username,
                    password
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("here")
            localStorage.setItem('token', data.adminKey);
            login(true);
            navigate('/');
        })
    }


    return (
        <aside className="loignDiv">
            <h2>Login</h2>
            <form onSubmit={handleLogin}> {/* Use onSubmit instead of onClick */}
                <div>
                    <label htmlFor="loginUsername">Username:</label>
                    <input 
                        id="loginUsername" 
                        type="username" 
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="loginPassword">Password:</label>
                    <input 
                        id="loginPassword" 
                        type="password" 
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </aside>
    );
}

export default LoginDiv;