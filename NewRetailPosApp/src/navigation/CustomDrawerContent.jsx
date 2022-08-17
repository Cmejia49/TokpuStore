
import { useNavigation } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'; 

import { useDispatch } from 'react-redux';
import { authAction } from '../store/auth-slice';
import { productAction } from '../store/product-slice';
import * as SecureStore from 'expo-secure-store';
import { Text, TouchableOpacity, View } from 'react-native';

const  CustomDrawerContent =  (props)=> {
    const navigation = props.navigation;
    const dispatch = useDispatch();
    const logout = async()=>{
        await SecureStore.deleteItemAsync("Token")
    dispatch(authAction.resetAll())
    dispatch(productAction.reset())    
    navigation.closeDrawer();
    }

    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <View style={{
            marginTop:15,
      marginLeft:18,
            flex:1,
            flexDirection:'row',
            justifyContent:'flex-start',
            backgroundColor:"#fff",
            color:"#fff",
            fontWeight:"400",
            fontSize:18
        }}>

        <TouchableOpacity
        style={{
            flex:1,
            flexDirection:'row',
            fontWeight:"400",
            fontSize:18
        }}  onPress={() =>{logout()}} >
                <Ionicons name="log-out-outline" size={28} color="black" />
        <Text    style={{
             marginLeft:5,
            fontWeight:"400",
            fontSize:18
        }} >Logout</Text>
        </TouchableOpacity>

        </View>
        
      </DrawerContentScrollView>
    );
  }

  export default CustomDrawerContent;