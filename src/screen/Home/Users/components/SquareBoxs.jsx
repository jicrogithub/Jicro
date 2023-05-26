import { View, Text, TouchableOpacity, Image } from "react-native";

import React from "react";
import { useNavigation } from "@react-navigation/native";
import { main } from "../../../../utils/colors";

const SquareBoxs = ({ data, extraData = {} }) => {
  const navigation = useNavigation();
  return (
    <View className="flex flex-row justify-around w-full flex-wrap gap-2">
      {data?.map(({ id, text, img, redirectTo, data = {} }, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => {
              navigation.navigate(redirectTo || "List", {
                ...data,
                ...extraData,
                sub_category:text
              });
            }}
            activeOpacity={0.4}
            className="w-20 h-20 bg-gray-100 rounded-xl flex justify-evenly p-0.5 flex-col items-center "
          >
            <Image source={img} className="h-[80%] w-[80%]" />
            <Text className="font-black text-[8px] text-gray-500 capitalize text-center">
              {text}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SquareBoxs;
