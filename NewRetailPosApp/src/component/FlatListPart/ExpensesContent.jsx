import React from'react'
import {View,Text} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import containerStyle from '../../styles/containerStyle'
import textStyle from '../../styles/textStyle'
import { useDispatch } from 'react-redux'
import { expensesAction } from '../../store/expenses-slice'
const ExpensesContent = ({item}) =>{
   
    
    const dispatch = useDispatch();
    React.useEffect(()=>{
        dispatch(expensesAction.getTotal(item.value))
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
                fontWeight:'400'}}>{item.detail}</Text>
          </View>
        <View style={{
            flex:1.2,
            flexWrap:'wrap',
            flexDirection:'row',
            alignItems: 'flex-start',
            justifyContent:'space-evenly',
        }}>
            <Text adjustsFontSizeToFit={true} style={textStyle.flatlistTxt}>{item.value}</Text>
            <Text adjustsFontSizeToFit={true} style={textStyle.flatlistTxt}>{item.createDate}</Text>
    
        </View>
        </View>
        </TouchableWithoutFeedback>
    )
}
export default ExpensesContent;