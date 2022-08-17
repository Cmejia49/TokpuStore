import React from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import containerStyle from '../styles/containerStyle';
import textStyle from '../styles/textStyle';
import buttonStyle from '../styles/buttonStyle';
import CartCard from '../component/Card/CartCard';
import { cartAction,getItemList,getTotal,getTotalQuantity } from '../store/cart-slice';


const CartScreen = ({navigation})=>{

    const dispatch = useDispatch();
    const itemList = useSelector(getItemList);
    const total = useSelector(getTotal);
     React.useMemo(() =>{ dispatch(cartAction.getTotal())}, [itemList]);
    const increment = (id) =>{
        dispatch(cartAction.increment(id))
    }
    const decrement = (id) =>{
        dispatch(cartAction.decrement(id))
    }
    const deletePress = (id) =>{
        dispatch(cartAction.removeFromCart(id))
    }
    const navCheckout = () =>{
        navigation.navigate('Checkout')
      }
 return(
    <View style={{flex:1}}>
      <View style={containerStyle.ProductContainer}>
        <FlatList contentContainerStyle={{ alignItems:'center'}} 
            showsVerticalScrollIndicator={false}
            data={itemList}
            keyExtractor={({ id }, index) => id}  
            renderItem={({item,index}) =>  
                        <CartCard
                        data={item}
                        increment={()=>{increment(item.id)}}
                        decrement={()=>{decrement(item.id)}}
                        deletePress={()=>{deletePress(item.id)}}
                        />
                    } 
        />
      </View>
      <View style={containerStyle.cartFooterContainer}>
            <View style={{flex:1}} backgroundColor={'#FFFFFF'}>
                <Text style={textStyle.footerTxtBlack}>{total}</Text>
            </View> 
                <TouchableOpacity onPress={()=>{navCheckout()}} style={buttonStyle.cartFooterBtn}>
                    <Text style={textStyle.footerTxtWhite}>proceed</Text>
                </TouchableOpacity>
        </View>
    </View>
 )
}

export default CartScreen;