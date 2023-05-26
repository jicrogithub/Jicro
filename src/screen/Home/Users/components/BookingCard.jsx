import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { main } from "./../../../../utils/colors";
import { useNavigation } from "@react-navigation/native";

const BookingCard = ({ title, price, status, images, orderID }) => {
  const navigation = useNavigation();
  const [color, setColor] = useState("");
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  useEffect(() => {
    if (status == "Pending") {
      setColor("#ff7b00");
    } else if (status == "On-Going") {
      setColor("#5d00ff");
    }
  }, [status]);
  console.log(windowHeight);
  return (
    <View style={{ paddingVertical: 5 }}>
      <View
        style={{
          elevation: 5,
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>
            {title}
          </Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                backgroundColor: color || "#fff",
                padding: 5,
                borderRadius: 10,
                fontSize: 12,
                marginRight: 5,
              }}
            >
              {status.toUpperCase()}
            </Text>
            <Text style={{ fontWeight: "bold", color: "#666" }}>
              Rs.{price.actual}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: main.primary,
              borderRadius: 10,
              marginTop: 10,
              padding: 5,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Order ID for Reference
            </Text>
            <View
              style={{
                backgroundColor: "#f0f0f0",
                borderRadius: 10,
                marginTop: 5,
                padding: 5,
              }}
            >
              <Text
                style={{
                  color: "#666",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 14,
                }}
              >
                {orderID}
              </Text>
            </View>
          </View>
        </View>
        <Image
          style={{ height: 100, width: windowWidth * 0.4, borderRadius: 10 }}
          source={{ uri: images }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          
        }}
      >
        {status !== "Pending" ? (
          <TouchableOpacity
          style={{
          }}
            onPress={() => {
              navigation.navigate("Tracking", {
                orderID,
              });
            }}
          >
            <Text
              style={{ fontWeight: "bold", color: main.primary, fontSize: 16 }}
            >
              Track
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              alert(
                "This Feature is Under Construction Please Accept the Order to Track Service Provider"
              );
            }}
          >
            <Text
              style={{ fontWeight: "bold", color: main.primary, fontSize: 16 }}
            >
              View Details
            </Text>
          </TouchableOpacity>
        )}
        <Text style={{ color: "#999", fontWeight: "bold" }}>|</Text>
        <TouchableOpacity>
          <Text
            style={{
              fontWeight: "bold",
              color: "#999",
              textDecorationLine: "underline",
              fontSize: 14,
            }}
          >
            Help?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingCard;
