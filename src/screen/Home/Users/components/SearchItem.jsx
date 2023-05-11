import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const SearchItem = ({ image, title, id }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Details', {
                service_id: id
            })
        }} activeOpacity={0.8} >
            <View className="p-2 h-16 w-full bg-gray-50  rounded-md flex flex-row justify-between items-center" >
                <View className="flex flex-row justify-evenly items-center gap-x-2 " >
                    <Image source={{ uri: image }} className="w-16 h-10 rounded-md" />
                    <Text className="font-bold text-gray-600 text-md" >{title.length > 32 ? `${title.slice(0, 33)}...` : title}</Text>
                </View>
                <Image source={require('../assets/open.png')} className="w-6 h-6" />
            </View>
        </TouchableOpacity>
    )
}

export default SearchItem