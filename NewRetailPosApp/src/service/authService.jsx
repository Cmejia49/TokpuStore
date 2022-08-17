import axios from "axios";
import { loginEndPoint,authEndpoint } from "../constant/endpoint";

export const login =async (req)=>{
    const res = await axios.post(loginEndPoint,req,{
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
    }).then((res) => {
        return res
    });
    return res;
}

export const fetchAccount = (token,id)=>{
    const res = axios.get(authEndpoint+"/Account/"+id,{
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
          },
    }).then((res)=>{
        return res.data;
    })

    return res;
}