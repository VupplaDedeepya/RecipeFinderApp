import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/userStore';
import MainTabs from './MainTabs';
//import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SearchScreen from '../screens/SearchScreen';
import RecipeScreen from '../screens/RecipeScreen';
import SurprisemeScreen from '../screens/SurprisemeScreen'
import { RootStackParamList } from './types/navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const token = useSelector((state: RootState) => state.user.token);

  return (
    <Stack.Navigator
      key={token ? 'logged-in' : 'logged-out'} // Force reset on token change
      screenOptions={{ headerShown: false }}
    >
      {token ? (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="surprise" component={SurprisemeScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Recipe" component={RecipeScreen} />
          
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
