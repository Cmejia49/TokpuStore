import { damageEndPoint } from "../constant/endpoint";
import axios from "axios";
export const fetchDamage = (day,id,token,type,pageNumber)=>{
    const res = axios.get(damageEndPoint+"?Day="+day+"&id="+id+"&PageNumber="+pageNumber+"&Type="+type+"&PageSize=20",{
        headers: {
            "Authorization": `Bearer ${token}`
          },
    }).then((res)=>{
        return ([res.data,res.headers["x-pagination"]]);
    });
    return res;
}

export const fetchDamageByDate = (date,id,token,type,pageNumber)=>{
  const res = axios.get(damageEndPoint+"?DateTime="+date+"&id="+id+"&PageNumber="+pageNumber+"&Type="+type+"&PageSize=20",{
      headers: {
          "Authorization": `Bearer ${token}`
        },
  }).then((res)=>{
      return ([res.data,res.headers["x-pagination"]]);
  });
  return res;
}

export const postDamage = (data,token)=>{
    const res = axios.post(damageEndPoint, data, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      })
      .then((res) => {
        return res;
      });

      return res;
}