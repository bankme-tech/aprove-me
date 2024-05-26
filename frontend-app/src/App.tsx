import './App.css';
import { Route, Routes } from 'react-router-dom';
import { CreatePayable, PayableDetails } from './pages/payable';
import CreateAssignor from './pages/assignor/CreateAssignor';
import Login from './pages/auth/Login';

function App() {
  return (
    <Routes>
      <Route path='/integrations/payable' element={ <CreatePayable /> } />
      <Route path='/integrations/payable/:id' element={ <PayableDetails /> } />
      <Route path='/integrations/assignor' element={ <CreateAssignor /> } />
      <Route path='/integrations/auth' element={ <Login /> } />
    </Routes>
  )
}

export default App;
