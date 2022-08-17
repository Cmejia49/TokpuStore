import {createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import { deleteStore, fetchStore, fetchStoreById, postStore, updateStore } from "../services/storeService";

const initialState={
    storeList:[],
    status:{
        getAllStatus:'idle',
        getStatus:'idle',
        createStatus:'idle',
        updateStatus:'idle',
        deleteStatus:'idle'
    },
    error:null,
    singleStore:[],
    selectedStore:[]
}

export const retrieveStore = createAsyncThunk('store/retrieveStore', async(token)=>{
    const data = await fetchStore(token).then(res=>{
        return res;
    })
    return data;
})

export const retrieveStoreById = createAsyncThunk('store/retrieveStoreById', async({token="",id=""})=>{
    const res = await fetchStoreById(token,id).then(res =>{
        return res;
    })

    return res;
})

export const putStore = createAsyncThunk('store/putStore',async({token='', id='', text=''})=>{
    const json = JSON.stringify(text);
    const res = await updateStore(token,id,json).then(res =>{
        return res;
    })

    return res;
})

export const createStore = createAsyncThunk('store/putStore',async({token='', text=''}, { rejectWithValue })=>{
    const json = JSON.stringify(text);
    const res = await postStore(token,json).then(res =>{
        return res;
    }).catch(error => {
        return rejectWithValue(error.response.data)
    });
    return res;
})

export const deleteStores = createAsyncThunk('store/deleteStores',async({token='', id=''})=>{
    const res = await deleteStore(token,id).then(res =>{
        return res;
    })

    return res;
})

const storeSlice = createSlice({
    name:"store",
    initialState,
    reducers:{

        getStore(state,action){
            state.selectedStore = action.payload;
        },
        reset: () => initialState
    },
    extraReducers(builder){
        builder
        .addCase(retrieveStore.pending, (state, action)=>{
            state.status.getAllStatus = 'loading'
        })
        .addCase(retrieveStore.fulfilled, (state, action) => {
           state.status.getAllStatus = 'succeeded'
           state.storeList = action.payload;
           state.selectedStore = action.payload[0];
       })
        .addCase(retrieveStore.rejected, (state, action)=>{
           state.status.getAllStatus = 'failed'
           state.error = action.error.message
           console.log(action.error.message)
        })
        .addCase(retrieveStoreById.pending, (state, action)=>{
            state.status.getStatus = 'loading'
        })
        .addCase(retrieveStoreById.fulfilled, (state, action) => {
            state.status.getStatus= 'succeeded'
           state.singleStore = action.payload;

       })
        .addCase(retrieveStoreById.rejected, (state, action)=>{
            state.status.getStatus = 'failed'
           state.error = action.error.message
           console.log(action.error.message)
        })

        .addCase(createStore.pending, (state, action)=>{
            state.status.createStatus = 'loading'
        })
        .addCase(createStore.fulfilled, (state, action) => {
            state.status.createStatus= 'succeeded'
       })
        .addCase(createStore.rejected, (state, action)=>{
            state.status.createStatus = 'failed'
           state.error = action.payload.errors
           console.log(JSON.stringify(state.error))
        })

        
        .addCase(deleteStores.pending, (state, action)=>{
            state.status.deleteStatus = 'loading'
        })
        .addCase(deleteStores.fulfilled, (state, action) => {
            state.status.deleteStatus= 'succeeded'
       })
        .addCase(deleteStores.rejected, (state, action)=>{
            state.status.deleteStatus = 'failed'
           state.error = action.error.message
           console.log(action.error.message)
        })

    }
})

export const selectAllStore = (state)=>state.store.storeList;
export const getStoreStatus = (state)=>state.store.status;
export const getStoreError = (state)=> state.store.error;
export const getStore = (state) => state.store.singleStore;
export const getSelectedStore =(state)=> state.store.selectedStore;
export const storeAction =  storeSlice.actions;
export default storeSlice;