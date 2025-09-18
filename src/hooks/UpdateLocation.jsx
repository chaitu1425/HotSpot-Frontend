import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'

function UpdateLocation() {
    const dispatch = useDispatch()
    const { userData } = useSelector(state=>state.user)
    useEffect(()=>{
        const updatelocation=async(lat,lon)=>{
            const result = await axios.post(serverUrl+'/api/user/update-location',{lon,lat},{withCredentials:true})
        }
        navigator.geolocation.watchPosition((pos)=>{
            updatelocation(pos.coords.latitude,pos.coords.longitude)
        })

    },[userData])
}

export default UpdateLocation