import './App.css';
import { Route, Routes } from 'react-router-dom';
import { CreatePayable, PayableDetails, ListPayables } from './pages/payable';
import { CreateAssignor, AssignorDetails } from './pages/assignor';
import Login from './pages/auth/Login';

function App() {
  return (
    <Routes>
      <Route path='/integrations/auth' element={ <Login /> } />
      <Route path='/integrations/payable' element={ <CreatePayable /> } />
      <Route path='/integrations/payable/all' element={ <ListPayables /> } />
      <Route path='/integrations/payable/:id' element={ <PayableDetails /> } />
      <Route path='/integrations/assignor' element={ <CreateAssignor /> } />
      <Route path='/integrations/assignor/:id' element={ <AssignorDetails /> } />
    </Routes>
  )
}

export default App;
