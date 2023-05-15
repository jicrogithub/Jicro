import { View, Text, TouchableOpacity, Image } from 'react-native'

import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { main } from '../../../../utils/colors';

const SquareBoxs = ({ data }) => {
    const navigation = useNavigation()
    return (
        <View className="flex flex-row justify-around ">
            {
                data?.map(({ id, text, img, redirectTo,data={} }) => {
                    return <TouchableOpacity key={id} onPress={() => {
                        navigation?.navigate(redirectTo, data)
                    }} activeOpacity={0.4} className="w-20 h-20 bg-gray-100 rounded-xl flex justify-evenly flex-col items-center " >
                        <Image source={img} className="h-[80%] w-[80%]" />
                        <Text className="font-black text-[10px] text-gray-700" >{text}</Text>
                    </TouchableOpacity>
                })
            }
        </View>
    )
}

export default SquareBoxs