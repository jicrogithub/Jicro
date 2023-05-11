import { View, Text } from 'react-native'
import React from 'react'
import { main } from './../../../../utils/colors';

const Transaction = () => {
  return (
    <View className="border-gray-400 border-2 bg-white rounded-xl w-full h-22 p-2 mt-2 " >
        <View className="h-14 w-full bg-gray-100 rounded-xl flex flex-row justify-around items-center" >
            <Text className="w-[70%] text-black font-black text-md" > Watter Tap Fitting</Text>
            <Text className="px-3 py-1 text-black font-bold text-lg bg-green-300 rounded-xl" >+400</Text>
        </View>
        <Text className={`text-[${main.primary}] font-black text-center mt-2`} >View Details</Text>
    </View>
  )
}

export default Transaction