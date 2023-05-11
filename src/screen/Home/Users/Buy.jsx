import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import Button from './../../components/Button';
import { main } from './../../../utils/colors';
import { usePost } from '../../../suppliers/BackendInteractions/Post';

const Buy = ({ navigation }) => {
  const { changeRedirections, orderID } = usePost()
  useEffect(()=>{
    changeRedirections(false)
  },[])
  return (
    <View className="h-screen w-full flex" >
      <View className={`w-full h-[65%] bg-[${main.primary}] flex justify-center items-center`} >
        <Image source={require('./assets/confirmed.gif')} className="w-[600px] h-[600px]" />
      </View>
      <View className="w-full h-[35%] bg-gray-100 rounded-t-3xl flex justify-between items-center p-4 " style={main.shadows} >
        <View className="flex justify-center items-center gap-6 w-full " >
          <Text className={`text-2xl text-[${main.primary}] font-black w-full text-center`} >Thanks for the Purchase</Text>
          <View style={main.shadows} className={`rounded-3xl h-16 w-64 bg-[${main.primary}] px-2`} >
            <Text className={`text-md text-white font-black text-center`} >Order ID for Reference</Text>
            <View style={main.shadows} className='bg-gray-100 w-full h-14 rounded-2xl flex justify-center items-center' >
              <Text className="text-gray-600 font-black text-2xl" >{orderID}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text className="text-gray-800 underline font-black text-center" >Track Service Provider</Text>
        </View>
        <View className="w-full" >
          <Button text={'Continue Purchase'} func={() => {
            navigation.replace('UserNavigation',{
              screen:'Home'
            })
          }} />
        </View>
      </View>
    </View>
  )
}

export default Buy