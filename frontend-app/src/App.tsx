import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import CreatePayable from './pages/CreatePayable';

function App() {
  return (
    <Routes>
      <Route path='/integrations/payable' element={ <CreatePayable /> } />
    </Routes>
  )
}

export default App;
