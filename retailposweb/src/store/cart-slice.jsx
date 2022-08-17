import { createSlice } from "@reduxjs/toolkit";

const initialState={
    itemList:[],
    totalQuantity:0,
    changed:false,
}
const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        increment(state,action){  

            const updatedCart = state.itemList
            .map((curElem) => {
                if (curElem.id === action.payload) {
                    if(curElem.quantity !== curElem.stock){
                  const quantity=curElem.quantity + 1;
                  const subtotal = quantity * curElem.price
                  return {
                     ...curElem, 
                     quantity: curElem.quantity + 1,
                     subTotal:subtotal
                    };
                }
              } 
                return curElem;
              });
          
            state.itemList = updatedCart;
        },

        decrement(state,action){
            const updatedCart = state.itemList
            .map((curElem) => {
              if (curElem.id === action.payload) {
                if(curElem.quantity !== 1){
                const quantity=curElem.quantity - 1;
                const subtotal = curElem.price * quantity
                return {
                   ...curElem, 
                   quantity: curElem.quantity - 1, 
                   subTotal:subtotal
                  };
              }
            }
              return curElem;
            })
            state.itemList = updatedCart;
        },

        replaceData(state,action){
            state.totalQuantity = action.payload.totalQuantity;
            state.itemList = action.payload.itemList;
        },

        addToCart(state, action){

            state.changed =true;
            const newItem = action.payload;

            const existingItem = state.itemList.find(
                (item) => item.id === newItem.id+newItem.variation
            );
            if(existingItem){
                existingItem.quantity += newItem.quantity;
                existingItem.subTotal += newItem.price * newItem.quantity;
            }else{
                state.itemList.push({
                    id: newItem.id+newItem.variation,
                    img:newItem.img,
                    price: newItem.price,
                    quantity: newItem.quantity,
                    subTotal: newItem.price * newItem.quantity,
                    name: newItem.name,
                    stock:newItem.stock,
                    variationName:newItem.variation,
                });
                state.totalQuantity++;
            }
        },
        removeFromCart(state, action) {
            state.changed = true;
            const id = action.payload;
            const updatedCart = state.itemList.filter(
              (curElem) => curElem.id !== id)
              state.totalQuantity--;  
              state.itemList = updatedCart;
          },

    }

})


export const cartAction = cartSlice.actions;


export const getItemList = (state)=>state.cart.itemList;
export const getTotalQuantity = (state)=>state.cart.totalQuantity;

export default cartSlice;