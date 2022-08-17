import axios from 'axios'
import { saleEndPoint } from "../constant/endpoint";

export const fetchSaleHistory = (day,id,token,type,pageNumber)=>{
    const res = axios.get(saleEndPoint+"?Day="+day+"&id="+id+"&PageNumber="+pageNumber+"&Type="+type+"&PageSize=20",{
        headers: {
            "Authorization": `Bearer ${token}`
          },
    }).then((res)=>{
        return ([res.data,res.headers["x-pagination"]]);
    });
    return res;
}

export const fetchSaleHistoryByDate = (date,id,token,type,pageNumber)=>{
  const res = axios.get(saleEndPoint+"?DateTime="+date+"&id="+id+"&PageNumber="+pageNumber+"&Type="+type+"&PageSize=20",{
      headers: {
          "Authorization": `Bearer ${token}`
        },
  }).then((res)=>{
      return ([res.data,res.headers["x-pagination"]]);
  });
  return res;
}


export const postSale = (data,token)=>{
    const res = axios.post(saleEndPoint, data, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      })
      .then((res) => {
        return res;
      });

      return res;
}