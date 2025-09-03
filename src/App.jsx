import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import Forgotpassword from './pages/Forgotpassword.jsx';
import GetcurrentUser from './hooks/GetcurrentUser.jsx';
import { useSelector } from 'react-redux';
import Home from './pages/Home.jsx';
import GetCity from './hooks/GetCity.jsx';
export const serverUrl = 'http://localhost:8000';

function App() {
  GetcurrentUser()
  GetCity()
  const { userData } = useSelector(state=>state.user)
  return (
    <Routes>
      <Route path='/signup' element={!userData?<SignUp />:<Navigate to={'/'} />} />
      <Route path='/signin' element={!userData?<SignIn />:<Navigate to={'/'} />} />
      <Route path='/forgot-password' element={!userData?<Forgotpassword />:<Navigate to={'/'} />} />
      <Route path='/' element={userData?<Home />:<Navigate to={'/signin'} /> } />
    </Routes>
  )
}

export default App