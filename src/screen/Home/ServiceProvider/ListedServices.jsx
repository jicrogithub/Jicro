import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import Card from "./components/Card";
import ListCard from "./components/ListCard";
import { useFetch } from "../../../suppliers/BackendInteractions/Fetch";
import { main } from "../../../utils/colors";

const ListedServices = () => {
  const { getAllServices, allServicesData } = useFetch();
  useEffect(() => {
    getAllServices();
  }, []);
  // console.log(allServicesData)
  return (
    <>
      {Object.keys(allServicesData).length !== 0 ? (
        <View className="h-screen w-full bg-white ">
          <FlatList
            data={allServicesData}
            renderItem={({ item }) => {
              console.log(item);
              const { images, included, notIncluded, price, title } = item;
              return (
                <ListCard
                  images={images}
                  price={100}
                  title={title}
                  included={included}
                  notIncluded={notIncluded}
                />
              );
            }}
            keyExtractor={(_, i) => i}
          />
        </View>
      ) : (
        <View>
          <ActivityIndicator
            animating={true}
            color={main.primary}
            size="large"
          />
          <View className="h-screen w-full bg-white flex justify-center items-center">
            <Text className="text-lg text-gray-700 font-black">
              No Service Found
            </Text>
            <Text className="text-md text-gray-500 font-black">
              Create a Service 
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default ListedServices;
