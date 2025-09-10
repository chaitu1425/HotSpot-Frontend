import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setShopData } from '../redux/ownerSlice'
function Getshop() {
    const dispatch = useDispatch()
    const { userData } = useSelector(state=>state.user)
    useEffect(()=>{
        const fetchShop = async()=>{
            try{
                const result = await axios.get(serverUrl+'/api/shop/getshop',{withCredentials:true})
                dispatch(setShopData(result.data))  
            }catch(error){
                console.log(error);       
            }
        }
        fetchShop()
    },[userData])
}

export default Getshop

