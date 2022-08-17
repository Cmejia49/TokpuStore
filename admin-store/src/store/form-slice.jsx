import { createSlice } from "@reduxjs/toolkit";


const initialState={  
    VariantList:[
    ],
    StockList:[],
    img:[],
    itemName:'',
    priceRange:'',
    description:'',
    cat:'',
    status:'single',
    storeName:'',
    userFid:0,
    username:"",
    password:"",
    role:"",
}


const formSlice = createSlice({
    name:'form',
    initialState,
    reducers:{
        addVariantValue(state,action){

            const {index, id ,value} = action.payload;

            state.VariantList[index].options =  state.VariantList[index].options.concat({optionID:id, optionName:value});
   
        },
        addStock(state,action){



            let t=[];
            let id = 1;
            //validating 
            if(state.VariantList.length > 1){
                if( state.VariantList[0].varietyName !== "" &&
                    state.VariantList[1].varietyName !== ""){
                    action.payload.forEach((s1,s)=>{
                    state.VariantList[0].options.forEach((o1, i)=>{
                        state.VariantList[1].options.forEach((o2, j)=>{
                            if(o1.optionName !== "" && o2.optionName !==""){
                                t =  t.concat({
                                    stockId:id,
                                    storeFid:s1.storeId,
                                    quantity:0,
                                    price:0,
                                    itemCode:'',
                                    stockIndex:o1.optionName +"/"+o2.optionName,    
                                })
                                id++;
                                state.status = "success";
                            }else{
                                state.status = "failed";
                            }
                        })
                    })
                })
                }else{
                    state.status = "failed";
                }
            }else if(state.VariantList.length === 1){
                if(state.VariantList[0].varietyName !== ""){
                    action.payload.forEach((s1,s)=>{
                    state.VariantList[0].options.forEach((o1,i)=>{
                        if(o1.optionName !== ""){
                            t = t.concat({
                                stockId:id,
                                storeFid:s1.storeId,
                                quantity:0,
                                price:0,
                                itemCode:'',
                                stockIndex:o1.optionName
                            })
                            id++
                            state.status = "success";
                        }else{
                            state.status = "failed";
                        }
                    })
                })
                }else{
                    state.status = "failed";
                }
            }else{
                action.payload.forEach((s1,s)=>{
                    t = t.concat({
                        stockId:id,
                        storeFid:s1.storeId,
                        quantity:0,
                        price:0,
                        itemCode:'',
                        stockIndex:state.itemName 
                    })
                    id++
                })
                state.status = "single";
            }

            state.StockList = t;

        },
        onChangeVariantValue(state,action){
            const index = action.payload.index;
           
            state.VariantList[index].options.forEach((options,i)=>{
              
                if(options.optionID === action.payload.id){
                    state.VariantList[index].options[i].optionName = action.payload.value;
                }
            })

    

        },
        removeVariantValue(state,action){
            const index = action.payload.index;
            state.VariantList[index].options =state.VariantList[index].options.filter(i=>i.optionID !== action.payload.id);
            
        },

        addVariantGrp(state,action){
            state.VariantList = state.VariantList.concat(action.payload);

    
        },
        onChangeVariantGrp(state,action){
          state.VariantList.forEach((VariantList,index)=>{
              
                if(VariantList.varietyId === action.payload.id){
                    state.VariantList[index].varietyName = action.payload.value;
                }
            })

        },
        removeVariantGrp(state,action){

            if(action.payload === 0){
                state.VariantList = [];
            }
            if(state.VariantList.length > 1){
            state.VariantList = state.VariantList.filter(i=>i.varietyId !== action.payload);
            }
        },

        addImg(state,action){
            state.img = state.img.concat(action.payload);

        },
        removeImg(state,action){
            const newImg = state.img.filter(i=>i.imageId !== action.payload);
            state.img = newImg;

        },

        onChangeItemName(state,action){
            state.itemName = action.payload;
           
        },
        onChangeDescription(state,action){
            state.description = action.payload;
          
        },
        onChangePriceRange(state, action){
            state.priceRange = action.payload;
       
        },
        onChangeQuantity(state,action){

            state.StockList.forEach((stock,index)=>{
              
                if(stock.stockId === action.payload.id){
                    state.StockList[index].quantity = action.payload.value;
                }
            })

 
        },
        onChangePrice(state,action){
           
            state.StockList.forEach((stock,index)=>{
              
                if(stock.stockId === action.payload.id){
                    state.StockList[index].price = action.payload.value;
                }
            })
  
        },
        onChangeCost(state,action){
           

            state.StockList.forEach((stock,index)=>{
              
                if(stock.stockId === action.payload.id){
                    state.StockList[index].itemCode = action.payload.value;
                }
            })
  
        },

        onChangeStoreName(state,action){
            state.storeName = action.payload;
        },
        onChangeUseFid(state,action){
            state.userFid = action.payload;
        },
        setStatus(state,action){
            state.status =action.payload;
        },
        setCat(state,action){
            state.cat = action.payload;
  
        },

        onChangeUsername(state,action){
            state.username = action.payload;
        },
        onChangePassword(state,action){
            state.password = action.payload;
        },
        onChangeRole(state,action){
            state.role = action.payload;
        },


        setForm(state,action){
          const detail =  action.payload;
            state.itemName  = detail.itemName;
            state.description = detail.description;
            state.priceRange = detail.priceRange;
            state.VariantList = detail.variantList;
            state.StockList = detail.stockList;
            state.img = detail.imageList;
            state.cat = detail.categories;
            console.log(action.payload)
        },
        setStoreForm(state,action){
            const store =action.payload;
            console.log(action.payload);
            state.storeName = store.storeName;
            if(store.user !== null){
                state.userFid = store.user.id;
            }  
        },

        setAccountForm(state,action){
            const user =action.payload;
            state.username = user.userName;
            state.role = user.role;
        },
        
        resetVariantList(state){
            state.VariantList = []
        },
        reset: () => initialState
    },

})

export const getVariantList = (state)=>state.form.VariantList;
export const getItemName = (state) => state.form.itemName;
export const getDescription = (state) => state.form.description;
export const getPriceRange =(state) => state.form.priceRange;
export const getImg = (state)=>state.form.img;
export const getStockList = (state)=> state.form.StockList;
export const getStatus = (state) => state.form.status;
export const getCat = (state) => state.form.cat;
export const getUsername = (state) => state.form.username;
export const getRole = (state) => state.form.role;
export const getPassword = (state) => state.form.password;
export const getUserFid = (state) => state.form.userFid;
export const getStoreName = (state) => state.form.storeName;
export const formAction = formSlice.actions;
export default formSlice;