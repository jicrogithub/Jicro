import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import UniversalHeader from './../../components/Universalheader';
import BookingCard from './components/BookingCard';
import { useFetch } from '../../../suppliers/BackendInteractions/Fetch';
import { Loading } from './components/Loading';
import { main } from './../../../utils/colors';

const Bookings = () => {
  const { getBookings, bookingsData } = useFetch();
  useEffect(() => {
    getBookings();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    getBookings();
    setTimeout(() => {
      setRefreshing(false);
    }, 4000);
  }, []);

  const isEmpty = Object.keys(bookingsData).length === 0;

  return (
    <View style={styles.container}>
      {isEmpty ? (
        <Loading text={'Jicro'} delay={100} />
      ) : (
        <>
          <UniversalHeader />
          <FlatList
            data={bookingsData}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              const { service, status, _id, orderID } = item;
              return <BookingCard title={service.title} price={service.price} orderID={orderID} images={service.images[0]} status={status} key={_id} />;
            }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl colors={[main.primary]} refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={styles.flatListContent}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatListContent: {
    paddingHorizontal: 8,
    marginBottom: 14,
    marginTop: 2,
  },
});

export default Bookings;
