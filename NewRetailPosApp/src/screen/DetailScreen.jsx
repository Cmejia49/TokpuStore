import React from 'react';
import {Pressable, TouchableOpacity,View,Text,Image,StyleSheet,Dimensions,ScrollView, ActivityIndicator} from 'react-native';
import QuantityBtn from '../component/Button/QuantityBtn';
import { useDispatch,useSelector } from 'react-redux'
import {getValue,detailAction, getStock,getIndex1,getIndex2, retrieveDetail,selectDetail,getDetailStatus, getPrice } from "../store/detail-slice.jsx"
import VariationBtn from "../component/Button/VariationBtn";
import SubBtn from "../component/Button/SubBtn";
import ModalMsg from '../component/Modal/ModalMsg';
import containerStyle from '../styles/containerStyle'
import textStyle from '../styles/textStyle'
import buttonStyle from '../styles/buttonStyle'
import InputModalMsg from '../component/Modal/InputModalMsg';
import { cartAction } from '../store/cart-slice';
import { createDamage, getStatus } from '../store/damage-slice';
import { getToken } from '../store/auth-slice';
import LoadingModal from '../component/Modal/LoadingModal';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const DetailScreen = ({navigation,route}) =>{
    const dispatch = useDispatch();
    const dmgStatus = useSelector(getStatus);
    const stock = useSelector(getStock)
    const item = useSelector(selectDetail)
    const status = useSelector(getDetailStatus)
    const index1 = useSelector(getIndex1);
    const index2 = useSelector(getIndex2);
    const value = useSelector(getValue);
    const price = useSelector(getPrice);
    const token = useSelector(getToken);
    const [cartMessage,setCartMessage] = React.useState(false);
    const [damageMessage,setDamageMessage] = React.useState(false);
    const [failed, setFailed] = React.useState(false)

    React.useEffect(()=>{
        const id = route.params.paramKey;
 
        if(status === "idle"){
        dispatch(retrieveDetail(id))
        }
        return(()=>{dispatch(detailAction.reset())})
    },[])
    React.useEffect(()=>{
        if(status === "succeeded" ){
        dispatch(detailAction.updateStock())
        }
    },[dispatch,index1,index2,status])

    const decrement = ()=>{
        dispatch(detailAction.decrement())
    }
    const increment = ()=>{
        dispatch(detailAction.increment())
    }
            
    const addToCart = () =>{
     if(validate()){
        setCartMessage(true)
        setFailed(false)
        return
     }
     setFailed(true)

    }
    const addToDamage = ()=>{
        if(validate()){
            const damage ={
                ProductName:item.itemName+"/"+stock[0].stockIndex,
                ItemPrice:converter(stock[0].itemCode),
                Quantity:value,
                stockFid:stock[0].stockId,
                token:token
            }
            dispatch(createDamage({data:damage,token:token}))
            setDamageMessage(!damageMessage)
            setFailed(false)
            return
        }
        setFailed(true);
    }
    const validate = ()=>{
        if(item.variantList.length === 1){
            if(index1 === "" || value === 0){
                return false
            }else{
                return true
            }
        }else if(item.variantList.length === 2){
             if(index1 === "" || index2 === "" || value === 0){
                return false
             }else{
                return true
             }
        }else{
            if(value === 0){
                return false
            }else{
                return true
            }
        }
    }

    const handleInput = ()=>{
        if(price === ""){
            setFailed(true)
        }else{
            const cart = {
                id:item.itemId,
                img:item.imageList.length > 0 ? item.imageList[0].imageSrc : undefined ,
                name:item.itemName,
                variation:stock[0].stockIndex,
                price:price,
                Quantity:value,
                itemCode:stock[0].itemCode,
                stock:stock[0].quantity,
                stockId:stock[0].stockId
            }
            dispatch(cartAction.addToCart(cart))
            navigation.navigate("Home");
            setCartMessage(!cartMessage);
        }
    }
    return(
        <>
        {status === "succeeded" ? (
        <View style={styles.container}>
            <LoadingModal visible={dmgStatus === 'loading' ? true:false}/>
            <ModalMsg
             icon={"ios-checkmark-outline"}
             message={"Succesful\nAdded to damage"}
             visible={dmgStatus === "succeded" ? damageMessage : false} 
             onPress={()=>
                {
                 setDamageMessage(!damageMessage);
                 navigation.navigate("Home");
                }}
            />
              <ModalMsg
             icon={"alert"}
             message={"Failed Input data correctly"}
             visible={failed} 
             onPress={()=>
                {
                 setFailed(!failed);
                }}
            />
            <InputModalMsg
              message={item.itemName+","+index1+","+index2}
              visible={cartMessage}
              onPress={()=>setCartMessage(!cartMessage)}
              navigate={()=>{handleInput()}}
            />
         <ScrollView
          showsVerticalScrollIndicator={false}>
          <View>
          <Image
                source={{uri:item.imageList.length > 0 ? item.imageList[0].imageSrc : undefined }}
                style={styles.image}
            />
         </View>
       <View style={containerStyle.detailContainer}>
        <View>
        <Text style={textStyle.detailNameTxt}>{item.itemName}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={textStyle.detailPriceTxt}>{stock.length > 0 ? stock[0].price : item.priceRange}</Text>
            <Text style={textStyle.detailPriceTxt}>{stock.length > 0 ? stock[0].itemCode : ""}</Text>
            </View>
        </View>
        {item.variantList.length > 0 ? (
            <>
        <View style={{marginHorizontal:7}}>
                <Text>{item.variantList[0].varietyName}</Text>
        </View>
        <View style={{flexDirection:'row',}}>
           <VariationBtn data={item.variantList[0].options}/>
        </View>
        </>
        ):(<></>)}
        {item.variantList.length > 1 ?(
            <>
        <View style={{marginHorizontal:7}}>
                <Text>{item.variantList[1].varietyName}</Text>
        </View>
        <View style={{flexDirection:'row',}}>
           <SubBtn data={item.variantList[1].options}/>
        </View>
        </>
        ):(<></>)}
        <View style={{marginHorizontal:7}}>
            <Text>Quantity</Text>
        </View>
        <View style={{marginHorizontal:7}}>
            <QuantityBtn
            increment={()=>{increment()}}
            decrement={()=>{decrement()}}
            value={value}
            stock={stock.length > 0 ? stock[0].quantity : stock}
            style={{width:20}} />
        </View>
        </View>
        </ScrollView>
        <View style={containerStyle.footerContainer}>    
            <View backgroundColor={"#FFF"} borderWidth={1}>
            <TouchableOpacity 
                onPress={()=>{addToDamage()}}
               style={buttonStyle.footerBtn}>
                     <Text style={{
                             color:"#000",
                             fontFamily:"Roboto",
                             fontSize:17, 
                             fontWeight:"400"
                             }}>Add to Damage</Text>
                         </TouchableOpacity>
                    </View>
                            
                    <View backgroundColor={"#000"}>
                          <TouchableOpacity
                           onPress={()=>{addToCart()}}
                           style={buttonStyle.footerBtn}>
                                <Text style={{
                             color:"#FFF",
                             fontFamily:"Roboto",
                             fontSize:17, 
                             fontWeight:"400"
                             }}>Add Cart</Text>
                          </TouchableOpacity>
                    </View>
          </View>
        </View>
        ):(   <View>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>)}
        </>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:10,
        marginTop:10,
    },


    image:{
        alignSelf:'center',
        resizeMode:'cover',
        width:screenWidth,
        height:218
    },
});
const converter =(str)=>{
    if(str == null){
        return 0;
    }
    let s = '';
    const shopCode = "SDANTEMOJI"
    for(let i = 0;i<str.length;i++)
    {
        for(let j =0;j<shopCode.length;j++)
        {
            if(str.charAt(i) == shopCode.charAt(j))
            {
             
                  s+=''+shopCode.indexOf(shopCode.charAt(j))
            }
        }
    }
    return s;
}
export default DetailScreen;