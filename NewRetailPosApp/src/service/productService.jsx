import axios from "axios";
import {getItemEndPoint,getCatEndPoint,postItemEndPoint} from "../constant/endpoint.jsx";

export const fetchProduct =(page=1)=>{
    
    const res = axios.get(getItemEndPoint+"?PageNumber="+page+"&Type=GETALL&PageSize=20")
    .then((response) => {
        return ([response.data,response.headers["x-pagination"]]);
    });

    return res;
}

export const fetchByName =(searchValue,page=1)=>{
    
    const res = axios.get(getItemEndPoint+"?ItemName="+searchValue+"&PageNumber="+page+"&Type=FILTERBYNAME&PageSize=20")
    .then((response) => {

       
        return ([response.data,response.headers["x-pagination"]]);
    });

    return res;
}

export const fetchByCat =(catId,page=1)=>{
    
    const res = axios.get(getItemEndPoint+"?CatId="+catId+"&PageNumber="+page+"&Type=FILTERBYCAT&PageSize=20")
    .then((response) => {
       
        return ([response.data,response.headers["x-pagination"]]);
    });

    return res;
}

export const fetchCategory =()=>{
    
    const res = axios.get(getCatEndPoint)
    .then((response) => {     
        return (response.data);
    });
    return res;
}

export const fetchById=(id)=>{
    const res = axios.get(postItemEndPoint+"/"+id)
    .then((res)=>{
        return (res.data);
    })

    return res;
}
