import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setShopsInMyCity } from '../redux/userSlice'
function GetShopByCity() {
  const dispatch = useDispatch()
  const {currentcity} = useSelector(state=>state.user)
    useEffect(()=>{
        const fetchShop = async()=>{
            try{
                const result = await axios.get(serverUrl+`/api/shop/getshop-by-city/${currentcity}`,{withCredentials:true})
                console.log(result.data)
                dispatch(setShopsInMyCity(result.data))
            }catch(error){
                console.log(error);       
            }
        }
        fetchShop()
    },[currentcity])
}

export default GetShopByCity