import { Route, Routes } from 'react-router-dom'
import { Home } from './page/home/home'
import { Login } from './page/login/login'
import { UserRegister } from './page/register/user/user'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App
