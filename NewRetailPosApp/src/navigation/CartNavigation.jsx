import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons'; 
import 'react-native-gesture-handler';
import CartScreen from '../screen/CartScreen'
import CheckoutScreen from '../screen/CheckoutScreen'
const stack = createNativeStackNavigator();
const CartNavigation = () =>{
    return(
        <stack.Navigator>
            <stack.Screen
              name="Cart Navigator"
              component={CartScreen}
              options={{
                title: 'Cart',
                headerTitle:'Cart',
                headerTitleAlign: 'center',
                drawerLockMode: 'locked-closed',
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  color:'#000',
                },
                headerStyle: {
                  backgroundColor: '#FFFFFF',
                  shadowColor: "#000000",
                  shadowOffset: {
                      width: 0,
                      height:4,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                },
                gestureEnabled:false ,
                swipeEnabled:false, 
                headerLeft:()=>(
                    GoToButton()
                  ),
              }}
            />
               <stack.Screen name="Checkout" component={CheckoutScreen}/>
        </stack.Navigator>
    )
}

  function GoToButton() {
    const navigation = useNavigation();
    return (
      <AntDesign.Button name="arrowleft"  
      size={25} 
      backgroundColor = "#FFFFFF" 
      color="#000"
      iconStyle={
      {marginRight: 0,}
      } 
      onPress={() => navigation.goBack()}
      />
    );
  }
export default CartNavigation;