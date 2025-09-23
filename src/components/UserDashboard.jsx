import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav';
import { categories } from '../category';
import CategoryCard from './CategoryCard';
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import FoodCard from './FoodCard';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
    const navigate = useNavigate()
    const cateScrollRef = useRef()
    const shopScrollRef = useRef()
    const { currentcity, shopsInMyCity, itemsInMyCity,searchItems } = useSelector(state => state.user)
    const [updateItemsList,setUpdateItemsList] = useState(itemsInMyCity)

    // scategory scroll
    const [showleftButton, setleftButton] = useState(false)
    const [showrightButton, setrightButton] = useState(false)
    ///shop scroll
    const [showleftShopButton, setleftShopButton] = useState(false)
    const [showrightShopButton, setrightShopButton] = useState(false)

    const handlefilterbyCategory = (category)=>{
        if(category=="All"){
            setUpdateItemsList(itemsInMyCity)
        }else{
            const filteredList = itemsInMyCity.filter(i=>i.category===category)
            setUpdateItemsList(filteredList)
        }
    }

    const updateButton = (ref, setleftButton, setrightButton) => {
        const ele = ref.current
        if (ele) {
            setleftButton(ele.scrollLeft > 0)
            setrightButton(ele.scrollLeft < ele.scrollWidth - ele.clientWidth)
        }
    }

    const scrollHandler = (ref, direction) => {
        if (ref.current) {
            ref.current.scrollBy({
                left: direction == "left" ? -200 : 200,
                behavior: "smooth"
            })
        }
    }

    useEffect(()=>{
        setUpdateItemsList(itemsInMyCity)
    },[itemsInMyCity])

    useEffect(() => {
        if (cateScrollRef.current) {
            updateButton(cateScrollRef, setleftButton, setrightButton)
            updateButton(shopScrollRef, setleftShopButton, setrightShopButton)
            cateScrollRef.current.addEventListener('scroll', () => {
                updateButton(cateScrollRef, setleftButton, setrightButton)
            })
            shopScrollRef.current.addEventListener('scroll', () => {
                updateButton(shopScrollRef, setleftShopButton, setrightShopButton)
            })
        }
    }, [categories])



    return (
        <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto'>
            <Nav />
            {searchItems && searchItems.length>0 && (
                <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-5 bg-white shadow-md rounded-2xl mt-4'> 
                    <h1 className='text-gray-900 text-2xl sm:text-3xl font-semibold border-b border-gray-200 pb-2'>Search Results</h1>
                    <div className='w-full h-auto flex flex-wrap gap-6 justify-center'>
                        {searchItems.map((item)=>(
                            <FoodCard data={item} key={item._id} />
                        ))}
                    </div>
                </div>
            )
            }

            <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
                <h1 className='text-gray-800 text-2xl sm:text-3xl'>Inspiration for your first order</h1>
                <div className='w-full relative'>
                    {showleftButton &&
                        <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[
                    #e64528] z-10' onClick={() => scrollHandler(cateScrollRef, "left")} >
                            <FaCircleChevronLeft />
                        </button>
                    }
                    <div className='w-full flex overflow-x-auto gap-4 pb-2' ref={cateScrollRef}>
                        {
                            categories.map((item, index) => (
                                <CategoryCard key={index} name={item.category} image={item.image} onClick={()=>handlefilterbyCategory(item.category)} />
                            ))}
                    </div>
                    {showrightButton && <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[
                    #e64528] z-10' onClick={() => scrollHandler(cateScrollRef, "right")} >
                        <FaCircleChevronRight />
                    </button>}
                </div>
            </div>

            <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
                <h1 className='text-gray-800 text-2xl sm:text-3xl'>Best Shop in {currentcity}</h1>
                <div className='w-full relative '>
                    {showleftShopButton &&
                        <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[
                    #e64528] z-10' onClick={() => scrollHandler(shopScrollRef, "left")} >
                            <FaCircleChevronLeft />
                        </button>
                    }
                    <div className='w-full flex overflow-x-auto gap-4 pb-2' ref={shopScrollRef} >
                        {
                            shopsInMyCity?.map((shop, index) => (
                                <CategoryCard key={index} name={shop.name} image={shop.image} onClick={()=>navigate(`/shop/${shop._id}`)} />
                            ))}
                    </div>
                    {showrightShopButton && <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[
                    #e64528] z-10' onClick={() => scrollHandler(shopScrollRef, "right")} >
                        <FaCircleChevronRight />
                    </button>}
                </div>
            </div>

            <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
                <h1 className='text-gray-800 text-2xl sm:text-3xl'>Suggested Food Items</h1>
                <div className='w-full h-auto flex flex-wrap gap-[20px] justify-center'>
                        {updateItemsList?.map((item,index)=>(
                            <FoodCard key={index} data={item} />
                        ))}
                    </div>
            </div>
        </div>

    )
}

export default UserDashboard