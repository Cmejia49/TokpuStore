import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {fetchDetail} from "../Services/fetchService"
const initialState={
    item:[],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    index1:'',
    index2:'',
    stock:0,
    value:0
}   

export const retrieveDetail = createAsyncThunk('detail/retrieveDetail', async(payload)=>{
    
    const data = await fetchDetail(payload.id).then(res =>{
        return res;
    })

    return data;
})



const detailSlice = createSlice({
    name:'detail',
    initialState,
    reducers:{
        reset: () => initialState,
        increment(state){
            const stock = state.stock.length > 0 ? state.stock[0].quantity : state.stock
            if(state.value < stock){
                state.value = state.value+1;
                }

        },
        decrement(state){
            
            if(state.value >0){
            state.value = state.value-1;
            }
        },

        getIndex1(state,action){
            state.index1 = action.payload
            state.value = 0

        },

        getIndex2(state,action){
          state.index2= action.payload
          state.value = 0
        },
        updateStock(state){
            if(state.item.variantList !== undefined){
                if(state.item.variantList.length === 1){
                    if(state.index1 !== "" ){
                        const index = state.index1
                        const stock = state.item.stockList.filter(x => x.stockIndex === index);
                        state.stock = stock
                    }else{
                        const stock = state.item.stockList.reduce((x,y)=> (x + y.quantity),0)
    
                        state.stock = stock
                    }
                }else if (state.item.variantList.length === 2){
                    if(state.index1 !== "" && state.index2 !== ""){
                        const index = state.index1 +"/" + state.index2

                        const stock = state.item.stockList.filter(x => x.stockIndex === index);
                        state.stock = stock;
                        }else{
                            const stock = state.item.stockList.reduce((x,y)=> (x + y.quantity),0)
    
                           state.stock = stock
                        }

                }else{
                    state.stock = state.item.stockList;
                }
         }else{
            //compute everything stock
        
         }
        }
    },
    extraReducers(builder){
        builder
        .addCase(retrieveDetail.pending, (state, action)=>{
            state.status = 'loading'
        })
        .addCase(retrieveDetail.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.item = action.payload
       })
        .addCase(retrieveDetail.rejected, (state, action)=>{
           state.status = 'failed'
           state.error = action.error.message
        })

    }
})

export const detailAction  = detailSlice.actions
export const selectDetail = (state) => state.detail.item;
export const getDetailStatus = (state) => state.detail.status;
export const getDetailError = (state) => state.detail.error;
export const getIndex1 = (state) => state.detail.index1;
export const getIndex2 = (state) => state.detail.index2;
export const getStock = (state) => state.detail.stock;
export const getValue = (state) => state.detail.value;

export default detailSlice;
