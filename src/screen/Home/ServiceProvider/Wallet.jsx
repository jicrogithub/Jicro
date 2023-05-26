// import { View, Text, ScrollView, Animated } from "react-native";
// import React, { useEffect, useRef } from "react";
// import { main } from "./../../../utils/colors";
// import LinearGradient from "react-native-linear-gradient";
// import Button from "../../components/Button";
// import Transaction from "./components/Transaction";

// const Wallet = () => {
//   return (
//     <ScrollView className="bg-white h-screen w-full p-2">
//       <LinearGradient
//         colors={["#f46b45", "#eea849"]}
//         // style={styles.background}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         className="w-full h-44 bg-black rounded-xl flex justify-evenly items-center felx-col"
//       >
//         <View className="flex flex-row justify-center items-center w-full ">
//           <Text className="text-2xl text-white font-bold pr-2">
//             Current Balance
//           </Text>
//           <Text className="px-2 py-1 rounded-xl bg-amber-200 text-black text-lg font-bold">
//             $500
//           </Text>
//         </View>
//         <View className="flex flex-row justify-center items-center w-full ">
//           <Text className="text-lg text-white font-bold pr-2">
//             Total Balance
//           </Text>
//           <Text className="px-2 py-1 rounded-xl bg-green-200 text-black text-md font-bold">
//             $5100
//           </Text>
//         </View>
//         <View className="w-full px-2">
//           <Button text="Withdraw" />
//         </View>
//       </LinearGradient>
//       <View className="p-2" >
//             <Text className="font-black text-gray-500 text-xl" >History</Text>
//             <Transaction/>
//       </View>
//     </ScrollView>
//   );
// };

// export default Wallet;

import { View, Text, Image } from "react-native";
import React from "react";

const Wallet = () => {
  return (
    <View className="w-full h-full bg-white flex-col justify-center items-center">
      <Image className="h-52 w-52" source={require("./assets/nothing.gif")} />
      <Text className="text-lg text-gray-700 font-black">Comming Soon :)</Text>
    </View>
  );
};

export default Wallet;
