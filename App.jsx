import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from "react"
import FlashMessage from "react-native-flash-message"
/**
 * @Import ~ Zustand States Managemant
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Splash Screen
import Splash from "./src/screen/SplashScreen/Splash.jsx"
//OnBoarding
import OnBoarding from './src/screen/OnBoarding/OnBoarding';
//Auth
import Auth from './src/screen/Auth/Auth';

/**
 * @Navigation
 */

import UserNavigation from './src/screen/Navigations/userNavigation.js';


/**
* @EntryPoint ~ These Above Screens are Stacked Screens 
*/


/**
* @Home ~ User
*/

import TrendingExtended from './src/screen/Home/Users/TrendingExtended';
import DemandService from './src/screen/Home/Users/DemandService';
import Details from './src/screen/Home/Users/Details';
import List from './src/screen/Home/Users/List.jsx';


// /**
// *  @Home ~ ServiceProvider
// */

import _Profile from './src/screen/Home/ServiceProvider/_Profile';
import Profile from './src/screen/Home/ServiceProvider/Profile';
import AddService from './src/screen/Home/ServiceProvider/AddService.jsx';
import ServiceProviderNavigation from './src/screen/Navigations/serviceProvidersNavigation';
import Preview from './src/screen/Home/ServiceProvider/Preview';
import { getData } from './src/helper/LocalStorage.js';
import { pushNotification } from './src/helper/Notification.js';
import { main } from './src/utils/colors.js';
import Buy from './src/screen/Home/Users/Buy';
import Tracking from './src/screen/Home/Users/Tracking';
import MapSP from './src/screen/Home/ServiceProvider/MapSP';
import Search from './src/screen/Home/Users/Search';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(()=>{
    pushNotification()
  },[])
  return (
    <>
      <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="SplashScreen"
          options={{ headerShown: false, }}
          component={Splash} />
        <Stack.Screen name="OnBoarding"
          options={{ headerShown: false, }}
          component={OnBoarding} />
        <Stack.Screen name="Auth"
          options={{ headerShown: false, }}
          component={Auth} />
        <Stack.Screen name="Tracking"
          options={{ headerShown: false, }}
          component={Tracking} />
        <Stack.Screen name="Search"
          options={{ headerShown: false, }}
          component={Search} />
        {/** 
          *@Screens ~ User
      */}
        <Stack.Screen name="UserNavigation"
          options={{ headerShown: false, }}
          component={UserNavigation} />
        <Stack.Screen name="DemandService"
          options={{ headerShown: false, }}
          component={DemandService} />
        <Stack.Screen name="Details"
          options={{ headerShown: false, }}
          component={Details} />
        <Stack.Screen name="Buy"
          options={{ headerShown: false, }}
          component={Buy} />
        <Stack.Screen name="TrendingExtended"
          options={{ headerShown: false, }}
          component={TrendingExtended} />
        <Stack.Screen name="List"
          options={{ headerShown: false, }}
          component={List} />
        {/**
        *  @Screens ~ Service_Provider
      */}
      <Stack.Screen name="ServiceProviderNavigation"
          options={{ headerShown: false, }}
          component={ServiceProviderNavigation} />
        <Stack.Screen name="_Profile"
          options={{ headerShown: false, }}
          component={_Profile} />
        <Stack.Screen name="AddService"
          options={{ headerShown: false, }}
          component={AddService} />
        <Stack.Screen name="Profile"
          options={{ headerShown: false, }}
          component={Profile} />
        <Stack.Screen name="Preview"
          options={{ headerShown: false, }}
          component={Preview} />
        <Stack.Screen name="MapSP"
          options={{ headerShown: false, }}
          component={MapSP} />
      </Stack.Navigator>
    </NavigationContainer>
    <FlashMessage position="top" style={main.shadows} floating={true} /> 
    </>    
  );
}