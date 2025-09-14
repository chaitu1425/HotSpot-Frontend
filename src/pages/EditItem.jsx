import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaUtensils } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { serverUrl } from '../App';
import { setShopData } from '../redux/ownerSlice';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

function EditItem() {
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const { itemId } = useParams()
    const [currentItem,setCurrentItem] = useState(null)
    const { ShopData } = useSelector(state=>state.owner)
    const [name,SetName] = useState("")
    const [price,SetPrice] = useState("")
    const [category,setCategory] = useState("")
    const [foodType,setFoodType] = useState("")
    const [loading,setLoading] = useState(false)
    const categories = [
            "Snacks",
            "Main Course",
            "Desserts",
            "Pizza",
            "Burger",
            "Sandwiches",
            "South Indian",
            "North Indian",
            "Chinese",
            "Fast Food",
            "Others"
        ]

    const [frontendImg,setFrontendimg] = useState(currentItem?.image || null)
    const [backendImg,setBackendImg] = useState(null)

    const handleimg = (e)=>{
        const file = e.target.files[0]
        setBackendImg(file)
        setFrontendimg(URL.createObjectURL(file))
    }
    const handlesubmit = async(e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("name",name)
            formData.append("category",category)
            formData.append("foodType",foodType)
            formData.append("price",price)

            if(backendImg){
                formData.append("image",backendImg)
            }
            const result = await axios.post(serverUrl+`/api/item/edit-item/${itemId}`,formData,{withCredentials:true})
            dispatch(setShopData(result.data))
            setLoading(false)
            navigate("/")
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    
    useEffect(()=>{
        const handleItemByid = async()=>{
            try {
                const result = await axios.get(serverUrl+`/api/item/get-item/${itemId}`,{withCredentials:true})
                setCurrentItem(result.data)
            } catch (error) {
                console.log(error)
            }
        }
        handleItemByid()
    },[itemId])
    useEffect(()=>{
        SetName(currentItem?.name || "")
        SetPrice(currentItem?.price || "")
        setCategory(currentItem?.category || "")
        setFoodType(currentItem?.foodType || "")
        setFrontendimg(currentItem?.image || "")
    },[currentItem])
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
                            Edit Food
                        </div>
                    </div>
                    <form className='space-y-5' onSubmit={handlesubmit}>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                            <input type="text" placeholder='Enter Food Name' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' value={name} onChange={(e)=>SetName(e.target.value)} />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Food Image</label>
                            <input type="file" accept='image/*' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' onChange={handleimg} />
                            {frontendImg && <div className='mt-4'>
                                <img src={frontendImg} className='w-full h-48 object-cover rounded-lg border' alt="" />
                            </div>}
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Price</label>
                            <input type="number" placeholder='0' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' value={price} onChange={(e)=>SetPrice(e.target.value)} />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Select Category</label>
                            <select  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' value={category} onChange={(e)=>setCategory(e.target.value)} >
                                <option value="">Select Category</option>
                                {categories.map((cate,index)=>(
                                    <option key={index} value={cate}>{cate}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Type</label>
                            <select  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' value={foodType} onChange={(e)=>setFoodType(e.target.value)} >
                                    <option value="Veg">Veg</option>
                                    <option value="Non-Veg">Non-Veg</option>
                            </select>
                        </div>

                        <button className='w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 cursor-pointer' disabled={loading}>{loading?<ClipLoader size={20} color='white' />:"Update"}</button>
                    </form>
                </div>
            </div>
  )
}

export default EditItem