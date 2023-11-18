import React, { useState } from 'react';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onLogin: (credentials: { username: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ username, password });

    navigate('/create');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='login'>
        <label>
          <div className='username-input'>
            <h2>Username:</h2>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
        </label>
        <br />
        <label>
          <div className='password-input'>
            <h2>Password:</h2>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </label>
        <br />
        <br />
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
