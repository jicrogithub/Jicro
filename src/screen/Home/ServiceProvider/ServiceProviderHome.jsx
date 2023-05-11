import { View, Text, ScrollView, RefreshControl, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { main } from '../../../utils/colors';
import Card from './components/Card';
import { useFetch } from '../../../suppliers/BackendInteractions/Fetch';

const ServiceProviderHome = () => {
  const { ordersData, getOrders, getSP } = useFetch()
  useEffect(() => {
    getSP()
    getOrders()
  }, [])
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const renderItem = ({ item }) => {
    const { user, service, orderID, _id, status } = item
    return (
      <Card _id={_id} key={orderID} orderID={orderID} location={user.location} price={service.price} title={service.title} status={status} />
    )
  }
  // console.log(ordersData)
  // make a user acc! 
  return (
    // <View className="h-screen w-full bg-white flex justify-center items-center" >
    //   <Text className="text-lg text-gray-700 font-black" >Your Account is Being Verified</Text>
    //   <Text className="text-md text-gray-500 font-black" >If an Urgent Contact Us at +919905833824 </Text>
    // </View>
    <>
      {
        Object.keys(ordersData).length !== 0 ? <View className="h-screen bg-white" >
          <Text className={`text-[${main.primary}] text-6xl font-black text-center bg-white pt-2`} >Jicro</Text>
          <FlatList
            data={ordersData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl colors={[main.primary]} refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{ paddingBottom: 50 }}
          />
        </View> : <ActivityIndicator animating={true} color={main.primary} size='large' />
      }

    </>
  )
}

export default ServiceProviderHome