import LoginForm from './components/login/loginForm';
import AddPayable from './components/payable/payable';
import PayableList from './components/payableList/payableList';
import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddAssignor from './components/assignor/assignor';
const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<AddPayable />} />
          <Route path="List" element={<PayableList />} />
          <Route path="AddAssignor" element={<AddAssignor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;