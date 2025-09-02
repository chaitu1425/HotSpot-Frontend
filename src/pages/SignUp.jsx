import axios from 'axios';
import React, { useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebase.js';
import { ClipLoader } from "react-spinners"
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userslice.js';

function SignUp() {
  const primarycolor = "#ff4d2d"
  // const hovercolor = '#e64323'
  const bgcolor = '#fff9f6'
  const borderColor = '#ddd'

  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState("user")
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mobile, setMobile] = useState("")
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)
  const dispatch = useDispatch()


  const handlesignup = async()=>{
    setLoading(true)
    try {
      const result = await axios.post(serverUrl+'/api/auth/signup',{fullname,email,mobile,password,role},{withCredentials:true})
      dispatch(setUserData(result.data))
      setError("")
      setLoading(false)
    } catch (error) {
      setError(error?.response?.data?.message)
      setLoading(false)
    }
  }

  const handleAuth = async()=>{
    try {
      if(!mobile){
        return setError("Mobile number is required")
      }
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth,provider)

      const {data} = await axios.post(serverUrl+'/api/auth/google-auth',{
        fullname:result.user.displayName,
        email:result.user.email,
        role,
        mobile
      },{withCredentials:true})
      dispatch(setUserData(data))

    } catch (error) {
      console.log(error)

    }
  }


  const navigate = useNavigate()

  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgcolor }}>
      <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px] `} style={{ border: `1px solid ${borderColor}` }} >
        <h1 className={`text-3xl font-bold mb-2`} style={{ color: primarycolor }}>HotSpot</h1>
        <p className='text-gray-600 mb-8'>Create your account to get started with delicious food deliveries</p>

        {/* Full Name */}
        <div className='mb-4'>
          <label htmlFor="fullname" className='block text-gray-700 font-medium mb-1'>Full Name</label>
          <input type='text' className='w-full border rounded-lg px-3 py-2 focus:border-orange-500 ' placeholder='Enter Your Full Name' style={{ border: `1px solid ${borderColor}` }} value={fullname} onChange={(e)=>setFullname(e.target.value)} required />
        </div>
        {/* Email */}
        <div className='mb-4'>
          <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
          <input type='email' className='w-full border rounded-lg px-3 py-2 focus:border-orange-500 ' placeholder='Enter Your Email' style={{ border: `1px solid ${borderColor}` }} value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        </div>
        {/* Mobile */}
        <div className='mb-4'>
          <label htmlFor="mobile" className='block text-gray-700 font-medium mb-1'>Mobile</label>
          <input type='email' className='w-full border rounded-lg px-3 py-2 focus:border-orange-500 ' placeholder='Enter Your Mobile Number' style={{ border: `1px solid ${borderColor}`}} value={mobile} onChange={(e)=>setMobile(e.target.value)} required/>
        </div>
        {/* password */}
        <div className='mb-4'>
          <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
          <div className='relative'>
            <input type={`${showPassword ? "text" : "password"}`} className='w-full border rounded-lg px-3 py-2 focus:border-orange-500 ' placeholder='Enter Your Password' style={{ border: `1px solid ${borderColor}` }} value={password} onChange={(e)=>setPassword(e.target.value)} required />
            <button className='absolute right-3 cursor-pointer top-[14px] text-gray-500' onClick={() => setShowPassword(prev => !prev)}>{!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
          </div>
        </div>
        {/* role */}
        <div className='mb-4'>
          <label htmlFor="role" className='block text-gray-700 font-medium mb-1'>Role</label>
          <div className='flex gap-2'>
            {
              ["user", "owner", "deliveryboy"].map((r,index) => (
                <button key={index} className="flex-1 border rounded-lg px-3 py-2 cursor-pointer text-center font-medium transition-colors" onClick={() => setRole(r)} style={role === r ? { backgroundColor: primarycolor, color: 'white' } : { border: `1px solid ${primarycolor}`, color: `${primarycolor}` }}>{r}</button>
              ))
            }
          </div>
        </div>


      <button className={` w-full font-semibold  rounded-lg py-2  transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} disabled={loading} onClick={handlesignup}>{loading?<ClipLoader size={30} color='white' />:"Sign Up"}</button>
        {error &&<p className='text-red-500 text-center my-[10px]'>*{error}</p>}

        <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 cursor-pointer transition duration-200 border-gray-400 hover:bg-gray-100' onClick={handleAuth}>
          <FcGoogle size={20} />
          <span>Sign up with Google</span>
        </button>
        <p className='text-center mt-6 cursor-pointer'>Already have an account?<span className='text-[#ff4d2d]' onClick={() => navigate('/signin')}>Sign In</span></p>



      </div>

    </div>
  )
}

export default SignUp