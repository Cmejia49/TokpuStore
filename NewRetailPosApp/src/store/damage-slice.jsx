import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDamage, fetchDamageByDate, postDamage } from "../service/damageService";


const initialState={
    damageList:[],
    status:'idle',
    header:{},
    error:null,
    quantity:0,
    total:0
}
export const retrieveDamage = createAsyncThunk('damage/retrieveDamage', async(payload)=>{
    const {day,id,token,type,pageNumber} = payload;
    const res = await fetchDamage(day,id,token,type,pageNumber).then(res =>{
         return res;
     })
     return res;
 })
 export const retrieveDamageByDate = createAsyncThunk('damage/retriveDamageByDate', async(payload)=>{
    const {date,id,token,type,pageNumber} = payload;

    const res = await fetchDamageByDate(date,id,token,type,pageNumber).then(res =>{
         return res;
     })
     return res;
 })

 export const createDamage = createAsyncThunk('damage/createDamage', async(payload)=>{
    const {data,token} = payload;
     const res = await postDamage(data,token).then(res =>{
         return res;
     })
     return res;
 })

 const damageSlice = createSlice({
    name:'damage',
    initialState,
    reducers:{
        reset:()=>initialState,
        getTotal(state,action){
            const {quantity,total} = action.payload;
            state.quantity = state.quantity + quantity
            state.total = state.total + total
        }
    },
    extraReducers(builder){
        builder
        .addCase(retrieveDamage.pending, (state, action)=>{
            state.status = 'loading'

        })
        .addCase(retrieveDamage.fulfilled, (state, action) => {
           state.status = 'succeded'
           const [data, header] = action.payload;
           state.damageList = [...state.damageList, ...data];
           state.header = JSON.parse(header);

       })
        .addCase(retrieveDamage.rejected, (state, action)=>{
           state.status = 'failed'
           state.error = action.error.message
        })
        .addCase(retrieveDamageByDate.pending, (state, action)=>{
            state.status = 'loading'

        })
        .addCase(retrieveDamageByDate.fulfilled, (state, action) => {
           state.status = 'succeded'
           const [data, header] = action.payload;
           state.damageList = [...state.damageList, ...data];
           state.header = JSON.parse(header);


       })
        .addCase(retrieveDamageByDate.rejected, (state, action)=>{
           state.status = 'failed'
           state.error = action.error.message

        })
        .addCase(createDamage.pending, (state, action)=>{
            state.status = 'loading'

        })
        .addCase(createDamage.fulfilled, (state, action) => {
           state.status = 'succeded'

       })
        .addCase(createDamage.rejected, (state, action)=>{
           state.status = 'failed'
           state.error = action.error.message
        })
    }
 })
 export const damageAction  = damageSlice.actions
export const getHeader = (state) => state.damage.header;
export const getStatus = (state) => state.damage.status;
export const selectDamageList = (state) => state.damage.damageList;
export const getTotalQnty = (state) => state.damage.quantity;
export const getTotal = (state) => state.damage.total;
export default damageSlice.reducer;