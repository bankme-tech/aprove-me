import React from 'react';
import LoginForm from './components/login/loginForm';
import Payables from './components/payable/payable';

function App() {
  const handleSubmit = (username: string, password: string) => {
    console.log('Username: ', username);
    console.log('Password: ', password);
  };

  return (
    <div>
      {/* <LoginForm /> */}
      <Payables  />

    </div>
  );
}


export default App;