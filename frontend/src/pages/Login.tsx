import React from 'react';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface LoginProps {
  onLogin: (credentials: { username: string; password: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div>
      <Header />
      <LoginForm onLogin={onLogin} />
      <Footer />
    </div>
  );
};

export default Login;
