import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
function Getshop() {
  const dispatch = useDispatch()
    useEffect(()=>{
        const fetchShop = async()=>{
            try{
                const result = await axios.get(serverUrl+'/api/shop/getshop',{withCredentials:true})
                dispatch(setUserData(result.data))
                
            }catch(error){
                console.log(error);
                
            }
        }
        fetchShop()
    },[])
}

export default Getshop

