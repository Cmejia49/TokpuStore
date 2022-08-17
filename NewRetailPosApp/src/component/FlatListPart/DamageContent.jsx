import React from'react'
import {View,Text} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { damageAction } from '../../store/damage-slice'
import containerStyle from '../../styles/containerStyle'
import textStyle from '../../styles/textStyle'
import { useDispatch } from 'react-redux'
const DamageContent = ({item}) =>{
   const dispatch = useDispatch();
    React.useEffect(()=>{
        const payload = {

            quantity:item.quantity,
            total:item.itemPrice*item.quantity
        }
        dispatch(damageAction.getTotal(payload))
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
            <Text adjustsFontSizeToFit={true} style={textStyle.flatlistTxt}>{item.itemPrice}</Text>
            <Text adjustsFontSizeToFit={true} style={textStyle.flatlistTxt}>{item.itemPrice * item.quantity}</Text>
    
        </View>
        </View>
        </TouchableWithoutFeedback>
    )
}
export default DamageContent;