// Login.js

import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [chatId, setChatId] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login clicked with Chat ID:', chatId);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className='loginHeading'>Login</h2>
        <p className='loginPara'>Enter your Chat ID to log in:</p>
        <div className="loginForm">
          <form onSubmit={handleLogin}>
            <div className="input-container">
              <input
                type="text"
                placeholder="Chat ID"
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={!chatId.trim()}>Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
