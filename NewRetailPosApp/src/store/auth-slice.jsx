import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAccount, login } from "../service/authService";

const initialState={
    id:0,
    token:null,
    status:{
        loginStatus:'idle',
        getStatus:'idle',
    },
    account:[],
    error:''
};

export const loginReq = createAsyncThunk('auth/login', async(req)=>{
    const json = JSON.stringify(req);
        const res = await login(json);
        return res;
})


export const getAccount = createAsyncThunk('auth/getAccount', async(payload)=>{
    const {token,id} = payload;
    const res = await fetchAccount(token,id)
    .then(res =>{
        return res;
    });
    return res;
})

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken(state,action){
            const {token,id} = action.payload
            state.token = token;
            state.id = id
        },
        clearJwt(state){
            state.token = null;
        },
        reset(state){
            state.status.getStatus = "idle";
        },
        resetAll: () => initialState,
    },
    extraReducers(builder){
        builder
        .addCase(loginReq.pending,(state) =>{
            state.status.loginStatus = "loading";
        })
        .addCase(loginReq.fulfilled,(state,action) =>{
            state.status.loginStatus = "succeeded";
            state.token = action.payload.data.jwtToken;
            state.id = action.payload.data.id;
        })
        .addCase(loginReq.rejected,(state,action) =>{
            state.status.loginStatus = 'failed'
            state.error = action.error.message
        })

        .addCase(getAccount.pending,(state) =>{
            state.status.getStatus = "loading";
        })
        .addCase(getAccount.fulfilled,(state,action) =>{
            state.status.getStatus = "succeeded";
            state.account = action.payload;
        })
        .addCase(getAccount.rejected,(state,action) =>{
            state.status.getStatus = 'failed'
            state.error = action.error.message
        })
    }
})


export const getStatus = (state) => state.auth.status;
export const getError = (state) => state.auth.error;
export const getToken = (state) => state.auth.token;
export const getId = (state) => state.auth.id;
export const singleAcoount = (state)=> state.auth.account;
export const authAction =  authSlice.actions;
export default authSlice.reducer;