import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import Forgotpassword from './pages/Forgotpassword.jsx';
export const serverUrl = 'http://localhost:8000';

function App() {
  return (
    <Routes>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/forgot-password' element={<Forgotpassword />} />

    </Routes>
  )
}

export default App