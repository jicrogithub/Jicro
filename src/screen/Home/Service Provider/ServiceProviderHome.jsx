import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { main } from '../../../utils/colors';
import Card from './components/Card';

const ServiceProviderHome = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    // <View className="h-screen w-full bg-white flex justify-center items-center" >
    //   <Text className="text-lg text-gray-700 font-black" >Your Account is Being Verified</Text>
    //   <Text className="text-md text-gray-500 font-black" >If an Urgent Contact Us at +919905833824 </Text>
    // </View>
    <>
      <Text className={`text-[${main.primary}] text-6xl font-black text-center bg-white pt-2`} >Jicro</Text>
      {/* <BottomTabsServicesProvider/> */}
      <ScrollView
        className="h-full bg-white pb-3 w-full"
        refreshControl={
          <RefreshControl colors={[main.primary]} refreshing={refreshing}  onRefresh={onRefresh} />
        }
      >
        <Card />
        <Card />
        <Card />
        <Card />
      </ScrollView>
    </>
  )
}

export default ServiceProviderHome