import './App.css';
import { Route, Routes } from 'react-router-dom';
import CreatePayable from './pages/CreatePayable';
import CreateAssignor from './pages/CreateAssignor';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path='/integrations/payable' element={ <CreatePayable /> } />
      <Route path='/integrations/assignor' element={ <CreateAssignor /> } />
      <Route path='/integrations/auth' element={ <Login /> } />
    </Routes>
  )
}

export default App;
