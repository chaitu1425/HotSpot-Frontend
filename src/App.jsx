import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import Forgotpassword from './pages/Forgotpassword.jsx';
import GetcurrentUser from './hooks/GetcurrentUser.jsx';
import { useDispatch, useSelector } from 'react-redux';
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
import UpdateLocation from './hooks/UpdateLocation.jsx';
import TrackOrderPage from './pages/TrackOrderPage.jsx';
import Shop from './pages/Shop.jsx';
import { io } from 'socket.io-client';
import { setSocket } from './redux/userSlice.js';
export const serverUrl = 'https://hotspot-backend-cbw5.onrender.com';
function App() {

  const dispatch = useDispatch()
  const { userData } = useSelector(state=>state.user)
  GetcurrentUser()
  UpdateLocation()
  GetCity()
  Getshop() 
  GetShopByCity()
  GetItemsByCity()
  GetmyOrder()
  
  useEffect(()=>{
    const socketinstance = io(serverUrl,{withCredentials:true})
    dispatch(setSocket(socketinstance))
    socketinstance.on('connect',()=>{
      if(userData){
        socketinstance.emit('identity',{userId:userData._id})
      }
    })
    return ()=>{
      socketinstance.disconnect()
    }
  },[userData?._id])

  
  return (
    <Routes>
        
      <Route path='/signin' element={!userData?<SignIn />:<Navigate to={'/'} />} />
      <Route path='/signup' element={!userData?<SignUp />:<Navigate to={'/'} />} />
      <Route path='/forgot-password' element={!userData?<Forgotpassword />:<Navigate to={'/'} />} />
      <Route path='/' element={userData?<Home />:<Navigate to={'/signin'} /> } />

      <Route path='/create-shop' element={userData?<CreateEditShop />:<Navigate to={'/signin'} /> } />
      <Route path='/add-food' element={userData?<AddItems />:<Navigate to={'/signin'} /> } />
      <Route path='/edit-food/:itemId' element={userData?<EditItem />:<Navigate to={'/signin'} /> } />

      <Route path='/cart' element={userData?<CartPage />:<Navigate to={'/signin'} />}/>
      <Route path='/checkout' element={userData?<Checkout />:<Navigate to={'/signin'} />}/>
      <Route path='/order-placed' element={userData?<OrderPlaced />:<Navigate to={'/signin'} />}/>
      <Route path='/my-orders' element={userData?<MyOrders />:<Navigate to={'/signin'} />}/>
      <Route path='/track-order/:orderId' element={userData?<TrackOrderPage />:<Navigate to={'/signin'} />}/>
      <Route path='/shop/:shopId' element={userData?<Shop />:<Navigate to={'/signin'} />}/>


    </Routes>
  )
}

export default App