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

    navigate('/payable/create');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='login'>
        <label>
          <div className='username-input'>
            <h3>Username:</h3>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
        </label>
        <br />
        <label>
          <div className='password-input'>
            <h3>Password:</h3>
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
