import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { launchImageLibrary } from "react-native-image-picker";
import { Camera, CameraPermissionStatus } from "react-native-vision-camera";
import DateTimePicker from "@react-native-community/datetimepicker";
import { main } from "../../../utils/colors";
import UniversalHeader from "../../components/Universalheader";
import Button from "./../../components/Button";
import { SUB_CATEGORIES } from "./export/SUB_CATEGORIES";
import { ScrollView } from "react-native-gesture-handler";
import { useUpload } from "../../../suppliers/BackendInteractions/Utils";

const DemandService = ({ navigation }) => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateNow, setDateNow] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const handleDateChange = (event, data) => {
    setShowDatePicker(false);
    if (data && event.type !== "dismissed") {
      const formattedDate = new Date(data).toLocaleString("en-IN");
      setDate(formattedDate);
      setShow(true);
    }
  };
  const { upload, uri, imageFor } = useUpload();
  const [image, setImage] = useState();
  return (
    <View className="w-full h-full mb-6 ">
      <UniversalHeader navigation={navigation} />
      <ScrollView className="p-1">
        <View
          style={main.shadows}
          className="bg-white  flex flex-col p-2 rounded-xl w-full mb-2"
        >
          {!image && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                launchImageLibrary({ noData: true }, (response) => {
                  if (response.assets) {
                    setImage(response.assets[0].uri);
                    upload(response.assets[0]);
                  }
                  if (response.didCancel) {
                    setImage("");
                  }
                });
              }}
              className="w-full h-44 bg-gray-200 rounded-2xl flex justify-center items-center mb-2"
            >
              <Text className="text-center font-black text-black text-2xl">
                Upload a Reference Picture
              </Text>
              <Text className="text-center font-semibold text-black text-md">
                Helps to Rank your Service
              </Text>
            </TouchableOpacity>
          )}
          {image && <TouchableOpacity onPress={()=>{
            launchImageLibrary({ noData: true }, (response) => {
              if (response.assets) {
                setImage(response.assets[0].uri);
                upload(response.assets[0]);
              }
              if (response.didCancel) {
                setImage("");
              }
            });
            }} className="w-full rounded-2xl h-44 bg-fray" >
            <Image className="w-full h-44 rounded-2xl" source={{ uri:image }} />
            </TouchableOpacity>}
          <View>
            <Text className="text-black text-lg font-semibold ml-1">
              Short Title
            </Text>
            <TextInput
              keyboardType="default"
              cursorColor={"#1c1c1c"}
              className=" rounded-xl h-12 text-black font-bold text-md px-2 mb-2 bg-gray-100"
              placeholder="Ex: Water Heater not Working"
              placeholderTextColor={"#3d3d3d"}
              onChangeText={(e) => {
                // setName(e)
              }}
            />
            <Text className="text-black text-lg font-semibold ml-1">
              Description
            </Text>
            <View className="w-full h-32 bg-gray-200 rounded-b-xl">
              <TextInput
                style={{
                  // height: 150,
                  justifyContent: "flex-start",
                  textAlignVertical: "top",
                }}
                onChangeText={(e) => {
                  // setNote(e);
                }}
                multiline={true}
                numberOfLines={4}
                underlineColorAndroid="transparent"
                cursorColor={main.primary}
                className="p-2 text-black text-md font-bold"
                placeholder="From 4 hours it is not working tried a lot..."
                placeholderTextColor={"#3d3d3d"}
              />
            </View>
            <Text className="text-black text-lg font-semibold ml-1">
              Budget
            </Text>
            <TextInput
              keyboardType="default"
              cursorColor={"#1c1c1c"}
              className=" rounded-xl h-12 text-black font-bold text-md px-2 mb-2 bg-gray-100"
              placeholder="Ex: 438"
              placeholderTextColor={"#3d3d3d"}
              onChangeText={(e) => {
                // setName(e)
              }}
            />

            <Text className="text-gray-700 text-lg font-black ml-1">
              Optional
            </Text>
            <SelectDropdown
              data={Object.keys(SUB_CATEGORIES).map((e) => {
                return e.split("_").length === 2
                  ? e[0].toUpperCase() + e.split("_").join(" ").slice(1)
                  : `${e[0].toUpperCase()}${e.slice(1)}`;
              })}
              className="w-full"
              defaultButtonText="Select a Category"
              onSelect={(selectedItem, index) => {
                setCategory(selectedItem.toLowerCase());
              }}
              buttonTextAfterSelection={useMemo((selectedItem, index) => {
                return selectedItem;
              }, [])}
              rowTextForSelection={useMemo((item, index) => {
                return item;
              }, [])}
              dropdownStyle={{
                borderRadius: 5,
                borderBottomColor: main.primary,
              }}
              buttonStyle={{
                width: "100%",
                marginTop: 10,
                borderRadius: 12,
                backgroundColor: main.primary,
              }}
              buttonTextStyle={{
                fontWeight: 700,
                color: "#fff",
                fontSize: 22,
              }}
            />
            {category && (
              <SelectDropdown
                data={SUB_CATEGORIES[category].map(({ text }) => {
                  return text[0].toUpperCase() + text.slice(1);
                })}
                className="w-full"
                defaultButtonText={`Select a ${
                  category[0].toUpperCase() + category.slice(1)
                } Sub Category`}
                onSelect={(selectedItem, index) => {
                  setSubCategory(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => selectedItem}
                rowTextForSelection={(item, index) => item}
                dropdownStyle={{
                  borderRadius: 5,
                  borderBottomColor: main.primary,
                }}
                buttonStyle={{
                  width: "100%",
                  marginTop: 10,
                  borderRadius: 12,
                  backgroundColor: main.primary,
                }}
                buttonTextStyle={{
                  fontWeight: 700,
                  color: "#fff",
                  fontSize: 22,
                }}
              />
            )}
            <Text className="text-black text-lg font-semibold ml-1">
              Schedule
            </Text>
            <Button
              func={() => {
                setShowDatePicker(true);
              }}
              text={`${show ? date : "Select Time"}`}
            />
          </View>

          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateNow}
              mode="time"
              is24Hour={false}
              display="default"
              onChange={handleDateChange}
              accentColor={"#000"}
              textColor={"#000"}
            />
          )}
        </View>
        <Button text="Post" />
      </ScrollView>
    </View>
  );
};

export default DemandService;
