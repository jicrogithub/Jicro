import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import UniversalHeader from './../../components/Universalheader';
import BookingCard from './components/BookingCard';
import { useFetch } from '../../../suppliers/BackendInteractions/Fetch';
import { Loading } from './components/Loading';
import { main } from './../../../utils/colors';

const Bookings = () => {
  const { getBookings, bookingsData } = useFetch()
  useEffect(() => {
    getBookings()
  }, [])
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    getBookings()
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <>
      {
        Object.keys(bookingsData).length === 0 ? <Loading text={'Jicro'} delay={100} /> : <View className="bg-white h-screen" >
          <UniversalHeader />
          <FlatList
            data={bookingsData}
            keyExtractor={(e) => {
              return e._id
            }}
            renderItem={({ item }) => {
              const { service, status, _id, orderID } = item
              return <BookingCard title={service.title} price={service.price} orderID={orderID} images={service.images[0]} status={status} key={_id} />
            }}
            showsHorizontalScrollIndicator={false}
            vertical
            refreshControl={
              <RefreshControl colors={[main.primary]} refreshing={refreshing} onRefresh={onRefresh} />
            }
            className='px-1 mb-14 mt-2'
          />
        </View>
      }
    </>
  )
}

export default Bookings