import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { main } from "../../../../utils/colors"
import Button from '../../../components/Button'
import { useNavigation } from '@react-navigation/native';
const Card = ({ images, title, price, ratings, provider, checkedCondition,service_id, service_provider_id }) => {
  const navigation = useNavigation()
  
  const { name, logo, profession, location } = provider;
  return (
    <>
      {
        ratings !== 0 && price.discount !== 0 && <View className={`h-12 w-full rounded-t-3xl relative top-2 bg-[${main.primary}] flex justify-between items-center `} >
          <Text className="font-black text-xl mt-1 text-white" >Discount {price.discount}%</Text>
        </View>
      }
      {
        price.discount === 0 && ratings === 0 && <View className={`h-12 w-full rounded-t-3xl relative top-2 bg-[${main.primary}] flex justify-center items-center `} >
          <Image className="h-6 w-32" source={require("../assets/new.gif")} />
        </View>
      }
      {
        checkedCondition && ratings === 0 && price.discount !== 0 && <View className={`h-12 w-full rounded-t-3xl relative top-2 bg-[${main.primary}] flex justify-between items-center flex-row px-4 `} >
          <Image className="h-7 w-32" source={require("../assets/new.gif")} />
          <Text className="font-black text-xl  text-white" >Discount {price.discount}%</Text>
        </View>
      }
      <View style={main.shadows} className="bg-white rounded-xl w-50 h-[12rem] p-1 mb-2 flex flex-col justify-around" >
        {
          images[0] && <Image
          source={{ uri: images[0] }}
          className="w-50 h-40 rounded-xl"
        />
        }
        <Text className="text-gray-700 text-[16px] font-black text-center my-1" >{title}</Text>
        <View className="h-26 flex flex-row justify-evenly items-center" >
          <View className="flex flex-row justify-center items-center gap-2 mb-1" >
            <Image
              source={{ uri: logo }}
              className="w-10 h-10 rounded-full"
            />
            <Text className="font-black text-gray-500 text-lg" >{name}</Text>
          </View>
          <View className="flex flex-row gap-1 items-center" >
            <Image className="h-7 w-7" source={require("../assets/ratings.gif")} />
            <Text className="font-black text-gray-500 text-lg" >{ratings === 0 ? "New" : ratings}</Text>
          </View>
          <View className={`w-20 h-10 bg-[${main.primary}]  rounded-xl flex justify-around items-center`} >
            <Text className="font-semibold text-sm text-white line-through" >₹ {price.manupulated}</Text>
            <Text className="font-black text-lg text-white" >₹ {price.actual}</Text>
          </View>
        </View>
        {/* <View>
        <Text className="text-md text-gray-500" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, vitae fuga? Perferendis!...</Text>
      </View> */}
        <Button func={() => {
          navigation.navigate("Details",{
            service_id,
            service_provider_id,
          })
        }} text="View Details" />
      </View>
    </>
  )
}

export default Card