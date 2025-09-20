import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { setcurrentCity } from '../redux/userSlice'
import { current } from '@reduxjs/toolkit'

function DelivaryBoy() {
  const { userData } = useSelector(state => state.user)
  const [availableAssignments, setAvailableAssignments] = useState([])
  const [currentOrder, setCurrentOrder] = useState()

  const getAssignment = async () => {
    try {
      const result = await axios.get(serverUrl + '/api/order/get-assignments', { withCredentials: true })
      setAvailableAssignments(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const acceptOrder = async (assignmentId) => {
    try {
      const result = await axios.get(serverUrl + `/api/order/accept-order/${assignmentId}`, { withCredentials: true })
      console.log(result.data)
      await getCurrentOrder()
    } catch (error) {
      console.log(error)
    }
  }

  const getCurrentOrder = async () => {
    try {
      const result = await axios.get(serverUrl + `/api/order/get-current-order`, { withCredentials: true })
      setCurrentOrder(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAssignment()
    getCurrentOrder()
  }, [userData])

  return (
    <div className='w-screen min-h-screen bg-[#fff9f6] flex flex-col gap-5 items-center overflow-y-auto'>
      <Nav />
      <div className='w-full max-w-[800px] flex flex-col gap-5 items-center '>
        <div className='bg-white rounded-2xl shadow-md p-5 flex flex-col gap-3 justify-between items-center w-[90%] border-orange-100 text-center' >
          <h1 className='text-xl font-bold text-[#ff4d2d]'>Welcome, {userData.fullname}</h1>
          <p className='text-[#ff4d2d]'><span className='font-semibold'>Latitude:</span> {userData.location.coordinates[1]}, <span className='font-semibold'>Longitude:</span> {userData.location.coordinates[0]}</p>
        </div>

        {!currentOrder &&
          <div className='bg-white rounded-2xl p-5 shadow-md w-[90%] border border-orange-100'>
            <h1 className='text-lg font-bold mb-4 flex items-center gap-2 '>Available Orders</h1>

            <div className='space-y-4'>
              {availableAssignments.length > 0 ? (
                availableAssignments.map((a, index) => (
                  <div className='border rounded-lg p-4 flex justify-between items-center ' key={index}>
                    <div>
                      <p className='text-sm font-semibold'>{a.shopName}</p>
                      <p className='text-sm text-gray-500'><span className='font-semibold'>Delivery Address:</span>{a.deliveryAddress.text}</p>
                      <p className='text-xs text-gray-400'>{a.items.length} items | ₹{a.subtotal}</p>
                    </div>
                    <button className='bg-orange-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-orange-600' onClick={() => acceptOrder(a.assignmentId)}>Accept</button>

                  </div>
                ))
              ) : <p className='text-sm text-gray-400'>No Available Orders</p>}
            </div>
          </div>}
        
        {currentOrder && 
          <div className='bg-white rounded-2xl p-5 shadow-md w-[90%] border border-orange-100'>
            <h2 className='text-lg font-boldmb-3'>📦Current Order</h2>
            <div className='border rounded-lg p-4 mb-3'>
              <p className='font-semibold text-sm'>{currentOrder.shopOrder.shop.name}</p>
              <p className='text-sm text-gray-500'>{currentOrder.deliveryAddress.text}</p>
              <p className='text-sm text-gray-400'>{currentOrder.shopOrder.shopOrderItems.length} items | ₹{currentOrder.shopOrder.subtotal}</p>
            </div>
          </div>
        }

      </div>

    </div>
  )
}

export default DelivaryBoy