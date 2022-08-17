import React from'react'
import {View,Text} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { saleAction } from '../../store/sale-slice'
import containerStyle from '../../styles/containerStyle'
import textStyle from '../../styles/textStyle'
const ContentFlatlist = ({item}) =>{
    const dispatch = useDispatch();
    
  const cost = React.useMemo(() => converter(item.itemCode), [item]);
  
  React.useEffect(()=>{
        const payload = {
            cost:cost*1,
            quantity:item.quantity,
            price:item.price,
            margin:(item.price * item.quantity - cost*item.quantity),
            total:item.price*item.quantity
        }
        dispatch(saleAction.getTotal(payload))
    },[])
    return(
        <TouchableWithoutFeedback>
        <View style={containerStyle.flContentContainer}>
                <View style={{flex:1, flexWrap:'wrap',}}>
                <Text   
                 numberOfLines={2}
    adjustsFontSizeToFit style={{marginLeft:10,
    fontSize:16,
    fontFamily:'Roboto',
    fontWeight:'400'}}>{item.productName}</Text>
          </View>
        <View style={{
            flex:1.2,
            flexWrap:'wrap',
            flexDirection:'row',
            alignItems: 'flex-start',
            justifyContent:'space-evenly',
        }}>
            <Text adjustsFontSizeToFit={true} style={textStyle.flatlistTxt}>{item.quantity}</Text>
            <Text adjustsFontSizeToFit={true} style={textStyle.flatlistTxt}>{item.price}</Text>
            <Text adjustsFontSizeToFit={true} style={textStyle.flatlistTxt}>{item.price*item.quantity}</Text>
            <Text adjustsFontSizeToFit={true} style={textStyle.flatlistTxt}>{cost}</Text>
            <Text adjustsFontSizeToFit={true} style={textStyle.flatlistTxt}>{(item.price * item.quantity -cost*item.quantity)}</Text>
    
        </View>
        </View>
        </TouchableWithoutFeedback>
    )
}
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
export default ContentFlatlist;