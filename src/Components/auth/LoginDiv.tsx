import React from "react";
import './LoginDiv.css';
import axios from 'axios';

import { useAuth } from '../../AuthenticationContext';
import { useNavigate, NavigateFunction } from 'react-router-dom'; // Import NavigateFunction

const LoginDiv: React.FC = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const { login } = useAuth();
    const navigate: NavigateFunction = useNavigate(); // Change the type of history to NavigateFunction


    function handleLogin(event: React.FormEvent) {
        event.preventDefault(); 

        axios.post(`${API_BASE_URL}/api/auth/login`, {
            username: username,
            password: password,
        })
        .then(response => {
            return response.data;
        })
        .then(data => {
            login(data.adminKey);
            navigate('/');
        })
        .catch(error => {
            console.error(error);
        });
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