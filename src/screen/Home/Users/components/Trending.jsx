import { View, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { main } from "../../../../utils/colors";
import SquareBoxs from "./SquareBoxs";
import Button from "./../../../components/Button";
import icons from "../export/ICONS_CATEGORIES";

const Trending = () => {
  return (
    <View
      style={main.shadows}
      className="bg-white w-50 h-60 mx-2  rounded-lg p-2 flex flex-col justify-between"
    >
      <SquareBoxs
        data={[
          {
            id: 1,
            text: "Carpantery",
            img: icons.carpenter,
            redirectTo: "TrendingExtended",
          },
          {
            id: 2,
            text: "Electrician",
            img: icons.electrician,
            redirectTo: "",
          },
          {
            id: 3,
            text: "Plumbing",
            img: icons.plumber,
            redirectTo: "",
          },
          {
            id: 4,
            text: "Barber",
            img: icons.barber,
            redirectTo: "",
          },
        ]}
      />
      <SquareBoxs
        data={[
          {
            id: 1,
            text: "Beauty",
            img: icons.makeup,
            redirectTo: "",
          },
          {
            id: 2,
            text: "Car Wash",
            img: icons.car_wash,
            redirectTo: "",
          },
          {
            id: 3,
            text: "Cleaning",
            img: icons.cleaning,
            redirectTo: "",
          },
          {
            id: 4,
            text: "Technician",
            img: icons.technician,
            redirectTo: "",
          },
        ]}
      />
      <Button
        text="Demand a Service"
        func={() => {
          navigation.navigate("DemandService");
        }}
      />
    </View>
  );
};

export default memo(Trending);
