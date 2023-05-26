import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import React, { useEffect } from "react";
import Card from "./components/Card";
import ListCard from "./components/ListCard";
import { useFetch } from "../../../suppliers/BackendInteractions/Fetch";
import { main } from "../../../utils/colors";
import Button from "../../components/Button";

const ListedServices = ({navigation}) => {
  const { getAllServices, allServicesData } = useFetch();
  useEffect(() => {
    getAllServices();
  }, [navigation]);
  // console.log(allServicesData)
  return (
    <>
      {Object.keys(allServicesData).length !== 0 ? (
        <View className="h-screen w-full flex-1 bg-white ">
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
          <View className="h-screen w-full p-5 bg-white flex justify-center items-center">
          <Image
              className="h-52 w-52"
              source={require("./assets/nothing.gif")}
            />
            <Text className="text-lg text-gray-700 font-black">
              No Service Found
            </Text>
            <Button func={()=>{
              navigation.navigate("AddService")
            }} text='Create a Service' />
          </View>
        </View>
      )}
    </>
  );
};

export default ListedServices;
