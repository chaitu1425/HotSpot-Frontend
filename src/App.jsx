import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import Forgotpassword from './pages/Forgotpassword.jsx';
import GetcurrentUser from './hooks/GetcurrentUser.jsx';
import { useSelector } from 'react-redux';
import Home from './pages/Home.jsx';
import GetCity from './hooks/GetCity.jsx';
import Getshop from './hooks/Getshop.jsx';
import CreateEditShop from './pages/CreateEditShop.jsx';
import AddItems from './pages/AddItems.jsx';
export const serverUrl = 'http://localhost:8000';

function App() {
  GetcurrentUser()
  GetCity()
  Getshop() 
  const { userData } = useSelector(state=>state.user)
  return (
    <Routes>
      <Route path='/signup' element={!userData?<SignUp />:<Navigate to={'/'} />} />
      <Route path='/signin' element={!userData?<SignIn />:<Navigate to={'/'} />} />
      <Route path='/forgot-password' element={!userData?<Forgotpassword />:<Navigate to={'/'} />} />
      <Route path='/' element={userData?<Home />:<Navigate to={'/signin'} /> } />

      <Route path='/create-shop' element={userData?<CreateEditShop />:<Navigate to={'/signin'} /> } />
      <Route path='/add-food' element={userData?<AddItems />:<Navigate to={'/signin'} /> } />


    </Routes>
  )
}

export default App