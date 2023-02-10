import React, { useState } from 'react';
import './LoginForm.css';

interface Props {
}

const LoginForm: React.FC<Props> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="container">
      <h1 className="title">Login</h1>
      <input
        className="input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="buttonContainer">
        <span className="buttonText">LOGIN</span>
      </button>
    </div>
  );
};

export default LoginForm;
