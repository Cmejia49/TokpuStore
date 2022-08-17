import * as React from 'react';
import { AppRegistry, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from './src/store/store'
import AuthNavigation from './src/navigation/AuthNavigation.jsx'
import Index from './src/navigation/Index';


import LoginScreen from './src/screen/LoginScreen';
export default function App() {
  return (
    <Provider store={store}>
      <Index />                     
  </Provider>                    
  );
}


