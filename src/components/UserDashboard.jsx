import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav';
import { categories } from '../category';
import CategoryCard from './CategoryCard';
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";

function UserDashboard() {
    const cateScrollRef = useRef()

    const [showleftButton,setleftButton] = useState(false)
    const [showrightButton,setrightButton] = useState(false)

    const updateButton = (ref,setleftButton,setrightButton)=>{
        const ele = ref.current
        if(ele){
            setleftButton(ele.scrollLeft>0)
            setrightButton(ele.scrollLeft<ele.scrollWidth-ele.clientWidth)
        }
    }

    
    const scrollHandler = (ref,direction)=>{
        if(ref.current){
            ref.current.scrollBy({
                left:direction == "left"?-200:200,
                behavior:"smooth"
            })
        }        
    }
    
    useEffect(()=>{
        if(cateScrollRef.current){
            cateScrollRef.current.addEventListener('scroll',()=>{updateButton(cateScrollRef,setleftButton,setrightButton)})
        }
    },[])
    
    return (
        <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto'>
            <Nav />
            <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
                <h1 className='text-gray-800 text-2xl sm:text-3xl'>Inspiration for your first order</h1>
                <div className='w-full relative '>
                    {showleftButton && 
                    <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[
                    #e64528] z-10' onClick={()=>scrollHandler(cateScrollRef,"left")} >
                        <FaCircleChevronLeft  />
                    </button>
                    }
                    <div className='w-full flex overflow-x-auto gap-4 pb-2' ref={cateScrollRef}>
                        {
                        categories.map((item, index) => (
                            <CategoryCard key={index} data={item} />
                        ))}
                    </div>
                    {showrightButton && <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[
                    #e64528] z-10' onClick={()=>scrollHandler(cateScrollRef,"right")} >
                        <FaCircleChevronRight />
                    </button>}
                </div>

            </div>
        </div>

    )
}

export default UserDashboard