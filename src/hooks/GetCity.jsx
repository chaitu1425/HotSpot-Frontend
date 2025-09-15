import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAddress, setcurrentCity, setCurrentState } from '../redux/userSlice'
import { setAddress, setLocation } from '../redux/mapSlice'
function GetCity() {
    const dispatch = useDispatch()
    const { userData } = useSelector(state=>state.user)
    const apikey = import.meta.env.VITE_GEOLOCATION_API;
    useEffect(()=>{
            navigator.geolocation.getCurrentPosition(async (position)=>{
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            dispatch(setLocation({lat:latitude,lon:longitude}))
            const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`)
            dispatch(setcurrentCity(result?.data.results[0].city))
            dispatch(setCurrentState(result?.data.results[0].state))
            dispatch(setCurrentAddress(result?.data.results[0].formatted))
            dispatch(setAddress(result.data.results[0].formatted))
        })

    },[userData])
}

export default GetCity