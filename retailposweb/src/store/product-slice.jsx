import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";
import { fetchProduct,fetchByName,fetchByCat } from "../Services/fetchService";
const initialState={
    productList:[],
    header:[],
    filterValue:'',
    status:{
        searchStatus:"idle",
        catStatus:"idle",
        mainStatus:"idle",
    }, 
    error: null
};

export const retrieveItem = createAsyncThunk('product/retrieveItem', async(page=1)=>{
    const data = await fetchProduct(page).then(res =>{
        return res;
    })
    return data;
})

export const retrieveItemByName = createAsyncThunk('product/retrieveItemByName', async({page=1,name=""})=>{

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
const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        reset: () => initialState,
        replaceData(state,action){
             state.productList = action.payload.productList;  
             state.header = action.payload.header;
        },

        setName(state,action){
            state.filterValue = action.payload;
        }
    },

    extraReducers(builder){
        builder
         .addCase(retrieveItem.pending, (state, action)=>{
             state.status.mainStatus = 'loading'
         })
         .addCase(retrieveItem.fulfilled, (state, action) => {
            state.status.mainStatus  = 'succeeded'
            const [header, data] = action.payload;
            state.filterValue="";
            state.productList = data;
            state.header = header;
        })
         .addCase(retrieveItem.rejected, (state, action)=>{
            state.status.mainStatus  = 'failed'
            state.error = action.error.message

         })

        .addCase(retrieveItemByName.pending, (state, action)=>{
            state.status.searchStatus = 'loading'
        })
        .addCase(retrieveItemByName.fulfilled, (state, action) => {
            state.status.searchStatus = 'succeeded'
           const [header, data] = action.payload;
           state.productList = data;
           state.header = header;
       })
        .addCase(retrieveItemByName.rejected, (state, action)=>{
            state.status.searchStatus= 'failed'
           state.error = action.error.message
        })
        .addCase(retrieveItemByCat.pending, (state, action)=>{
            state.status.catStatus = 'loading'
        })
        .addCase(retrieveItemByCat.fulfilled, (state, action) => {
            state.status.catStatus= 'succeeded'
           const [header, data] = action.payload;
           state.productList = data;
           state.header = header;
       })
        .addCase(retrieveItemByCat.rejected, (state, action)=>{
            state.status.catStatus = 'failed'
           state.error = action.error.message
           console.log(state.error)
        })
 
    }
})

export const selectAllPosts = (state) => state.product.productList
export const getPostsStatus = (state) => state.product.status;
export const getPostsError = (state) => state.product.error;


export const productAction = productSlice.actions;

export default productSlice;