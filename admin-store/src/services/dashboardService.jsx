
import axios from "axios";
import { damageHistoryEndpoint, dashboardDamageEndPoint, dashboardExpensesEndPoint, dashboardSaleEndPoint, dashboardSummaryEndPoint, expensesHistoryEndpoint, saleHistoryEndpoint } from "../Constant/endPoint";

export const fethSaleSummary = (option,branch,token)=>{
    const res = axios.get(dashboardSaleEndPoint+"?filter="+option+"&id="+branch,{
        headers: {
            "Authorization": `Bearer ${token}`
          },
    }).then((res)=>{
    return res.data;
    })

    return res;
}

export const fetchDamageSummary = (option,branch,token)=>{
    const res = axios.get(dashboardDamageEndPoint+"?filter="+option+"&id="+branch,{
        headers: {
            "Authorization": `Bearer ${token}`
          },
    }).then((res)=>{
    return res.data;
    })

    return res;
}

export const fetchExpensesSummary = (option,branch,token)=>{
    const res = axios.get(dashboardExpensesEndPoint+"?filter="+option+"&id="+branch,{
        headers: {
            "Authorization": `Bearer ${token}`
          },
    }).then((res)=>{
    return res.data;
    })

    return res;
}

export const fetchSummary = (option,branch,token)=>{
    const res = axios.get(dashboardSummaryEndPoint+"?filter="+option+"&id="+branch,{
        headers: {
            "Authorization": `Bearer ${token}`
          },
    }).then((res)=>{
        return res.data;
    })

    return res;
}

export const fetchExpensesHistory = (option,id,token,pageSize,type,pageNumber)=>{
    const res = axios.get(expensesHistoryEndpoint+"?Day="+option+"&id="+id+"&PageNumber="+pageNumber+"&Type="+type+"&PageSize="+pageSize,{
        headers: {
            "Authorization": `Bearer ${token}`
          },
    }).then((res)=>{
        return ([res.data,res.headers["x-pagination"]]);
    });
    return res;
}

export const fetchSaleHistory = (option,id,token,pageSize,type,pageNumber)=>{
    const res = axios.get(saleHistoryEndpoint+"?Day="+option+"&id="+id+"&PageNumber="+pageNumber+"&Type="+type+"&PageSize="+pageSize,{
        headers: {
            "Authorization": `Bearer ${token}`
          },
    }).then((res)=>{
        return ([res.data,res.headers["x-pagination"]]);
    });
    return res;
}

export const fetchDamageHistory = (option,id,token,pageSize,type,pageNumber)=>{
    const res = axios.get(damageHistoryEndpoint+"?Day="+option+"&id="+id+"&PageNumber="+pageNumber+"&Type="+type+"&PageSize="+pageSize,{
        headers: {
            "Authorization": `Bearer ${token}`
          },
    }).then((res)=>{
        return ([res.data,res.headers["x-pagination"]]);
    });
    return res;
}
