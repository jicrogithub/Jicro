import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { memo } from "react";
import { main } from "../../../../utils/colors";
import SquareBoxs from "./SquareBoxs";
import Button from "./../../../components/Button";
import icons from "../export/ICONS_CATEGORIES";
import { useNavigation } from "@react-navigation/native";

const Trending = () => {
  const navigation = useNavigation();
  const redirectTo = "TrendingExtended";
  return (
    <View style={styles.container}>
      <SquareBoxs
        data={[
          {
            id: 1,
            text: "Carpentery",
            img: icons.carpenter,
            redirectTo,
            data: {
              for: "Carpentery",
            },
          },
          {
            id: 2,
            text: "Electrician",
            img: icons.electrician,
            redirectTo,
            data: {
              for: "Electrician",
            },
          },
          {
            id: 3,
            text: "Plumbing",
            img: icons.plumber,
            redirectTo,
            data: {
              for: "Plumbing",
            },
          },
          {
            id: 4,
            text: "Barber",
            img: icons.barber,
            redirectTo,
            data: {
              for: "Barber",
            },
          },
          {
            id: 5,
            text: "Beauty",
            img: icons.makeup,
            redirectTo,
            data: {
              for: "Beauty",
            },
          },
          {
            id: 6,
            text: "Car Wash",
            img: icons.car_wash,
            redirectTo,
            data: {
              for: "Car Wash",
            },
          },
          {
            id: 7,
            text: "Cleaning",
            img: icons.cleaning,
            redirectTo,
            data: {
              for: "Cleaning",
            },
          },
          {
            id: 8,
            text: "Technician",
            img: icons.technician,
            redirectTo,
            data: {
              for: "Technician",
            },
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

const styles = StyleSheet.create({
  container: {
    ...main.shadows,
    backgroundColor: "white",
    width: "100%",
    maxHeight: 550,
    marginHorizontal: 2,
    borderRadius: 8,
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default memo(Trending);
