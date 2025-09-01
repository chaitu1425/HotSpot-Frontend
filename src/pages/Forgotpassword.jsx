import axios from 'axios';
import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';

function Forgotpassword() {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState("")
    const [otp,setOtp] = useState("")
    const [newPass,setNewPass] = useState("")
    const [confPass,setConfipass] = useState("")
    const navigate = useNavigate()


    const handleSendOTP = async()=>{
        try {
            const result = await axios.post(serverUrl+'/api/auth/sendotp',{email},{withCredentials:true})
            console.log(result)
            setStep(2)
        } catch (error) {
            console.log(error)
        }
    }

    const handleverifyOTP = async()=>{
        try {
            const result = await axios.post(serverUrl+'/api/auth/verifyotp',{email,otp},{withCredentials:true})
            console.log(result)
            setStep(3)
        } catch (error) {
            console.log(error)
        }
    }

    const handleresetPassword = async()=>{
        try {
            if(newPass != confPass)return null
            const result = await axios.post(serverUrl+'/api/auth/resetpass',{email,newPass},{withCredentials:true})
            console.log(result)
            navigate('/signin')
        } catch (error) {
            console.log(error)
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
                            <input type='email' className='w-full border-[1px] border-gray-200  rounded-lg px-3 py-2 focus:outline-none' placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <button className='w-full font-semibold  rounded-lg py-2  transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer' onClick={handleSendOTP}>Send OTP</button>
                    </div>
                }

                {step == 2 &&
                    <div>
                        <div className='mb-6'>
                            <label htmlFor="otp" className='block text-gray-700 font-medium mb-1'>OTP</label>
                            <input type='text' className='w-full border-[1px] border-gray-200  rounded-lg px-3 py-2 focus:outline-none   ' placeholder='Enter OTP' value={otp} onChange={(e) => setOtp(e.target.value)} />
                        </div>
                        <button className={` w-full font-semibold  rounded-lg py-2  transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleverifyOTP} >Verify OTP</button>
                    </div>
                }

                {step == 3 &&
                    <div>
                        <div className='mb-6'>
                            <label htmlFor="newPassword" className='block text-gray-700 font-medium mb-1'>New Password</label>
                            <input type='text' className='w-full border-[1px] border-gray-200  rounded-lg px-3 py-2 focus:outline-none' placeholder='Enter New Password' value={newPass} onChange={(e) => setNewPass(e.target.value)} />
                        </div>
                        <div className='mb-6'>
                            <label htmlFor="confirmpass" className='block text-gray-700 font-medium mb-1'>Confirm Password</label>
                            <input type='password' className='w-full border-[1px] border-gray-200  rounded-lg px-3 py-2 focus:outline-none' placeholder='Confirm Password' value={confPass} onChange={(e) => setConfipass(e.target.value)} />
                        </div>
                        <button className={` w-full font-semibold  rounded-lg py-2  transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleresetPassword}>Reset Password</button>
                    </div>
                }




            </div>
        </div>
    )
}

export default Forgotpassword