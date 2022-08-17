import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSaleHistory, fetchSaleHistoryByDate, postSale } from "../service/saleService";

const initialState={
    saleList:[],
    status:'idle',
    header:{},
    error:null,
    quantity:0,
    cost:0,
    totalMargin:0,
    totalPrice:0,
    total:0
}
export const retriveSale = createAsyncThunk('sale/retriveSale', async(payload)=>{
    const {day,id,token,type,pageNumber} = payload;
    const res = await fetchSaleHistory(day,id,token,type,pageNumber).then(res =>{
         return res;
     })
     return res;
 })
 export const retriveSaleByDate = createAsyncThunk('sale/retriveSaleByDate', async(payload)=>{
    const {date,id,token,type,pageNumber} = payload;
    const res = await fetchSaleHistoryByDate(date,id,token,type,pageNumber).then(res =>{
         return res;
     })
     return res;
 })
export const createSale = createAsyncThunk('sale/createSale', async(payload)=>{
   const {data,token} = payload;
    const res = await postSale(data,token).then(res =>{
        return res;
    })
    return res;
})
const saleSlice = createSlice({
    name:"sale",
    initialState,
    reducers:{
        reset:()=>initialState,

        getTotal(state,action){
            const {cost,quantity,price,margin,total} = action.payload;
            state.cost = state.cost + cost
            state.quantity = state.quantity + quantity
            state.totalPrice = state.totalPrice + price
            state.totalMargin = state.totalMargin + margin
            state.total = state.total + total
        },
    },
    extraReducers(builder){
        builder
        .addCase(retriveSale.pending, (state, action)=>{
            state.status = 'loading'

        })
        .addCase(retriveSale.fulfilled, (state, action) => {
           state.status = 'succeded'
           const [data, header] = action.payload;
           state.saleList = [...state.saleList, ...data];
           state.header = JSON.parse(header);


       })
        .addCase(retriveSale.rejected, (state, action)=>{
           state.status = 'failed'
           state.error = action.error.message

        })
        .addCase(createSale.pending, (state, action)=>{
            state.status = 'loading'
   
        })
        .addCase(createSale.fulfilled, (state, action) => {
           state.status = 'succeded'

       })
        .addCase(createSale.rejected, (state, action)=>{
           state.status = 'failed'
           state.error = action.error.message

        })
        .addCase(retriveSaleByDate.pending, (state, action)=>{
            state.status = 'loading'
   
        })
        .addCase(retriveSaleByDate.fulfilled, (state, action) => {
            state.status = 'succeded'
            const [data, header] = action.payload;
            state.saleList = [...state.saleList, ...data];
            state.header = JSON.parse(header);

       })
        .addCase(retriveSaleByDate.rejected, (state, action)=>{
           state.status = 'failed'
           state.error = action.error.message

        })

    }
})

export const saleAction  = saleSlice.actions
export const getHeader = (state) => state.sale.header;
export const getStatus = (state) => state.sale.status;
export const selectSaleList = (state) => state.sale.saleList;
export const getTotalQnty = (state) => state.sale.quantity;
export const getTotalCost = (state) => state.sale.cost;
export const getTotalMargin = (state) => state.sale.totalMargin;
export const getTotalPrice = (state) => state.sale.totalPrice;
export const getTotal = (state) => state.sale.total;
export default saleSlice.reducer;