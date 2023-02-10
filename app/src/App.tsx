import LoginForm from './components/login/loginForm';
import Payables from './components/payable/payable';
import PayableList from './components/payableList/payableList';
import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Payables />} />
          <Route path="List" element={<PayableList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;