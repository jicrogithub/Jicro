import { View, Text, ScrollView, Image, FlatList } from "react-native";
import React, { useMemo, useCallback, useEffect } from "react";
import UniversalHeader from "../../components/Universalheader";
import { main } from "../../../utils/colors";
import Card from "./components/Card";
import SquareBoxs from "./components/SquareBoxs";
import Button from "./../../components/Button";
import { useRoute } from "@react-navigation/native";
import { SUB_CATEGORIES } from "./export/SUB_CATEGORIES";
import { useFetch } from "../../../suppliers/BackendInteractions/Fetch";
const TrendingExtended = ({ navigation }) => {
  const { c_data, getServices } = useFetch();
  const { params } = useRoute();
  useEffect(() => {
    getServices(params.for);
  }, []);
  const categories =
    SUB_CATEGORIES[
      params.for.toLowerCase().split(" ").length === 2
        ? params.for.toLowerCase().split(" ").join("_")
        : params.for.toLowerCase()
    ];
  const keyExtractor = useCallback((item) => item._id, []);

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
      <View className="w-full felx justify-center items-center">
        <Image
          className="w-44 h-44"
          source={require("./assets/not-found.gif")}
        />
      </View>
    );
  };
  const isEmpty = useMemo(() => Object.keys(c_data).length === 0, [c_data]);
  return (
    <View className="bg-white h-screen">
      <UniversalHeader/>
      <FlatList
        ListHeaderComponent={() => {
          return (
            <View className="bg-white mx-2 mt-1 flex-1">
              <Text className="text-xl font-bold text-gray-600 text-center">
                {params.for} Services
              </Text>
              <View
                style={main.shadows}
                className="bg-white w-50 h-max-[350] my-1 rounded-lg p-2 flex flex-col justify-between"
              >
                <SquareBoxs
                  extraData={{
                    category: params.for,
                  }}
                  data={categories}
                />
                <View className="mx-2">
                  <Button text={`Demand a ${params.for} Service`} />
                </View>
              </View>
            </View>
          );
        }}
        data={!isEmpty ? c_data : [0]}
        keyExtractor={keyExtractor || 0}
        renderItem={!isEmpty ? renderItem : fallback}
        showsHorizontalScrollIndicator={false}
        vertical
        className=""
      />
    </View>
  );
};

export default TrendingExtended;
