
import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddAssignor from './pages/assignor/assignor';
import AddPayable from './pages/payable/payable';
import PayableList from './pages/payableList/payableList';
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