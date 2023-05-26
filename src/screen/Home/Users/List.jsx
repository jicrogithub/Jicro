import { View, Text, ScrollView, FlatList, Image } from "react-native";
import React, { useEffect, useMemo, useCallback } from "react";
import UniversalHeader from "./../../components/Universalheader";
import Card from "./components/Card";
import { useFetch } from "../../../suppliers/BackendInteractions/Fetch";
import { useRoute } from "@react-navigation/native";

const List = () => {
  const { getServices, sc_data } = useFetch();
  const { params } = useRoute();
  const keyExtractor = useCallback((item) => item._id, []);
  useEffect(() => {
    getServices(params.category, params.sub_category);
  }, []);
  const renderItem = useCallback(({ item }) => {
    const { title, images, provider, ratings, price, _id } = item;
    const checkedCondition = ratings === 0 && price.discount !== 0;
    return (
      <View className="w-full p-2">
        <Card
          _id={_id}
          checkedCondition={checkedCondition}
          key={_id}
          images={images}
          title={title}
          provider={provider}
          ratings={ratings}
          price={price}
          service_id={_id}
          service_provider_id={provider._id}
        />
      </View>
    );
  }, []);

  const fallback = () => {
    return (
      <View className="w-full felx justify-center items-center h-full ">
        <Image
          className="w-44 h-44"
          source={require("./assets/not-found.gif")}
        />
      </View>
    );
  };
  const isEmpty = useMemo(() => Object.keys(sc_data).length === 0, [sc_data]);
  return (
    <View className="bg-white h-screen">
      <UniversalHeader />
      <FlatList
        data={!isEmpty ? sc_data : [0]}
        keyExtractor={keyExtractor}
        renderItem={!isEmpty ? renderItem : fallback}
        showsHorizontalScrollIndicator={true}
        vertical
        className=""
      />
    </View>
  );
};

export default List;
