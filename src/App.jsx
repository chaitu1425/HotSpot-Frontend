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
import Checkout from './pages/Checkout.jsx'
import AddItems from './pages/AddItems.jsx';
import EditItem from './pages/EditItem.jsx';
import GetShopByCity from './hooks/GetShopByCity.jsx';
import GetItemsByCity from './hooks/GetItemsByCity.jsx';
import CartPage from './pages/CartPage.jsx';
import OrderPlaced from './pages/OrderPlaced.jsx';
import MyOrders from './pages/MyOrders.jsx';
import GetmyOrder from './hooks/GetmyOrder.jsx';
export const serverUrl = 'http://localhost:8000';

function App() {
  GetcurrentUser()
  GetCity()
  Getshop() 
  GetShopByCity()
  GetItemsByCity()
  GetmyOrder()
  const { userData } = useSelector(state=>state.user)
  return (
    <Routes>
      <Route path='/signup' element={!userData?<SignUp />:<Navigate to={'/'} />} />
      <Route path='/signin' element={!userData?<SignIn />:<Navigate to={'/'} />} />
      <Route path='/forgot-password' element={!userData?<Forgotpassword />:<Navigate to={'/'} />} />
      <Route path='/' element={userData?<Home />:<Navigate to={'/signin'} /> } />

      <Route path='/create-shop' element={userData?<CreateEditShop />:<Navigate to={'/signin'} /> } />
      <Route path='/add-food' element={userData?<AddItems />:<Navigate to={'/signin'} /> } />
      <Route path='/edit-food/:itemId' element={userData?<EditItem />:<Navigate to={'/signin'} /> } />

      <Route path='/cart' element={userData?<CartPage />:<Navigate to={'/signin'} />}/>
      <Route path='/checkout' element={userData?<Checkout />:<Navigate to={'/signin'} />}/>
      <Route path='/order-placed' element={userData?<OrderPlaced />:<Navigate to={'/signin'} />}/>
      <Route path='/my-orders' element={userData?<MyOrders />:<Navigate to={'/signin'} />}/>




    
    </Routes>
  )
}

export default App