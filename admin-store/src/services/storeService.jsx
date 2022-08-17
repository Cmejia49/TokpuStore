import axios from "axios";
import {getStoreEndPoint} from "../Constant/endPoint";


export const fetchStore =(token)=>{
    const res = axios.get(getStoreEndPoint,{
        headers: {
            'Authorization': `Bearer ${token}`
          }
    })
    .then((response) => {
       
        return response.data;
    });

    return res;
}

export const fetchStoreById = (token,id) =>{
    const res = axios.get(getStoreEndPoint + "/"+id,{
        headers: {
            'Authorization': `Bearer ${token}`
          }
    })
    .then((response) => {
       
        return response.data;
    });
    console.log(res);
    return res;
}

export const postStore = (token,text)=>{
    const res = axios.post(getStoreEndPoint,text,{
        headers: {
            "Content-Type": "application/json-patch+json",
            "Authorization": `Bearer ${token}`
          },
    }).then((res) => {
        return res;
      });
      
    return res;
}


export const deleteStore = (token,id)=>{
    const res = axios.delete(getStoreEndPoint +"/"+id ,{
        headers: {
            "Authorization": `Bearer ${token}`
          },
    }).then((res) => {
        return res;
      });
      
    return res;
}

export const updateStore = (token,id,text)=>{
    const res = axios.put(getStoreEndPoint +"/"+id ,text,{
        headers: {
            "Content-Type": "application/json-patch+json",
            "Authorization": `Bearer ${token}`
          },
    }).then((res) => {
        return res;
      });
      
    return res;
}