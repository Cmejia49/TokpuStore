import axios from "axios";
import { loginEndPoint,authEndpoint, registerEndPoint } from "../Constant/endPoint";
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

export const register = (token,req)=>{
    const res = axios.post(registerEndPoint,req,{
        headers: {
            "Content-Type": "application/json-patch+json",
            "Authorization": `Bearer ${token}`
          },
        }).then((res)=>{
            return res;
        })

        return res;
    
}

export const fetchAllAccount =(token)=>{
    const res = axios.get(authEndpoint,{
        headers: {
            "Authorization": `Bearer ${token}`
          },
    }).then((res)=>{
        return res.data;
    })

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

export const deleteAccount =(token,id)=>{
    const res = axios.delete(authEndpoint+"/"+id,{
        headers: {
            "Authorization": `Bearer ${token}`
          },
    }).then((res)=>{
        return res;
    })

    return res;
}

export const putAccount = (token,id,body)=>{
    const res = axios.put(authEndpoint+"/"+id,body,{
        headers: {
            "Content-Type": "application/json-patch+json",
            "Authorization": `Bearer ${token}`
          },
    }).then((res) => {
         return res;
       });
       return res;
}