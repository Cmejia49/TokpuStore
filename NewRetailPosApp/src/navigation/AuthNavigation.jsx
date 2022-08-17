import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons'; 
import 'react-native-gesture-handler';
import jwt_decode from "jwt-decode";
import * as SecureStore from 'expo-secure-store';

import { useSelector, useDispatch } from 'react-redux';
import { authAction, getToken } from '../store/auth-slice';

import LoginScreen from '../screen/LoginScreen.jsx';
import MainScreen from '../screen/MainScreen';
import CartScreen from '../screen/CartScreen'
import HeaderBtn from '../component/Button/HeaderBtn';

import { Text } from 'react-native';
import DetailScreen from '../screen/DetailScreen';
import CartNavigation from './CartNavigation';


const Stack = createNativeStackNavigator();
const AuthNavigation = () =>{
  const dispatch = useDispatch()
  const token = useSelector(getToken);

 const retrieveToken = async()=>{
  let result = await SecureStore.getItemAsync("Token");
  const obj = JSON.parse(result);
  if(result != null){
    const decode = jwt_decode(obj.token)
    if (decode.exp <= new Date()/1000) {
      await SecureStore.deleteItemAsync("Token")
    }else{
      dispatch(authAction.setToken({token:obj.token,id:obj.id}))
    }

  }
}

  React.useEffect(()=>{

    retrieveToken();
  },[])
    return(
    
        <Stack.Navigator>
            {token === null ? ( 
                <Stack.Screen
                name=" "
                component={LoginScreen}
                options={{
                  headerShown:false,
                  gestureEnabled:false ,
                  swipeEnabled:false, 
                }}/>
            ):(
                <>
                 <Stack.Screen
              name="Home"
              component={MainScreen}
              options={{
                title:"Home",
                headerTitle:'',
                headerTitleAlign: 'center',
                tabBarStyle: { display: "none" },
              headerStyle: {
                backgroundColor: '#FFFFFF',
                shadowColor: "#000000",
                shadowOffset: {
                    width: 0,
                    height:4,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 4,
              },
              
              headerTintColor: '#000000',
              headerLeft:()=>(
                menuButton()
              ),
               }}
            />
            <Stack.Screen
              name="Cart"
              component={CartNavigation}
              options={{
                headerShown:false,
                gestureEnabled:false ,
                swipeEnabled:false, 
              }}
            />
            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              options={{
                headerTitle:"",
              }}
            />
          </>

            )}
        </Stack.Navigator>
    )
}

const menuButton=()=>{
  const navigation = useNavigation();
  return (
      <MaterialIcons.Button name="menu"  
      size={25} 
      backgroundColor = "#FFFFFF" 
      color="#000"
      iconStyle={
      {marginRight: 0,}
      } 
      onPress={() => navigation.openDrawer()}
      />
    );
  
}
const cartButton=()=>{
  const navigation = useNavigation();
  return (
      <HeaderBtn
       name={"shoppingcart"}
       onPress={() => navigation.navigate("Cart")}>
       <Text style={{  fontWeight: 'bold', fontSize:18}}>0</Text>
      </HeaderBtn>
    );
  
}

  export default AuthNavigation;