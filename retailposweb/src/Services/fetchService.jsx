import {GetProductUrl,GetCat, GetDetail,GetSaleEndPoint,
    ExpensesEndPoint,GetDamageEndPoint,CreateSaleEndPoint,CreateDamageEndPoint} from "../Constant/URL";
    function handleErrors(response) {
      if (!response.ok) {
          throw Error(response.statusText +" "+ response.status);
      }
      return response;
  }
  
  export const fetchProduct = (page = 1)=>{
      return new Promise((resolve, reject)=>{

               fetch(GetProductUrl+"?PageNumber="+page+"&Type=GETALL&PageSize=20",{
                method:"GET",
                headers:{   
                  'Accept': '*/*',
                }
              }).then(handleErrors)
              .then(res => res.json().then(json => ({
                header:JSON.parse(res.headers.get("x-pagination")),
                json
              }))).then(({header, json}) =>{
                  resolve([header,json]);
              }).catch(error => reject(error));;
           
      })
  }
  
  export const fetchByName = (searchValue,filterPageName=1)=>{
    return new Promise((resolve, reject)=>{
      try{
        fetch(GetProductUrl+"?ItemName="+searchValue+"&PageNumber="+filterPageName+"&Type=FILTERBYNAME&PageSize=20",{
          method:"GET",
          headers:{
            'Accept': '*/*',
          }
        })
        .then(res => res.json().then(json => ({
          header:JSON.parse(res.headers.get("x-pagination")),
          json
        }))).then(({header, json}) =>{
            resolve([header,json]);
        });
      }catch(ex){
        reject(ex)
      }
    })
  }
  
  export const fetchByCat = (catId,filterPageCat)=>{
    return new Promise((resolve,reject)=>{
      try{
        fetch(GetProductUrl+"?CatId="+catId+"&PageNumber="+filterPageCat+"&Type=FILTERBYCAT&PageSize=20",{
          method:"GET",
          headers:{
            'Accept': '*/*',
          }
        })
        .then(res => res.json().then(json => ({
          header:JSON.parse(res.headers.get("x-pagination")),
          json
        }))).then(({header, json}) =>{
            resolve([header,json]);
        });
      }catch(ex){
        reject(ex);
      }
    })
  }
  
  export const fetchCategory=()=>{
    return new Promise((resolve, reject)=>{
      try{
        fetch(GetCat).then(res => res.json().then(json => ({
          json
        }))).then(({json}) =>{
            resolve(json);
        });
      }catch(ex){
        reject(ex);
      }
    })
  }
  
  
  //SALE - START
  
  export const fetchSaleByDay=(day,filterPageDay,token)=>{
    return new Promise((resolve, reject)=>{
      try{
        fetch(GetSaleEndPoint+"?Day="+day+"&PageNumber="+filterPageDay+"&Type=FILTERBYDAY&PageSize=10",{
          method:"GET",
          headers:{
            'Authorization': 'Bearer '+token,
            'Accept': '*/*',
          }
        }).then(res => res.json().then(json => ({
          header:JSON.parse(res.headers.get("x-pagination")),
          json
        }))).then(({header, json}) =>{
            resolve([header,json]);
        });
      }catch(ex){
        reject(ex);
      }
    })
  }
  
  
  export const fetchSaleByDate=(date,filterPageDate,token)=>{
    return new Promise((resolve, reject)=>{
      try{
        fetch(GetSaleEndPoint+"?DateTime="+date+"&PageNumber="+filterPageDate+"&Type=FILTERBYDATE&PageSize=10",{
          method:"GET",
          headers:{
            'Authorization': 'Bearer '+token,
            'Accept': '*/*',
          }
        }).then(res => res.json().then(json => ({
          header:JSON.parse(res.headers.get("x-pagination")),
          json
        }))).then(({header, json}) =>{
            resolve([header,json]);
        });
      }catch(ex){
        reject(ex)
      }
    })
  }
  
  //POST
  export const postSale=(product,token)=>{
    return new Promise((resolve, reject)=>{
      try{
        fetch(CreateSaleEndPoint,{
          method:"POST",
          headers:{
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
          body:JSON.stringify(product)
        }).then(res =>{
           resolve(res.status)});
      }catch(ex){
        reject(ex)
      }
    })
  }
  
  //SALE -END
  
  
  //EXPENSES START
  
  export const fetchExpensesByDay=(day,filterPageDay,token)=>{
    return new Promise((resolve, reject)=>{
      try{
        fetch(ExpensesEndPoint+"?Day="+day+"&PageNumber="+filterPageDay+"&Type=FILTERBYDAY&PageSize=10",{
          method:"GET",
          headers:{
            'Authorization': 'Bearer '+token,
            'Accept': '*/*',
          }
        }).then(res => res.json().then(json => ({
          header:JSON.parse(res.headers.get("x-pagination")),
          json
        }))).then(({header, json}) =>{
            resolve([header,json]);
        });
      }catch(ex){
        reject(ex)
      }
    })
  }
  
  
  export const fetchExpensesByDate=(date,filterPageDate,token)=>{
    return new Promise((resolve, reject)=>{
      try{
        fetch(ExpensesEndPoint+"?DateTime="+date+"&PageNumber="+filterPageDate+"&Type=FILTERBYDATE&PageSize=10",{
          method:"GET",
          headers:{
            'Authorization': 'Bearer '+token,
            'Accept': '*/*',
          }
        }).then(res => res.json().then(json => ({
          header:JSON.parse(res.headers.get("x-pagination")),
          json
        }))).then(({header, json}) =>{
            resolve([header,json]);
        });
      }catch(ex){
        reject(ex)
      }
    })
  }
  
  //POST 
  
  export const postExpenses=(token,expenses)=>{
    return new Promise((resolve, reject)=>{
      try{
        fetch(ExpensesEndPoint,{
          method:"POST",
          headers:{
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
          body:JSON.stringify(expenses)
        }).then(res =>{
           resolve(res.status)});
      }catch(ex){
        reject(ex)
      }
    })
  }
  //EXPENSES -END
  
  //DAMAGE -START
  
  export const fetchDamageByDay=(day,filterPageDay,token)=>{
    return new Promise((resolve, reject)=>{
      try{
        fetch(GetDamageEndPoint+"?Day="+day+"&PageNumber="+filterPageDay+"&Type=FILTERBYDAY&PageSize=10",{
          method:"GET",
          headers:{
            'Authorization': 'Bearer '+token,
            'Accept': '*/*',
          }
        }).then(res => res.json().then(json => ({
          header:JSON.parse(res.headers.get("x-pagination")),
          json
        }))).then(({header, json}) =>{
            resolve([header,json]);
        });
      }catch(ex){
        reject(ex)
      }
    })
  }
  
  export const fetchDamageByDate=(date,filterPageDate,token)=>{
    return new Promise((resolve, reject)=>{
      try{
        fetch(GetDamageEndPoint+"?DateTime="+date+"&PageNumber="+filterPageDate+"&Type=FILTERBYDATE&PageSize=10",{
          method:"GET",
          headers:{
            'Authorization': 'Bearer '+token,
            'Accept': '*/*',
          }
        }).then(res => res.json().then(json => ({
          header:JSON.parse(res.headers.get("x-pagination")),
          json
        }))).then(({header, json}) =>{
            resolve([header,json]);
        });
      }catch(ex){
        reject(ex)
      }
    })
  }
  
  export const postDamage = (damage,token)=>{
    return new Promise((resolve, reject)=>{
      try{
        fetch(CreateDamageEndPoint,{
          method:"POST",
          headers:{
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
          body:JSON.stringify(damage)
        }).then(res =>{;
           resolve(res.status)});
      }catch(ex){
        reject(ex)
      }
    })
  }
  //DAMAGE END 
  
  //DETAIL START
  
  export const fetchDetail =(id)=>{
    return new Promise((resolve,reject)=>{
      try{
        fetch(GetDetail+""+id,{
          method:"GET",
          headers:{
            'Accept': '*/*',
          }
        })
        .then(res => res.json().then(json => ({
          json
        }))).then(({json}) =>{
            resolve(json);
        });
      }catch(ex){
        reject(ex);
      }
    })
  }