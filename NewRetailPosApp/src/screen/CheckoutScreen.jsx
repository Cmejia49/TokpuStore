import React from "react";
import { View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    TouchableOpacity, 
    ActivityIndicator } from 'react-native';
import textStyle from "../styles/textStyle";
import containerStyle from "../styles/containerStyle";
import textInputStyle from "../styles/textInputStyle";
import buttonStyle from "../styles/buttonStyle";
import moment from 'moment';
import ModalMsg from "../component/Modal/ModalMsg";
import { useDispatch , useSelector} from 'react-redux'
import { cartAction, getAmt, getChange, getItemList, getTotal, getTotalQuantity } from "../store/cart-slice";
import { createSale,getStatus } from "../store/sale-slice";
import { getToken } from "../store/auth-slice";
const CheckoutScreen = ({navigation}) =>{
    const dispatch = useDispatch();
    const change = useSelector(getChange)
    const total = useSelector(getTotal)
    const itemNum = useSelector(getTotalQuantity)
    const amt = useSelector(getAmt)
    const date =  moment().format('MM/DD/YYYY')
    const itemList = useSelector(getItemList);
    const token = useSelector(getToken);
    const status = useSelector(getStatus);
    const [show,setShow] = React.useState(false)
   const handleCheckout = ()=>{
    dispatch(createSale({data:itemList, token:token}))
    setShow(true)
   }
   const exactPress = ()=>{
    dispatch(cartAction.getChange(total))
   } 
   const msghHandle = ()=>{
    setShow(!show)
    dispatch(cartAction.reset());
    navigation.navigate("Home");
    
   }

  return(
      <View style={{flex:1,  backgroundColor: '#F0F0F0',}}>
        {status === "succeded" ? (
                 <ModalMsg
                 icon={"ios-checkmark-outline"}
                 message={"Success"}
                 visible={show} 
                 onPress={()=>msghHandle()}
                />
        ):(<ActivityIndicator animating={show} size="large" />)}
           <View style={{flex:1, margin:20}}>
                <View style={containerStyle.dateContainer}>
                    <Text style={textStyle.dateTxt}>Date: {date}</Text>
                </View>
                <View style={containerStyle.middleContainer}>
                    <Text style={styles.txt}>Number of Item: {itemNum}</Text>
                    <Text style={textStyle.dateTxt}>Total Payment: {total}</Text>
                    <TextInput 
                           keyboardType='numeric'
                        placeholder='AMOUNT RECEIVE'
                        value={amt}
                        onChangeText={x => dispatch(cartAction.getChange(x))}
                        style={textInputStyle.inputTxt}
                    />
                </View>
            <View style={styles.containerBtn}>
                <TouchableOpacity onPress={()=>{exactPress()}} style={buttonStyle.defBtn}>
                    <Text style={textStyle.buttonTxT}>EXACT AMOUNT</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={containerStyle.cartFooterContainer}>
            <View style={{flex:1}}backgroundColor={'#FFFFFF'}>
                <Text style={textStyle.footerTxtBlack}>{change}</Text>
            </View> 
            <TouchableOpacity onPress={()=>{handleCheckout()}} style={buttonStyle.cartFooterBtn}>
                    <Text style={textStyle.footerTxtWhite}>Checkout</Text>
            </TouchableOpacity>
        </View>
        
      </View>
  )   
 }
 
const styles = StyleSheet.create({
  containerBtn: {
    flex:1,
    marginTop:20,
  shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height:4,
  },
  shadowOpacity:1,
  shadowRadius:4,
  elevation:24, 
  },
  txt:{
    marginTop:10,
    fontWeight:'bold',
    fontSize:18,
    fontFamily:'Roboto', 
    marginLeft:10, 
    lineHeight:17
  }
});

 export default CheckoutScreen;

 /** //Succes
  *    <SuccessMessage 
        message={"Successful"}
        visible={modalVisible} 
        onPress={confirmSuccesEvent}/>
  */