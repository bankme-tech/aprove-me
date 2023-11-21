import React from 'react';
import { BrowserRouter , Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import CreatePayable from './pages/CreatePayables';
import CreateAssignor from './pages/CreateAssignor';
import GetPayables from './pages/GetPayables';


const App: React.FC = () => {
  const handleLogin = (credentials: { username: string; password: string }) => {
    console.log('Login:', credentials);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route  path="/login" element={<Login onLogin={handleLogin}/>} />
        <Route path="payable/create" element={<CreatePayable />}/>
        <Route path="payable/list" element={<GetPayables/>} />
        <Route path="assignor/create" element={<CreateAssignor />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
