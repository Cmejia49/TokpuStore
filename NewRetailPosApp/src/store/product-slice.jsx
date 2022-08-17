import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProduct,fetchByName,fetchByCat, fetchById } from "../service/productService";

const initialState={
    page:1,
    productList:[],
    singleProduct:[],
    header:[],
    filterValue:'',
    status:{
        getAllStatus:'idle',
        getStatus:'idle',
        filterStatus:'idle',
        catFilterStatus:'idle'
    },
    error:null
}

export const retrieveItem = createAsyncThunk('product/retrieveItem', async(page=1)=>{
    const data = await fetchProduct(page).then(res =>{
        return res;
    })
    return data;
})

export const retrieveItemByName = createAsyncThunk('product/retrieveItemByName', async(payload)=>{
    const {page,name} = payload;

     const data = await fetchByName(name,page).then(res =>{
        return res;
    })
    return data;
})


export const retrieveItemByCat = createAsyncThunk('product/retrieveItemByCat', async(payload)=>{

    const {page,id} = payload;
     const data = await fetchByCat(id,page).then(res =>{
        return res;
    })
    return data;
})

export const getItem = createAsyncThunk("product/getItem",async(id)=>{
    const res = await fetchById(id)
    .then(res => {
        return res;
    })
    return res;
})


const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        setPage(state,action){
            state.page = action.payload
        },
        reset: () => initialState
    },
    extraReducers(builder){
        builder
        .addCase(retrieveItem.pending, (state, action)=>{
            state.status.getAllStatus = 'loading'
        })
        .addCase(retrieveItem.fulfilled, (state, action) => {
           state.status.getAllStatus = 'succeded'
           const [data, header] = action.payload;
           state.productList = [...state.productList, ...data];
           state.header = JSON.parse(header);

       })
        .addCase(retrieveItem.rejected, (state, action)=>{
           state.status.getAllStatus = 'failed'
           state.error = action.error.message

 
        })
        .addCase(retrieveItemByName.pending, (state, action)=>{
            state.status.filterStatus = 'loading'
        })
        .addCase(retrieveItemByName.fulfilled, (state, action) => {
           state.status.filterStatus = 'succeded'
           const [data, header] = action.payload;
           state.productList = [...state.productList, ...data];
           state.header = JSON.parse(header);
       })
        .addCase(retrieveItemByName.rejected, (state, action)=>{
           state.status.filterStatus = 'failed'
           state.error = action.error.message
        })
        .addCase(retrieveItemByCat.pending, (state, action)=>{
            state.status.catFilterStatus = 'loading'
        })
        .addCase(retrieveItemByCat.fulfilled, (state, action) => {
           state.status.catFilterStatus = 'succeded'
           const [data, header] = action.payload;
           state.productList = [...state.productList, ...data];
           state.header = JSON.parse(header);

       })
        .addCase(retrieveItemByCat.rejected, (state, action)=>{
           state.status.catFilterStatus = 'failed'
           state.error = action.error.message

        })

        .addCase(getItem.pending, (state, action)=>{
            state.status.getStatus = 'loading'

        })
        .addCase(getItem.fulfilled, (state, action) => {
           state.status.getStatus = 'succeded'
        
           state.singleProduct = action.payload;

       })
        .addCase(getItem.rejected, (state, action)=>{
           state.status.getStatus = 'failed'
           state.error = action.error.message
        })

    }
})

export const selectAllProduct = (state) => state.product.productList;
export const singleProduct = (state) => state.product.singleProduct;
export const getError = (state) => state.product.error;
export const getFilterValue = (state) => state.product.filterValue;
export const getStatus = (state) => state.product.status;
export const getHeader = (state) => state.product.header;
export const getPage = (state) => state.product.page;
export const productAction = productSlice.actions;
export default productSlice.reducer;