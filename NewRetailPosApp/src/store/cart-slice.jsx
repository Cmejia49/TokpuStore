import { createSlice } from "@reduxjs/toolkit";

const initialState={
    itemList:[],
    totalQuantity:0,
    total:0,
    change:0,
    changed:false,
    amt:''
}
const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
      reset: () => initialState,
        increment(state,action){  

            const updatedCart = state.itemList
            .map((curElem) => {
                if (curElem.id === action.payload) {
                    if(curElem.Quantity !== curElem.stock){
                  const Quantity=(curElem.Quantity * 1) + 1;
                  const subtotal = (Quantity * (curElem.Price *1))
                  return {
                     ...curElem, 
                     Quantity: curElem.Quantity + 1,
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
                if(curElem.Quantity !== 1){
                const Quantity=curElem.Quantity - 1;
                const subtotal = curElem.Price * Quantity
                return {
                   ...curElem, 
                   Quantity: curElem.Quantity - 1, 
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
                existingItem.Quantity += newItem.Quantity;
                existingItem.subTotal += newItem.Price * newItem.Quantity;
            }else{
                state.itemList.push({
                    id: newItem.id+newItem.variation,
                    Price: newItem.price,
                    Quantity: newItem.Quantity,
                    subTotal: newItem.price * newItem.Quantity,
                    name: newItem.name,
                    stock:newItem.stock,
                    StockFid:newItem.stockId,
                    ItemCode:newItem.itemCode,
                    img:newItem.img,
                    variationName:newItem.variation,
                    ProductName:newItem.name +"/"+newItem.variation
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
        getTotal(state,action){
                let count=0;
                for (var i=state.itemList.length; i--;) {
                  count+=state.itemList[i].subTotal;
                }
              state.total = count;  
        },
        getChange(state,action){
            const change =  (1*action.payload)-state.total 
            state.amt = action.payload + ""
            state.change = change
        }  
    }

})


export const cartAction = cartSlice.actions;


export const getItemList = (state)=>state.cart.itemList;
export const getTotalQuantity = (state)=>state.cart.totalQuantity;
export const getTotal = (state) => state.cart.total;
export const getChange = (state) => state.cart.change;
export const getAmt = (state) => state.cart.amt;

export default cartSlice.reducer;