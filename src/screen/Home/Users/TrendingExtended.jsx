import { View, Text, ScrollView } from "react-native";
import React from "react";
import UniversalHeader from "../../components/Universalheader";
import { main } from "../../../utils/colors";
import Card from "./components/Card";
import SquareBoxs from "./components/SquareBoxs";
import Button from "./../../components/Button";
const TrendingExtended = ({ navigation }) => {
  return (
    <View className="bg-white h-screen">
      <UniversalHeader navigation={navigation} />
      <ScrollView className="bg-white">
        <Text className="text-xl font-bold text-gray-600 text-center">
          Carpentry Services
        </Text>
        <View
          style={main.shadows}
          className="bg-white w-50 h-[350] mx-2 my-1 rounded-lg p-2 flex flex-col justify-between"
        >
          <SquareBoxs
            navigation={navigation}
            data={[
              {
                id: 1,
                text: "",
                img: "",
                redirectTo: "List",
              },
              {
                id: 2,
                text: "",
                img: "",
                redirectTo: "",
              },
              {
                id: 3,
                text: "",
                img: "",
                redirectTo: "",
              },
              {
                id: 4,
                text: "",
                img: "",
                redirectTo: "",
              },
            ]}
          />
          <SquareBoxs
            navigation={navigation}
            data={[
              {
                id: 1,
                text: "",
                img: "",
                redirectTo: "",
              },
              {
                id: 2,
                text: "",
                img: "",
                redirectTo: "",
              },
              {
                id: 3,
                text: "",
                img: "",
                redirectTo: "",
              },
              {
                id: 4,
                text: "",
                img: "",
                redirectTo: "",
              },
            ]}
          />
          <SquareBoxs
            data={[
              {
                id: 1,
                text: "",
                img: "",
                redirectTo: "",
              },
              {
                id: 2,
                text: "",
                img: "",
                redirectTo: "",
              },
              {
                id: 3,
                text: "",
                img: "",
                redirectTo: "",
              },
              {
                id: 4,
                text: "",
                img: "",
                redirectTo: "",
              },
            ]}
          />
          <SquareBoxs
            data={[
              {
                id: 1,
                text: "",
                img: "",
                redirectTo: "",
              },
              {
                id: 2,
                text: "",
                img: "",
                redirectTo: "",
              },
              {
                id: 3,
                text: "",
                img: "",
                redirectTo: "",
              },
              {
                id: 4,
                text: "",
                img: "",
                redirectTo: "",
              },
            ]}
          />
        </View>
        <View className="mx-2">
          <Button text="Demand a Carpentry Service" />
        </View>
        <View>
          {/* <Card navigation={navigation} /> */}
          {/* <Card navigation={navigation} /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default TrendingExtended;
