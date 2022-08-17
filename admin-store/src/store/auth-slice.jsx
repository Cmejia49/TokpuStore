import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { deleteAccount, fetchAccount, fetchAllAccount, login, putAccount, register } from "../services/authService";
const initialState={
    token:null,
    status:{
        registerStatus:'idle',
        loginStatus:'idle',
        getAllStatus:'idle',
        getStatus:'idle',
        updateStatus:'idle',
        deleteStatus:'idle'
    },
    accountList:[],
    account:[],
    error:''
};

export const loginReq = createAsyncThunk('auth/login', async(req)=>{
    const json = JSON.stringify(req);
        const res = await login(json);
        return res;
})

export const retrieveAccount = createAsyncThunk('auth/retrieveAccount', async(token)=>{
    const res = await fetchAllAccount(token)
    .then(res =>{
        return res;
    });
    return res;
})

export const getAccount = createAsyncThunk('auth/getAccount', async({token="",id=""})=>{
    const res = await fetchAccount(token,id)
    .then(res =>{
        return res;
    });
    return res;
})

export const deleteAccounts = createAsyncThunk('auth/deleteAccounts', async({token="",id=""})=>{
    const res = await deleteAccount(token,id)
    .then(res =>{
        return res;
    });
    return res;
})

export const registerAccount = createAsyncThunk('auth/registerAccount', async({token="",text=""})=>{
    const json = JSON.stringify(text);
    const res = await register(token,json)
    .then(res =>{
        return res;
    });
    return res;
})

export const updateAccount = createAsyncThunk('auth/updateAccount', async({token="", text="",id=""})=>{
    const json = JSON.stringify(text);
    const res = await putAccount(token,id,json).then(res =>{
        return res;
    })
    return res;
})
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setStatus(state,action){
            state.status.getStatus = action.payload;
        },
        reset(state,action){
            state.status.registerStatus = "idle";
            state.status.deleteStatus = "idle";
            state.status.getAllStatus ='idle';
            state.status.getStatus ='idle';
        },
        resetAll:()=> initialState
    },
    extraReducers(builder){
        builder
        .addCase(loginReq.pending,(state) =>{
            state.status.loginStatus = "loading";
        })
        .addCase(loginReq.fulfilled,(state,action) =>{
            state.status.loginStatus = "succeeded";
            state.token = action.payload.data.jwtToken;
        })
        .addCase(loginReq.rejected,(state,action) =>{
            state.status.loginStatus = 'failed'
            state.error = action.error.code
            console.log(state.error)
        })

        .addCase(registerAccount.pending,(state) =>{
            state.status.registerStatus = "loading";
        })
        .addCase(registerAccount.fulfilled,(state,action) =>{
            state.status.registerStatus = "succeeded";
        })
        .addCase(registerAccount.rejected,(state,action) =>{
            state.status.registerStatus = 'failed'
            state.error = action.error.message
        })

        .addCase(retrieveAccount.pending,(state) =>{
            state.status.getAllStatus = "loading";
        })
        .addCase(retrieveAccount.fulfilled,(state,action) =>{
            state.status.getAllStatus = "succeeded";
            state.accountList = action.payload;
        })
        .addCase(retrieveAccount.rejected,(state,action) =>{
            state.status.getAllStatus = 'failed'
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

        .addCase(deleteAccounts.pending,(state) =>{
            state.status.deleteStatus = "loading";
        })
        .addCase(deleteAccounts.fulfilled,(state,action) =>{
            state.status.deleteStatus = "succeeded";
        })
        .addCase(deleteAccounts.rejected,(state,action) =>{
            state.status.deleteStatus = 'failed'
            state.error = action.error.message
        })

        .addCase(updateAccount.pending,(state) =>{
            state.status.updateStatus = "loading";
        })
        .addCase(updateAccount.fulfilled,(state,action) =>{
            state.status.updateStatus = "succeeded";
        })
        .addCase(updateAccount.rejected,(state,action) =>{
            state.status.updateStatus = 'failed'
            state.error = action.error.message
        })
    }
})


export const getStatus = (state) => state.auth.status;
export const getError = (state) => state.auth.error;
export const singleAcoount = (state)=> state.auth.account;
export const selectAccount = (state)=>state.auth.accountList;
export const getToken = (state) => state.auth.token;

export const authAction =  authSlice.actions;
export default authSlice;