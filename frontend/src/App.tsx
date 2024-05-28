import { Route, Routes } from 'react-router-dom';
import { Home } from './page/home/home';
import { Login } from './page/login/login';
import { UserRegister } from './page/register/user/user';
import { Layout } from './components/layout/outlet';
import { DisplayPayables } from './page/payables/page-Listpayables';
import { DisplayCreatePayable } from './page/payables/page-registerPayable';
import { DisplayCreateAssignors } from './page/assignors/page-registerAssignors';
import { DisplayAssignors } from './page/assignors/page-listAssignor';
import { DetailsPayables } from './page/payables/page-details';
import { AssignorsDetails } from './page/assignors/page-assignorsDetails';


function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/" element={<Layout />} >
        <Route path="/home" element={<Home />} />

        <Route path="/payable" element={<DisplayPayables />} />
        <Route path="/payable/:id" element={<DetailsPayables />} />
        <Route path="/payable/register" element={<DisplayCreatePayable />} />

        <Route path="/assignor" element={<DisplayAssignors />} />
        <Route path="/assignors/:id" element={<AssignorsDetails />} />
        <Route path="/assignor/register" element={<DisplayCreateAssignors />} />
      </Route>
      <Route path="register" element={<UserRegister />} />
    </Routes>
  );
}

export default App;
