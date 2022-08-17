import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";
import {fetchCategory} from "../services/productService"
const initialState={
   categories:[],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

export const retrieveCategories = createAsyncThunk('category/retrieveCategories', async()=>{
    const data = await fetchCategory().then(res =>{
        return res;
    })
    return data;
})

const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{

    },

    extraReducers(builder){
        builder
        .addCase(retrieveCategories.pending,(state,action)=>{
            state.status = 'loading'
        })
        .addCase(retrieveCategories.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.categories = action.payload;
        })
        .addCase(retrieveCategories.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })
    }


})

export const selectAllCategory = (state)=> state.category.categories;
export const getCategoryStatus = (state)=> state.category.status;
export const getCategoryError = (state)=> state.category.error;

export default categorySlice;