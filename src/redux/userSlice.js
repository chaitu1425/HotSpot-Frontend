import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null,
        currentcity:null,
        currentstate:null,
        currentaddress:null,
        shopsInMyCity:null,
        itemsInMyCity:null,
        cartItems:[],
        totalAmount:0,
        myOrders:[],
        searchItems:null,
        socket:null
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload
        },
        setcurrentCity:(state,action)=>{
            state.currentcity=action.payload
        },
        setCurrentState:(state,action)=>{
            state.currentstate=action.payload
        },
        setCurrentAddress:(state,action)=>{
            state.currentaddress=action.payload
        },
        setShopsInMyCity:(state,action)=>{
            state.shopsInMyCity=action.payload
        },
        setItemsInMyCity:(state,action)=>{
            state.itemsInMyCity=action.payload
        },
        AddToCart:(state,action)=>{
            const cartItem=action.payload
            const existingItem = state.cartItems.find(i=>i.id == cartItem.id)
            if(existingItem){
                existingItem.quantity+=cartItem.quantity
            }else{
                state.cartItems.push(cartItem)
            }
            state.totalAmount = state.cartItems.reduce((sum,i)=>sum+i.price*i.quantity,0)
        },
        UpdateCart:(state,action)=>{
            const {id,quantity} = action.payload
            const item = state.cartItems.find(i=>i.id==id)
            if(item){
                item.quantity=quantity
            }
            state.totalAmount = state.cartItems.reduce((sum,i)=>sum+i.price*i.quantity,0)
        },
        RemoveCartItem:(state,action)=>{
            state.cartItems=state.cartItems.filter(i=>i.id!==action.payload)
            state.totalAmount = state.cartItems.reduce((sum,i)=>sum+i.price*i.quantity,0)

        },
        setMyOrders:(state,action)=>{
            state.myOrders=action.payload
        },
        addMyOrder:(state,action)=>{
            state.myOrders = [action.payload,...state.myOrders]
        },
        updateOrderStatus:(state,action)=>{
            const {orderId,shopId,status}=action.payload
            const order = state.myOrders.find(o=>o._id==orderId)
            if(order.shopOrders && order.shopOrders.shop._id==shopId){
                order.shopOrders.status=status
            }
        },
        setSearchItems:(state,action)=>{
            state.searchItems=action.payload
        },
        setSocket:(state,action)=>{
            state.socket=action.payload
        }
    }
})
export const {setUserData,setcurrentCity,setCurrentState,setSearchItems,setCurrentAddress,setShopsInMyCity,setItemsInMyCity,AddToCart,UpdateCart,RemoveCartItem,setMyOrders,addMyOrder,updateOrderStatus,setSocket} = userSlice.actions
export default userSlice.reducer