import { expensesEndPoint } from "../constant/endpoint";
import axios from 'axios'
export const fetchExpenses = (day,id,token,type,pageNumber)=>{
    const res = axios.get(expensesEndPoint+"?Day="+day+"&id="+id+"&PageNumber="+pageNumber+"&Type="+type+"&PageSize=20",{
        headers: {
            "Authorization": `Bearer ${token}`
          },
    }).then((res)=>{
        return ([res.data,res.headers["x-pagination"]]);
    });
    return res;
}

export const fetchExpensesByDate = (date,id,token,type,pageNumber)=>{
  const res = axios.get(expensesEndPoint+"?DateTime="+date+"&id="+id+"&PageNumber="+pageNumber+"&Type="+type+"&PageSize=20",{
      headers: {
          "Authorization": `Bearer ${token}`
        },
  }).then((res)=>{
      return ([res.data,res.headers["x-pagination"]]);
  });
  return res;
}

export const postExpenses = (data,token)=>{
    const res = axios.post(expensesEndPoint, data, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      })
      .then((res) => {
        return res;
      });

      return res;
}