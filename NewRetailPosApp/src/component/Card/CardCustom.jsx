import * as React from 'react';
import { View,TouchableWithoutFeedback,Text,Image } from 'react-native';
import 'react-native-gesture-handler';
import containerStyle from '../../styles/containerStyle';
import imageStyle from '../../styles/imageStyle';
import textStyle from '../../styles/textStyle';
import ExpoFastImage from 'expo-fast-image'

const CardCustom = ({item,onPress}) =>{
    return(
        <TouchableWithoutFeedback onPress={onPress}>
        <View style={containerStyle.cardContainer}>
            <View  style={containerStyle.cardImgContainer}>
            <ExpoFastImage
                uri={item.imageList.length > 0 ? item.imageList[0].imageSrc : "" }
                cacheKey={item.itemId}
                style={imageStyle.cardImg}
            />
            </View>
            <View  style={containerStyle.cardInfoContainer}>
                <Text  adjustsFontSizeToFit={true}  style={textStyle.flatlistTxt}>{item.itemName}</Text>
                <Text  adjustsFontSizeToFit={true}  >{item.priceRange}</Text>
            </View>
        </View>
      </TouchableWithoutFeedback>
        )
}

export default CardCustom;