import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { main } from './../../../../utils/colors';
import { useNavigation } from '@react-navigation/native';

const BookingCard = ({ title, price, status, images, orderID }) => {

    const navigation = useNavigation()
    const [color, setColor] = useState('')
    useEffect(() => {
        if (status == 'Pending') {
            setColor('#ff7b00')
        } else if (status == 'On-Going') {
            setColor('#5d00ff')
        }
    }, [status])
    return (
        <View className='px-1' >
            <View style={
                {
                    elevation: 5
                }
            } className="bg-white rounded-xl p-2 w-full min-h-36  flex justify-evenly items-center mb-2" >
                <View className="w-full flex flex-row justify-evenly items-center" >
                    <View className="flex mb-2 justify-center items-baseline mr-2 " >
                        <Text className="font-black text-gray-600 text-lg " >{title}</Text>
                        <View style={main.shadows} className="flex flex-row justify-start items-center p-2 bg-gray-100 rounded-xl mb-2 " >
                            <Text style={{ fontWeight: 'bold', color: 'white', backgroundColor: color || "#fff", padding: 5, borderRadius: 10, fontSize: 12, marginRight: 5 }}>{status.toUpperCase()}</Text>
                            <Text className="font-black text-gray-700 " >Rs.{price.actual}</Text>
                            {/* <Image className="h-7 w-7" source={require("../assets/gas-balloon.gif")} /> */}
                        </View>
                        <View style={main.shadows} className={`rounded-lg h-8 w-36 bg-[${main.primary}] px-1`} >
                            <Text className={`text-[11px] text-white font-black text-center`} >Order ID for Reference</Text>
                            <View style={main.shadows} className='bg-gray-50 h-6 rounded-lg flex justify-center items-center' >
                                <Text className="text-gray-600 font-black text-md" >{orderID}</Text>
                            </View>
                        </View>
                    </View>
                    <Image className="h-20 w-40 rounded-xl" source={{ uri: images }} />
                </View>
                <View className="flex flex-row justify-center items-center gap-2" >
                    {
                        status !== 'Pending' ?
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Tracking', {
                                    orderID
                                })
                            }} >
                                <Text className={`font-bold text-[${main.primary}] text-lg `} >Track</Text>
                            </TouchableOpacity> : <TouchableOpacity onPress={() => {
                                alert('This page is Under Construction Please Accept the Order in Service Provider Account')
                            }} >
                                <Text className={`font-bold text-[${main.primary}] text-lg `} >View Details</Text>
                            </TouchableOpacity>
                    }
                    <Text className="text-zinc-400 font-black" >|</Text>
                    <TouchableOpacity>
                        <Text className={`font-bold text-gray-500 underline text-md  `} >Help?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default BookingCard