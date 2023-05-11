import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {main} from "../../utils/colors"
import { useNavigation } from '@react-navigation/native'
const UniversalHeader = () => {
  const navigation = useNavigation()
  return (
    <View  style={main.shadows} className="h-14 w-50 rounded-b-3xl flex flex-row justify-between bg-white items-center " >
   <TouchableOpacity onPress={()=>{
    navigation.goBack()
   }}>
   <Image
        source={require("./assets/left.png")}
        className="h-12 w-12"
    />
   </TouchableOpacity>
    <Text className={`text-[${main.primary}] font-black text-4xl pr-4 `} >Jicro</Text>
    </View>
  ) 
}

export default UniversalHeader