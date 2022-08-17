import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { postExpenses,fetchExpenses,fetchExpensesByDate } from "../service/expensesService";

const initialState={
    expensesList:[],
    status:'idle',
    header:{},
    error:null,
    total:0
}

export const retrieveExpenses = createAsyncThunk('expenses/retrieveExpenses', async(payload)=>{
    const {day,id,token,type,pageNumber} = payload;
    const res = await fetchExpenses(day,id,token,type,pageNumber).then(res =>{
         return res;
     })
     return res;
 })
 export const retrieveExpensesByDate = createAsyncThunk('expenses/retrieveExpensesByDate', async(payload)=>{
    const {date,id,token,type,pageNumber} = payload;
    const res = await fetchExpensesByDate(date,id,token,type,pageNumber).then(res =>{
         return res;
     })
     return res;
 })
export const createExpenses = createAsyncThunk('expenses/createExpenses', async(payload)=>{
   const {data,token} = payload;
    const res = await postExpenses(data,token).then(res =>{
        return res;
    })
    return res;
})

const expensesSlice = createSlice({
    name:"expenses",
    initialState,
    reducers:{
        reset:()=>initialState,

        getTotal(state,action){
            state.total = state.total + action.payload;
        },
    },
    extraReducers(builder){
        builder
        .addCase(retrieveExpenses.pending, (state, action)=>{
            state.status = 'loading'

        })
        .addCase(retrieveExpenses.fulfilled, (state, action) => {
           state.status = 'succeded'
           const [data, header] = action.payload;
           state.expensesList = [...state.expensesList, ...data];
           state.header = JSON.parse(header);

       })
        .addCase(retrieveExpenses.rejected, (state, action)=>{
           state.status = 'failed'
           state.error = action.error.message
        })
        .addCase(createExpenses.pending, (state, action)=>{
            state.status = 'loading'
   
        })
        .addCase(createExpenses.fulfilled, (state, action) => {
           state.status = 'succeded'

       })
        .addCase(createExpenses.rejected, (state, action)=>{
           state.status = 'failed'
           state.error = action.error.message

        })
        .addCase(retrieveExpensesByDate.pending, (state, action)=>{
            state.status = 'loading'
   
        })
        .addCase(retrieveExpensesByDate.fulfilled, (state, action) => {
            state.status = 'succeded'
            const [data, header] = action.payload;
            state.expensesList = [...state.expensesList, ...data];
            state.header = JSON.parse(header);


       })
        .addCase(retrieveExpensesByDate.rejected, (state, action)=>{
           state.status = 'failed'
           state.error = action.error.message
        })

    }
})

export const expensesAction  = expensesSlice.actions
export const getHeader = (state) => state.expenses.header;
export const getStatus = (state) => state.expenses.status;
export const selectExpensesList = (state) => state.expenses.expensesList;
export const getTotal = (state) => state.expenses.total;
export default expensesSlice.reducer;