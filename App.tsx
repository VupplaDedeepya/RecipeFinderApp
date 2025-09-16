/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


//import {  StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import Toast from "react-native-toast-message";
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store/userStore";
//import HomeScreen from './src/screens/HomeScreen';

function App() {
  
  

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
      <AppNavigator />
        <Toast />
    </NavigationContainer>
      </PersistGate>
   </Provider>
   
  );

}
export default App;
