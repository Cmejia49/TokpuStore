import React from "react";
import { View,Text,Pressable } from "react-native";
import buttonStyle from "../../styles/buttonStyle";
import { useDispatch, useSelector } from "react-redux";
import { detailAction, getStock, getValue } from "../../store/detail-slice";
const QuantityBtn = ({stock,value,decrement,increment}) =>{


    return(
        
        <View style={{flexDirection:'row', paddingBottom:10}}>
            <Pressable
              onPress={()=>decrement()}
             style={buttonStyle.minusBtn}>
                <Text>-</Text>
            </Pressable>
            <Text style={{paddingHorizontal:25,borderWidth:1, textAlignVertical:'center'}}>{value}</Text>
            <Pressable
            onPress={()=>increment()}
            style={buttonStyle.addBtn}>
                <Text>+</Text>
            </Pressable>
            <View style={{flexDirection:'row', margin:5,alignItems:'flex-end'}}
                    textAlignVertical={'bottom'}
                    >
            <Text>Stock:{stock}</Text>
            </View>
        </View>
    )
}

export default QuantityBtn;