import React from 'react'
import { useSelector } from 'react-redux'
import UserOrdersCard from '../components/UserOrdersCard';
import OwnerOrdersCard from '../components/OwnerOrdersCard';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";


function MyOrders() {
  const navigate = useNavigate()
  const { userData, myOrders } = useSelector(state => state.user);
  return (
    <div className='w-full min-h-screen bg-[#fff9f6] flex justify-center px-4'>
      <div className='w-full max-w-[800px] p-4'>
        <div className='flex items-center gap-[20px] mb-6' onClick={() => navigate('/')} >
          <IoIosArrowRoundBack size={40} className='text-[#ff4d2d] cursor-pointer' />
          <h1 className='text-[18px] font-bold text-start '>My Orders</h1>
        </div>
        <div className='space-y-6'>
          {myOrders?.map((order, index) => (
              userData.role == "user" ? (
                <UserOrdersCard data={order} key={index} />
              ) :
              userData.role == "owner" ? (
                <OwnerOrdersCard data={order} key={index} />
              ) : null
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default MyOrders