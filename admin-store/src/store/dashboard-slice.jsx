import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDamageHistory, fetchDamageSummary, fetchExpensesHistory, fetchExpensesSummary, fetchSaleHistory, fetchSummary, fethSaleSummary } from "../services/dashboardService";

const initialState={
    lineChartData:{},
    barChartData:{},
    expensesChart:{},
    saleChart:{},
    damageChart:{},
    saleHistory:[],
    damageHistory:[],
    expensesHistory:[],
    summary:{},
    paginationHeader:{},
    selectedStore:{storeId:0,storeName:"all"},
    selectedDay:"ThisYear",
    error:[],
    status:{
        dataDashBoardStatus:'idle',
        saleStatus:'idle',
        damageStatus:'idle',
        expensesStatus:'idle',
        summaryStatus:'idle'
    }
};
export const retrieveExpensesHistory = createAsyncThunk("dashBoard/ExpensesRetrieve",async({option="",branch="",type="",pageSize="20",pageNumber="1",token=""})=>{
    const res = await fetchExpensesHistory(option,branch,token,pageSize,type,pageNumber).then(res =>{
        return res;
    })

    return res;
})
export const retrieveSaleHistory = createAsyncThunk("dashBoard/SaleRetrieve",async({option="",branch="",type="",pageSize="20",pageNumber="1",token=""})=>{
    const res = await fetchSaleHistory(option,branch,token,pageSize,type,pageNumber).then(res =>{
        return res;
    })

    return res;
})
export const retrieveDamageHistory = createAsyncThunk("dashBoard/DamageHistory",async({option="",branch="",type="",pageSize="20",pageNumber="1",token=""})=>{
    const res = await fetchDamageHistory(option,branch,token,pageSize,type,pageNumber).then(res =>{
        return res;
    })

    return res;
})
export const retrieveDataDashBoard = createAsyncThunk('dashBoard/retrieve',async({option="",branch="",token=""})=>{
    
    const sale = await fethSaleSummary(option,branch,token).then(res =>{
        return res;
    })

    const expenses = await fetchExpensesSummary(option,branch,token).then(res =>{
        return res;
    })

    const damage = await fetchDamageSummary(option,branch,token).then(res =>{
        return res;
    })
    if(sale !== undefined && damage !== undefined && expenses !== undefined) {
    const lineChart ={
        labels:sale.map((s)=>s.date),
        datasets:[
            {
                label:"Sale",
                data:sale.map((s)=>s.numOfTransac),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label:"damage",
                data:damage.map((s)=>s.numOfTransac),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label:"expenses",
                data:expenses.map((s)=>s.numOfTransac),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(168,255,0,0.71)',
            }
        ]
    }

    const barChart={
        labels:sale.map((s)=>s.date),
        datasets:[
            {
                label:"Sale",
                data:sale.map((s)=>s.totalRevenue),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label:"damage",
                data:damage.map((s)=>s.totalCost),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label:"expenses",
                data:expenses.map((s)=>s.totalExpenses),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(168,255,0,0.71)',
            }
        ]
    }

    const expensesChart = {
        labels:expenses.map((s)=>s.date),
        datasets:[
            {
                label:"Expenses",
                data:expenses.map((s)=>s.totalExpenses),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label:"Expenses Number of transac",
                data:sale.map((s)=>s.numOfTransac),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    }
    const saleChart = {
        labels:expenses.map((s)=>s.date),
        datasets:[
            {
                label:"Sale",
                data:sale.map((s)=>s.totalRevenue),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label:"Sale Number of transac",
                data:sale.map((s)=>s.numOfTransac),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    }
    const damageChart = {
        labels:damage.map((s)=>s.date),
        datasets:[
            {
                label:"Damage Cost",
                data:damage.map((s)=>s.totalCost),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label:"Damage item",
                data:damage.map((s)=>s.totalQuantity),
                borderColor: 'rgb(0, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label:"Number of Report",
                data:damage.map((s)=>s.numOfTransac),
                borderColor: 'rgb(52, 56, 64)',
                backgroundColor: 'rgba(52, 56, 64, 0.5)',
            }
        ]
    }
    return ({lineChart:lineChart,barChart:barChart,expensesChart:expensesChart, saleChart:saleChart, damageChart:damageChart});
    }
    return([sale,damage,expenses]);
})

export const retrieveSummary = createAsyncThunk('dashboard/getSummary',async({option="",branch="",token=""})=>{
    const res = fetchSummary(option,branch,token).then(res =>{
        return res;
    })

    return res;
})

const dashboardSlice =  createSlice({
    name:'dashboard',
    initialState,
    reducers:{
            setStore(state,action){
                state.selectedStore = action.payload
            },
            setDay(state,action){
                state.selectedDay = action.payload
            }
    },
    extraReducers(builder){
        builder
        .addCase(retrieveDataDashBoard.pending, (state, action)=>{
            state.status.dataDashBoardStatus = "loading";
        })
        .addCase(retrieveDataDashBoard.fulfilled, (state, action)=>{
            state.status.dataDashBoardStatus = "succeeded";
            state.lineChartData = action.payload.lineChart;
            state.barChartData = action.payload.barChart;
            state.expensesChart = action.payload.expensesChart;
            state.damageChart = action.payload.damageChart;
            state.saleChart = action.payload.saleChart;

           
        })
        .addCase(retrieveDataDashBoard.rejected, (state, action)=>{
            state.status.dataDashBoardStatus = "failed";
            state.error = action.error.message

        })

        .addCase(retrieveSummary.pending, (state, action)=>{
            state.status.summaryStatus = "loading";
        })
        .addCase(retrieveSummary.fulfilled, (state, action)=>{
            state.status.summaryStatus = "succeeded";
            state.summary = action.payload;

           
        })
        .addCase(retrieveSummary.rejected, (state, action)=>{
            state.status.summaryStatus = "failed";
            state.error = action.error.message
        })

        
        .addCase(retrieveExpensesHistory.pending, (state, action)=>{
            state.status.expensesStatus = "loading";
        })
        .addCase(retrieveExpensesHistory.fulfilled, (state, action)=>{
            state.status.expensesStatus = "succeeded";
            const[data,header] = action.payload;
            state.expensesHistory = data;
            state.paginationHeader = JSON.parse(header);
           
        })
        .addCase(retrieveExpensesHistory.rejected, (state, action)=>{
            state.status.expensesStatus = "failed";
            state.error = action.error.message
        })

        .addCase(retrieveSaleHistory.pending, (state, action)=>{
            state.status.saleStatus = "loading";
        })
        .addCase(retrieveSaleHistory.fulfilled, (state, action)=>{
            state.status.saleStatus = "succeeded";
            const[data,header] = action.payload;
            state.saleHistory = data;
            state.paginationHeader = JSON.parse(header);
           
        })
        .addCase(retrieveSaleHistory.rejected, (state, action)=>{
            state.status.saleStatus = "failed";
            state.error = action.error.message
        })

        .addCase(retrieveDamageHistory.pending, (state, action)=>{
            state.status.damageStatus = "loading";
        })
        .addCase(retrieveDamageHistory.fulfilled, (state, action)=>{
            state.status.damageStatus = "succeeded";
            const[data,header] = action.payload;
            state.damageHistory = data;
            state.paginationHeader = JSON.parse(header);
           
        })
        .addCase(retrieveDamageHistory.rejected, (state, action)=>{
            state.status.damageStatus = "failed";
            state.error = action.error.message
        })
    }
})

export const selectLineChartData =(state)=> state.dashboard.lineChartData;
export const selectBarChartData =(state)=> state.dashboard.barChartData;
export const selectSummaryData = (state)=> state.dashboard.summary;
export const getStatus = (state)=> state.dashboard.status;

export const getStoreId = (state)=>state.dashboard.selectedStore;
export const getDay = (state)=> state.dashboard.selectedDay;

export const selectExpensesHistory = (state)=>state.dashboard.expensesHistory;
export const getHeader = (state) => state.dashboard.paginationHeader;
export const getExpensesChart =(state) => state.dashboard.expensesChart

export const selectSaleHistory =(state) => state.dashboard.saleHistory;
export const getSaleChart = (state) => state.dashboard.saleChart;

export const selectDamageHistory = (state)=> state.dashboard.damageHistory;
export const getDamageChart=(state)=> state.dashboard.damageChart;

export const dashboardAction = dashboardSlice.actions;

export default dashboardSlice;