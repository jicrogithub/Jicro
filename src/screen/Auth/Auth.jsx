import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
import { main } from "../../utils/colors"
import Seperator from "./components/Seperator"
import WhatsApp from './components/WhatsApp';
import { useAuth } from '../../suppliers/BackendInteractions/Auth';
import { useEffect } from 'react';
import { requestLocationPermission } from '../../helper/Location';
import { getCurrentPostiton, getCurrentLocation } from './../../helper/Location';
import { key } from '../../constants/API_KEYS';
import axios from 'axios';
const Auth = ({ navigation }) => {
  const [whichScreen,setWhichScreen] = useState("")
  const { verifyUser,shouldNavigate } = useAuth()
  useEffect(() => {
    const linkingEvent = Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({ url });
      }
    });
    return () => {
      linkingEvent.remove();
    };
  }, [handleDeepLink]);
  const handleDeepLink = async url => {
    const regExp = /waId=([\w-]+)/;
    const match = url.url.match(regExp);
    // console.log("yhi mkc bsdk ")
    if (match && whichScreen === "Auth") {
      const waId = match[1];
      const address = await getCurrentLocation()
      // console.log(res)
      verifyUser(waId,{
        address
      });
    } else {
      console.log("waId parameter not found in URL");
    }
  };
  useEffect(() => {
    setWhichScreen("Auth")
    requestLocationPermission()
  }, [])
  // useEffect(()=>{
  //   if(shouldNavigate === true){
  //     navigation.replace("UserNavigation")
  //   }
  // },[shouldNavigate])
  return (
    <View className="h-screen" >
      <View className="w-full h-[60%] bg-[#684DE9] flex justify-center items-center" >
        <Image className="w-84 h-84" source={require("./assets/namaste.gif")} />
      </View>
      <View style={main.shadows} className="h-[45%] w-full bg-white mt-[-20px] shadow-xl rounded-3xl py-8 px-2" >
        <Text className="text-[#684DE9] font-black text-6xl text-center" >Welcome</Text>
        <Text className="text-gray-600 font-black text-lg text-center">How is Your Day Today?</Text>
        <Seperator text="Log in or Sign up" />
        <TouchableOpacity onPress={() => {
          // navigation.navigate('UserNavigation')         
        }} activeOpacity={0.5} style={{
          backgroundColor: main.primary
        }} className={`w-full h-12 rounded-xl mt-1 flex justify-center items-center`} >
          {/* <Text className="text-white font-bold text-xl" >Continue with WhatsApp</Text> */}
          <WhatsApp />
        </TouchableOpacity>
        <Seperator text="*" />
        <TouchableOpacity onPress={() => {
          navigation.navigate("_Profile")
        }} activeOpacity={0.5} style={{
          backgroundColor: main.bgColor
        }} className={`w-50 h-5 rounded-xl mt-1 flex justify-center items-center my-[-10px]`} >
          <Text className="text-gray-500 font-black text-md" >Continue as Service Provider</Text>
        </TouchableOpacity>
        <View className="p-8" >
          <Text className="text-center text-gray-400" >By Continuing as User You are agreeing Our</Text>
          <Text className="text-center text-gray-400 font-black" >Terms and Conditions</Text>
        </View>
      </View>
    </View>
  )
}

export default Auth