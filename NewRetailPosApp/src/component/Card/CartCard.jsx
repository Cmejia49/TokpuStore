import React from 'react'
import {View,TouchableWithoutFeedback,Image,TouchableOpacity,Text} from 'react-native'
import containerStyle from '../../styles/containerStyle';
import imageStyle from '../../styles/imageStyle'
import textStyle from '../../styles/textStyle'
import QuantityBtn from '../Button/QuantityBtn'
import { AntDesign } from '@expo/vector-icons'; 

const CartCard = ({
    data,
    deletePress,
    increment,
    decrement,
}) =>{

    return(
        <TouchableWithoutFeedback>
        <View style={containerStyle.cartCardContainer}>
            <View>
              <Image source={{uri:data.img}} style={imageStyle.cartCardImg}/>
            </View>
            <View style={containerStyle.carCardInfoContainer}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={textStyle.itemNameTxt}>{data.name}</Text>
                    <TouchableOpacity
                        style={{marginRight:10, borderWidth:1}}
                        onPress={()=>{deletePress()}}>
                            <AntDesign name="close" size={18} color="black" />
                    </TouchableOpacity>
            </View>
            <Text style={textStyle.itemNameTxt}>{data.variationName}</Text>
            <Text style={textStyle.itemPriceTxt}>{data.price}</Text>
            <View>
            <QuantityBtn
            increment={()=>{increment()}}
            decrement={()=>{decrement()}}
            value={data.Quantity}
            stock={data.stock}
            style={{width:20}} />
            </View>
            <Text style={textStyle.itemPriceTxt}>{data.subTotal}</Text>
            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}

export default CartCard;