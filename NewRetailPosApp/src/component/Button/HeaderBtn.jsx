import React from 'react'
import { AntDesign } from '@expo/vector-icons'; 
//shoppingcart
const HeaderBtn = ({
    name,
    onPress,
    children
})=>{
    return(
        <AntDesign.Button name={name}
        borderWidth={1} 
        size={24} 
        backgroundColor = "#FFFFFF" 
        color="black"
        iconStyle={
        {marginRight: 0,}
        } 
        onPress={onPress}
        >
            {children}
        </AntDesign.Button>
    )  
}

export default HeaderBtn;