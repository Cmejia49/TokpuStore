import React from 'react';
import HeaderBtn from '../Button/HeaderBtn';
import { View, Text } from 'react-native';
import {useSelector} from 'react-redux'
import { getTotalQuantity } from '../../store/cart-slice';
const MainHeader = React.memo(({cartPress,searchPress})=>{
    const quantity = useSelector(getTotalQuantity);
    return(
        <>  
       <View style={{flexDirection:'row'}}>
        <View style={{ marginRight:10}}>
            <HeaderBtn
                name={"shoppingcart"}
                onPress={cartPress}>
                    <Text style={{  fontWeight: 'bold', fontSize:18}}>{quantity}</Text>
            </HeaderBtn>
        </View>
        <View>
            <HeaderBtn
                name={"search1"}
                onPress={searchPress}>
            </HeaderBtn>
        </View>
   
      </View>  
        </>
    )
})


export default MainHeader;