import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { main } from '../../utils/colors'
const Button = ({ text, func, isloading, disabled, bgColor, textColor, }) => {
  return (
    <TouchableOpacity disabled={disabled ? disabled:isloading} onPress={func} activeOpacity={0.5} style={{
      backgroundColor: bgColor || main.primary,
      shadowColor: '#000000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
    }} className={`w-full h-12 rounded-xl mt-1 flex justify-center items-center`} >
      {
        isloading ? <ActivityIndicator animating={true} color={textColor || "#fff"} size="small" /> :
          <Text className={`text-${textColor || "white"} font-bold text-xl`}>{text}</Text>
      }
    </TouchableOpacity>
  )
}

export default Button