import React from "react";
import './LoginDiv.css';
import axios from 'axios';

import { useAuth } from '../../AuthenticationContext';

interface LoginDivProps {
    showLoginDiv: boolean;
    setShowLoginDiv: (value: boolean) => void;
}

const LoginDiv: React.FC<LoginDivProps> = ({showLoginDiv, setShowLoginDiv}) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const { login } = useAuth();

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
            setShowLoginDiv(false);

        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <>
            {showLoginDiv && (
                <aside className="loginDivShadowBox" onClick={() => setShowLoginDiv(false)}>
                    <form className="loginForm" onClick={(e) => e.stopPropagation()} onSubmit={handleLogin}>
                        <h2>Login</h2>

                        <div>
                            <label htmlFor="loginUsername">Username:</label>
                            <input id="loginUsername" type="username" onChange={e => setUsername(e.target.value)}/>
                        </div>

                        <div>
                            <label htmlFor="loginPassword">Password:</label>
                            <input id="loginPassword" type="password" onChange={e => setPassword(e.target.value)}/>
                        </div>

                        <button type="submit">Login</button>
                    </form>
                </aside>
            )}
        </>
    );
}

export default LoginDiv;
