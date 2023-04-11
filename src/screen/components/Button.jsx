import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { main } from '../../utils/colors'
const Button = ({ text, func, isloading,disabled }) => {
  return (
    <TouchableOpacity disabled={isloading||disabled} onPress={func} activeOpacity={0.5} style={{
      backgroundColor: main.primary
    }} className={`w-full h-12 rounded-xl mt-1 flex justify-center items-center`} >
      {
        isloading ? <ActivityIndicator animating={true} color={"#fff"} size="small"  /> :
          <Text className="text-white font-bold text-xl" >{text}</Text>
      }
    </TouchableOpacity>
  )
}

export default Button