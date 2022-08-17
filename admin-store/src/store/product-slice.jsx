import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProduct,fetchByName,fetchByCat, postProduct, fetchById, putProduct, deleteProduct } from "../services/productService";



const initialState={
    productList:[],
    singleProduct:[],
    header:[],
    filterValue:'',
    status:{
        getAllStatus:'idle',
        getStatus:'idle',
        updateStatus:'idle',
        deleteStatus:'idle',
        createStatus:'idle',
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

export const retrieveItemByName = createAsyncThunk('product/retrieveItemByName', async(page=1,{ getState })=>{
    const name  = getState().product.filterValue;

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


export const postItem = createAsyncThunk("product/postItem",async({text=[],img=[],token=""})=>{
    const formData = new FormData();
    for (const i of img) {

        formData.append("Files",i.imageSrc);
      }

    formData.append("Item",JSON.stringify(text)) 

    const res = await postProduct(formData,token).then(res =>{
        return res;
    })

    return res;
})

export const deleteItem = createAsyncThunk("product/deleteITem", async({id="",token=""}) =>{
    const res = await deleteProduct(id, token).then(res =>{
        return res;
    })

    return res;
})

export const putItem = createAsyncThunk("product/putItem",async({text=[],token="",id=""})=>{
    const updatedItem = JSON.stringify(text);

    const res = await putProduct(id,token,updatedItem).then(res =>{
        return res;
    })

    return res;
})

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        setName(state,action){
            state.filterValue = action.payload;
        },
        setStatus(state,action){
            state.status.getStatus = action.payload;
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
           state.filterValue="";
           state.productList = data;
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
           state.productList = data;
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
           state.productList = data;
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

        .addCase(postItem.pending, (state, action)=>{
            state.status.createStatus = 'loading'
        })
        .addCase(postItem.fulfilled, (state, action) => {
           state.status.createStatus = 'succeded'
       })
        .addCase(postItem.rejected, (state, action)=>{
           state.status.createStatus = 'failed'
           state.error = action.error.message
        })

        .addCase(putItem.pending, (state, action)=>{
            state.status.updateStatus = 'loading'
        })
        .addCase(putItem.fulfilled, (state, action) => {
           state.status.updateStatus = 'succeded'
       })
        .addCase(putItem.rejected, (state, action)=>{
           state.status.updateStatus = 'failed'
           state.error = action.error.message
        })

        
        .addCase(deleteItem.pending, (state, action)=>{
            state.status.deleteStatus = 'loading'
        })
        .addCase(deleteItem.fulfilled, (state, action) => {
           state.status.deleteStatus = 'succeded'
       })
        .addCase(deleteItem.rejected, (state, action)=>{
           state.status.deleteStatus = 'failed'
           state.error = action.error.message
        })

    }
})
export const selectAllProduct = (state) => state.product.productList;
export const singleProduct = (state) => state.product.singleProduct;
export const getPostsStatus = (state) => state.product.status;
export const getPostsError = (state) => state.product.error;
export const getFilterValue = (state) => state.product.filterValue;

export const productAction = productSlice.actions;
export default productSlice;