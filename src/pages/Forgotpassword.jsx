import axios from 'axios';
import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { ClipLoader } from 'react-spinners';

function Forgotpassword() {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState("")
    const [otp,setOtp] = useState("")
    const [newPass,setNewPass] = useState("")
    const [confPass,setConfipass] = useState("")
    const [error,setError] = useState("")
    const [loading,setLoading]=useState(false)
    const navigate = useNavigate()



    const handleSendOTP = async()=>{
        setLoading(true)
        if(!email){
            setError("Email Required")
            setLoading(false)
            return null
        }
        try {
            const result = await axios.post(serverUrl+'/api/auth/sendotp',{email},{withCredentials:true})
            console.log(result)
            setStep(2)
            setError("")
            setLoading(false)
        } catch (error) {
            setError(error?.response?.data?.message)
            setLoading(false)
        }
    }

    const handleverifyOTP = async()=>{
        setLoading(true)
        try {
            const result = await axios.post(serverUrl+'/api/auth/verifyotp',{email,otp},{withCredentials:true})
            console.log(result)
            setStep(3)
            setError("")
            setLoading(false)
        } catch (error) {
            setError(error?.response?.data?.message)
            setLoading(false)
        }
    }

    const handleresetPassword = async()=>{
        if(newPass != confPass)return null
        if(!newPass || newPass.trim()){
            setError("Password Required")
            setLoading(false)
            return
        }
        setLoading(true)
        try {
            const result = await axios.post(serverUrl+'/api/auth/resetpass',{email,newPass},{withCredentials:true})
            console.log(result)
            setError("")
            setLoading(false)
            navigate('/signin')
        } catch (error) {
            setError(error?.response?.data?.message)
            setLoading(false)
        }
    }


    return (
        <div className='flex items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
                <div className='flex items-center gap-3 mb-4'>
                    <FaArrowLeftLong size={20} className='text-[#ff4d2d] cursor-pointer' onClick={() => navigate('/signin')} />
                    <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password</h1>
                </div>

                {step == 1 &&
                    <div>
                        <div className='mb-6'>
                            <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
                            <input type='email' className='w-full border-[1px] border-gray-200  rounded-lg px-3 py-2 focus:outline-none' placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <button className='w-full font-semibold  rounded-lg py-2  transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer' onClick={handleSendOTP} disabled={loading}>{loading?<ClipLoader size={30} color='white' /> :"Send OTP"}</button>
                        {error &&<p className='text-red-500 text-center my-[10px]'>*{error}</p>}
                    </div>
                }

                {step == 2 &&
                    <div>
                        <div className='mb-6'>
                            <label htmlFor="otp" className='block text-gray-700 font-medium mb-1'>OTP</label>
                            <input type='text' className='w-full border-[1px] border-gray-200  rounded-lg px-3 py-2 focus:outline-none   ' placeholder='Enter OTP' value={otp} onChange={(e) => setOtp(e.target.value)} required />
                        </div>
                        <button className={` w-full font-semibold  rounded-lg py-2  transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleverifyOTP} disabled={loading} >{loading?<ClipLoader size={30} color='white' />:"Verify OTP"}</button>
                        {error &&<p className='text-red-500 text-center my-[10px]'>*{error}</p>}
                    </div>
                }

                {step == 3 &&
                    <div>
                        <div className='mb-6'>
                            <label htmlFor="newPassword" className='block text-gray-700 font-medium mb-1'>New Password</label>
                            <input type='text' className='w-full border-[1px] border-gray-200  rounded-lg px-3 py-2 focus:outline-none' placeholder='Enter New Password' value={newPass} onChange={(e) => setNewPass(e.target.value)} required />
                        </div>
                        <div className='mb-6'>
                            <label htmlFor="confirmpass" className='block text-gray-700 font-medium mb-1'>Confirm Password</label>
                            <input type='password' className='w-full border-[1px] border-gray-200  rounded-lg px-3 py-2 focus:outline-none' placeholder='Confirm Password' value={confPass} onChange={(e) => setConfipass(e.target.value)} required />
                        </div>
                        <button className={` w-full font-semibold  rounded-lg py-2  transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleresetPassword} disabled={loading} >{loading?<ClipLoader size={30} color='white' />:"Reset Password"}</button>
                        {error &&<p className='text-red-500 text-center my-[10px]'>*{error}</p>}
                    </div>
                }
            </div>
        </div>
    )
}

export default Forgotpassword