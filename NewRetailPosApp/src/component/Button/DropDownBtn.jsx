import React from 'react'
import { Text,View,Pressable } from 'react-native'
import textStyle from '../../styles/textStyle';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import buttonStyle from '../../styles/buttonStyle';

const DropDownBtn = (props) =>{
    return(
        <View>
              <Pressable style={buttonStyle.dateBtn} onPress = {props.onPress}>
              <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
                  <AntDesign name="calendar" size={25} color="black" margin={10} />
                  <Text style={textStyle.dateTxt}>{props.text}</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={25} color="black" stleic/>
                  </View>
              </Pressable>  
        </View>
    )
}

export default DropDownBtn;