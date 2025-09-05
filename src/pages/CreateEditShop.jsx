import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaUtensils } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { setShopData } from '../redux/ownerSlice';
import axios from 'axios';

function CreateEditShop() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { shopData } = useSelector(state=>state.owner)
    const { currentcity,currentstate,currentaddress } = useSelector(state=>state.user)
    const [name,SetName] = useState(shopData?.name || "")
    const [address,setAddress] = useState(shopData?.address || currentaddress)
    const [city,setCity] = useState(shopData?.city || currentcity)
    const [state,setState] = useState(shopData?.state || currentstate)
    const [frontendImg,setFrontendimg] = useState(shopData?.image || "")
    const [backendImg,setBackendImg] = useState(null)

    const handleimg = (e)=>{
        const file = e.target.files[0]
        setBackendImg(file)
        setFrontendimg(URL.createObjectURL(file))
    }
    const handlesubmit = async(e)=>{
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("name",name)
            formData.append("city",city)
            formData.append("address",address)
            formData.append("state",state)
            if(backendImg){
                formData.append("image",backendImg)
            }
            const result = await axios.post(serverUrl+'/api/shop/create-edit',formData,{withCredentials:true})
            dispatch(setShopData(result.data))
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen'>
            <div className='absolute top-[20px] left-[20px] z-[10] mb-[10px] '>
                <IoIosArrowRoundBack size={40} className='text-[#ff4d2d] cursor-pointer' onClick={() => navigate('/')} />
            </div>
            <div className='max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100'>
                <div className='flex flex-col items-center mb-6'>
                    <div className='bg-orange-100 p-4 rounded-full mb-4'>
                        <FaUtensils className='text-[#ff4d2d] w-16 h-16' />
                    </div>
                    <div className='text-3xl font-bold text-gray-900'>
                        {shopData ? "Edit Shop" : "Add Shop"}
                    </div>
                </div>
                <form className='space-y-5' onSubmit={handlesubmit}>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                        <input type="text" placeholder='Enter Shop Name' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' value={name} onChange={(e)=>SetName(e.target.value)} />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Shop Image</label>
                        <input type="file" accept='image/*' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' onChange={handleimg} />
                        {frontendImg && <div className='mt-4'>
                            <img src={frontendImg} className='w-full h-48 object-cover rounded-lg border' alt="" />
                        </div>}
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Address</label>
                        <input type="text" placeholder='Enter Shop Address' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' value={address} onChange={(e)=>setAddress(e.target.value)} />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>City</label>
                            <input type="text" placeholder='City' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' value={city} onChange={(e)=>setCity(e.target.value)} />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>State</label>
                            <input type="text" placeholder='State' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' value={state} onChange={(e)=>setState(e.target.value)} />
                        </div>
                    </div>
                    <button className='w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 cursor-pointer'>Save</button>
                </form>
            </div>
        </div>
    )
}

export default CreateEditShop