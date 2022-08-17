import * as React from 'react';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

const drawer = createDrawerNavigator();

import DamageScreen from '../screen/DamageScreen';
import AuthNavigation from './AuthNavigation';
import DamageNavigation from './DamageNavigation';
import SaleScreen from '../screen/SaleScreen';
import SaleNavigation from './SaleNavigation';
import ExpensesNavigation from './ExpensesNavigation';
import CustomDrawerContent from './CustomDrawerContent';
import { Text, View } from 'react-native';


const Index = () =>{
    return(
        <NavigationContainer>
        <drawer.Navigator 
        drawerContent={(props) => <CustomDrawerContent {...props} />}   
        screenOptions={{
          headerShown: false,
          gestureEnabled:false ,
          swipeEnabled:false, 
          drawerActiveBackgroundColor:'#000',
          drawerActiveTintColor:"#fff",
          drawerInactiveTintColor:"#000",
          drawerLabelStyle:{
            marginLeft:-25,
          fontWeight:"400",
          fontSize:18
         }
         }}>           
             <drawer.Screen name="Menu"
             component={AuthNavigation} 
             options={{
              drawerIcon:({color})=>(
              <FontAwesome name="home" size={24} color={color} />
              ),
               headerLeft:()=>(
                 GoToButton()
               ),
             }}
             />
   
   
         <drawer.Screen name="Damages" component={DamageNavigation} 
                options={{
                  drawerIcon:({color})=>(
                    <FontAwesome5 name="house-damage" size={24} color={color} />
                    ),
                 }}/>
          <drawer.Screen name="Sale" component={SaleNavigation} 
             options={{
              drawerIcon:({color})=>(
                <FontAwesome name="list-alt" size={24} color={color} />
                ),
               headerLeft:()=>(
                 GoToButton()
               ),
             }}/>
             
             <drawer.Screen name="Expenses Report" component={ExpensesNavigation} 
               options={{
                drawerIcon:({color})=>(
                  <FontAwesome5 name="file-invoice-dollar" size={24} color={color} />
                  ),
                 headerLeft:()=>(
                   GoToButton()
                 ),
               }}/>


            </drawer.Navigator>
       </NavigationContainer>
    )
}


export default Index;