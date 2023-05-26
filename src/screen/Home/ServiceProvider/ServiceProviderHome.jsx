import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { main } from "../../../utils/colors";
import Card from "./components/Card";
import { useFetch } from "../../../suppliers/BackendInteractions/Fetch";
import Button from "../../components/Button";

const ServiceProviderHome = ({ navigation }) => {
  const { ordersData, getOrders, getSP } = useFetch();
  useEffect(() => {
    getSP();
    getOrders();
  }, []);
  // console.log(ordersData[0].user.location)
  const [noOrders, setNoOrders] = useState(true);
  useEffect(() => {
    const clearID = setTimeout(() => {
      if (Object.keys(ordersData).length === 0) {
        setNoOrders(false);
      } else {
        setNoOrders(true);
      }
    }, 2000);
    return () => clearTimeout(clearID);
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getOrders();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const renderItem = ({ item }) => {
    const { user, service, orderID, _id, status } = item;
    console.log(item);
    if (item.user !== null) {
      return (
        <Card
          _id={_id}
          key={orderID}
          orderID={orderID}
          location={user.location}
          price={service.price}
          title={service.title}
          status={status}
          user={user}
        />
      );
    }
  };
  // console.log(ordersData)
  // make a user acc!
  return (
    <>
      {Object.keys(ordersData).length !== 0 ? (
        <View className="h-screen bg-white">
          <Text
            className={`text-[${main.primary}] text-6xl font-black text-center bg-white pt-2`}
          >
            Jicro
          </Text>
          <FlatList
            data={ordersData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl
                colors={[main.primary]}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            contentContainerStyle={{ paddingBottom: 50 }}
          />
        </View>
      ) : (
        <View>
          {/* <ActivityIndicator
            animating={true}
            color={main.primary}
            size="large"
          /> */}
          <View className="h-screen w-full p-10 bg-white flex justify-center items-center">
            <Image
              className="h-52 w-52"
              source={require("./assets/nothing.gif")}
            />
            <Text className="text-lg text-gray-700 font-black">
              No Orders found!
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default ServiceProviderHome;
