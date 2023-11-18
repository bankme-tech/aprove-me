import React from 'react';
import { BrowserRouter , Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';


const App: React.FC = () => {
  const handleLogin = (credentials: { username: string; password: string }) => {
    console.log('Login:', credentials);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route  path="/login" element={<Login onLogin={handleLogin}/>} />
        <Route path="/create" element={<div>create</div>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
