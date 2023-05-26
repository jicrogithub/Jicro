import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useCallback } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import Button from "../../components/Button";
import { main } from "../../../utils/colors";
import Carousel from "./components/Carousel";
import UniversalHeader from "../../components/Universalheader";
import { useData } from "../../../suppliers/StateManagement/DataTransfer";
import { useEffect } from "react";
import { useUpload } from "../../../suppliers/BackendInteractions/Utils";
import { messagePopup } from "./../../../helper/Message";
import SelectDropdown from "react-native-select-dropdown";
import { SUB_CATEGORIES } from "../Users/export/SUB_CATEGORIES";
import { useFetch } from "../../../suppliers/BackendInteractions/Fetch";
// import { useFetch } from "../../../../../../../Downloads/src/src/suppliers/BackendInteractions/Fetch";
const AddService = ({ navigation }) => {
  const { data } = useFetch();
  const { setData, shouldRedirect, setRedirect } = useData();
  const { upload, uri, imageFor } = useUpload();
  useEffect(() => {
    if (shouldRedirect) navigation.navigate("Preview");
  }, [shouldRedirect, navigation]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [note, setNote] = useState("");
  const [images, setImages] = useState([]);
  const [included, setIncluded] = useState(1);
  const [includedLists, setIncludedLists] = useState([]);
  const [notIncluded, setNotIncluded] = useState(1);
  const [notIncludedLists, setNotIncludedLists] = useState([]);
  const includedTextInputRef = useRef([]);
  const notIncludedTextInputRef = useRef([]);
  const [count, setCount] = useState(0);
  const [imagesUploaded, setImagesUploaded] = useState(false);
  const [check, setCheck] = useState(false);
  // useEffect(() => {
  //   if (check) {
  //     setTitle("");
  //     setPrice("");
  //     setSubCategory("");
  //     setNote("");
  //     setImages([]);
  //     setNotIncludedLists([]);
  //     setIncludedLists([]);
  //     setIncluded(1);
  //     // includedTextInputRef([]);
  //     // notIncludedTextInputRef([]);
  //     setNotIncluded(1);
  //     setCount(0);
  //     setImagesUploaded(false);
  //   }
  // }, [check]);
  const handleTextInputBlur = useCallback((index, text, type) => {
    if (type === "included") {
      setIncludedLists((includedLists) => {
        const newList = [...includedLists];
        newList[index] = text;
        return newList;
      });
    } else {
      setNotIncludedLists((notIncludedLists) => {
        const newList = [...notIncludedLists];
        newList[index] = text;
        return newList;
      });
    }
  }, []);

  const handleAddButtonPress = useCallback((type) => {
    if (type === "included") {
      setIncluded((included) => {
        const newIncluded = included + 1;
        includedTextInputRef.current[newIncluded] = React.createRef();
        return newIncluded;
      });
    } else {
      setNotIncluded((notIncluded) => {
        const newNotIncluded = notIncluded + 1;
        notIncludedTextInputRef.current[newNotIncluded] = React.createRef();
        return newNotIncluded;
      });
    }
  }, []);

  const handleRemoveButtonPress = useCallback((index, type) => {
    if (type === "included") {
      setIncludedLists((includedLists) => {
        const newList = [...includedLists];
        newList.splice(index, 1);
        return newList;
      });
      setIncluded((included) => included - 1);
    } else {
      setNotIncludedLists((notIncludedLists) => {
        const newList = [...notIncludedLists];
        newList.splice(index, 1);
        return newList;
      });
      setNotIncluded((notIncluded) => notIncluded - 1);
    }
  }, []);
  let copy = [...images];
  useEffect(() => {
    if (imageFor !== "") {
      copy[imageFor] = uri;
      setImages(copy);
    }
  }, [imageFor]);
  useEffect(() => {
    const checkEveryImagesUploaded = images.every((element) =>
      element?.startsWith("https://res")
    );
    if (checkEveryImagesUploaded) {
      setImagesUploaded(true);
    } else {
      setImagesUploaded(false);
    }
  }, [images]);

  return (
    <View className="w-full h-full bg-white">
      <UniversalHeader />
      <ScrollView className="mt-2 h-full w-full bg-white p-2  ">
        {images.length === 0 && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              launchImageLibrary({ noData: true }, (response) => {
                if (response.assets) {
                  setCount(count + 1);
                  setImages([...images, response.assets[0].uri]);
                  upload(response.assets[0], count);
                }
                if (response.didCancel) {
                  setImages([...images]);
                }
              });
            }}
            className="w-full h-44 bg-gray-600 rounded-2xl flex justify-center items-center mb-2"
          >
            <Text className="text-center font-bold text-white text-3xl">
              Upload Service Picture
            </Text>
            <Text className="text-center font-light text-white text-md">
              Helps to Rank your Service
            </Text>
          </TouchableOpacity>
        )}
        {images.length > 0 && (
          <View className="mb-2">
            <Carousel images={images || []} />
            <Button
              func={() => {
                launchImageLibrary({ noData: true }, (response) => {
                  if (response.assets) {
                    setImages([...images, response.assets[0].uri]);
                    setCount(count + 1);
                    upload(response.assets[0], count);
                    // imageFor === "banner" && setImage({ ...image, banner: uri })
                  }
                  if (response.didCancel) {
                    setImages([...images]);
                  }
                });
              }}
              text="Add more Images"
            />
            <Button
              func={() => {
                setImages([]);
              }}
              text="Clear"
            />
          </View>
        )}
        <TextInput
          keyboardType="default"
          onChangeText={(e) => {
            setTitle(e);
          }}
          cursorColor={"#1c1c1c"}
          className="bg-gray-200 rounded-xl p-2
                text-zinc-700  
                font-bold text-md mb-2"
          placeholder="Title of Service [ex: Water Tap Fitting] "
          placeholderTextColor={"#464647"}
        />
        <TextInput
          keyboardType="phone-pad"
          onChangeText={(e) => {
            setPrice(e);
          }}
          cursorColor={"#1c1c1c"}
          className="bg-gray-200 rounded-xl p-2 
                text-zinc-700 font-bold text-md mb-2"
          placeholder="Price of Service"
          placeholderTextColor={"#464647"}
        />
        <SelectDropdown
          data={SUB_CATEGORIES[
            data.profession.split(" ").length === 2
              ? data.profession.split(" ").join("_")
              : data.profession
          ].map(({ text }) => {
            return text[0].toUpperCase() + text.slice(1);
          })}
          className="w-full"
          defaultButtonText={`Select a Sub Category`}
          onSelect={(selectedItem, index) => {
            setSubCategory(selectedItem.toLowerCase());
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
        <View className="px-1">
          <Text className="font-black text-gray-500 text-lg">
            Details for Service
          </Text>
          <View
            style={main.shadows}
            className="h-min-96 w-full p-1 bg-white rounded-xl"
          >
            <View>
              <View className="flex flex-row items-center">
                <Image
                  className="w-14 h-14"
                  source={require("./assets/plus.gif")}
                />
                <Text className="font-black text-gray-700 text-xl">
                  Included in Service
                </Text>
              </View>
              {Array.from({ length: included }).map((e, i) => (
                <View
                  key={i}
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <TextInput
                    keyboardType="default"
                    cursorColor={"#1c1c1c"}
                    onChangeText={(text) => {
                      handleTextInputBlur(i, text, "included");
                    }}
                    onBlur={() => {
                      includedTextInputRef.current[i].blur();
                    }}
                    className="w-[80%] bg-gray-200 rounded-xl p-2 text-zinc-700 font-bold text-md mb-2"
                    placeholder="Write Something that is Included"
                    placeholderTextColor={"#464647"}
                    ref={(ref) => {
                      includedTextInputRef.current[i] = ref;
                    }}
                  />
                  {i === 0 && (
                    <TouchableOpacity
                      onPress={() => {
                        handleAddButtonPress("included");
                      }}
                      className={`w-10 h-10 bg-[${main.primary}] rounded-full flex justify-center items-center`}
                    >
                      <Text className="text-3xl font-black text-white">+</Text>
                    </TouchableOpacity>
                  )}
                  {i > 0 && (
                    <TouchableOpacity
                      onPress={() => {
                        handleRemoveButtonPress(i, "included");
                      }}
                      className={`w-10 h-10 bg-red-500 rounded-full flex justify-center items-center`}
                    >
                      <Text className="text-3xl font-black text-white">-</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
            <View className="flex flex-row items-center">
              <Image
                className="w-14 h-14"
                source={require("./assets/minus.gif")}
              />
              <Text className="font-black text-gray-700 text-xl">
                Not Included in Service
              </Text>
            </View>
            {Array.from({ length: notIncluded }).map((e, i) => {
              return (
                <View
                  key={i}
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <TextInput
                    keyboardType="default"
                    onChangeText={(text) => {
                      handleTextInputBlur(i, text, "notIncluded");
                    }}
                    onBlur={() => {
                      notIncludedTextInputRef.current[i].blur();
                    }}
                    cursorColor={"#1c1c1c"}
                    className="w-[80%] bg-gray-200 rounded-xl p-2 text-zinc-700 font-bold text-md mb-2"
                    placeholder="Write Something that is Not Included"
                    placeholderTextColor={"#464647"}
                    ref={(ref) => {
                      notIncludedTextInputRef.current[i] = ref;
                    }}
                  />
                  {i === 0 && (
                    <TouchableOpacity
                      onPress={() => {
                        handleAddButtonPress("notIncluded");
                      }}
                      className={`w-10 h-10 bg-[${main.primary}] rounded-full flex justify-center items-center`}
                    >
                      <Text className="text-3xl font-black text-white">+</Text>
                    </TouchableOpacity>
                  )}
                  {i > 0 && (
                    <TouchableOpacity
                      onPress={() => {
                        handleRemoveButtonPress(i, "notIncluded");
                      }}
                      className={`w-10 h-10 bg-red-500 rounded-full flex justify-center items-center`}
                    >
                      <Text className="text-3xl font-black text-white">-</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
            <View className="w-full h-32 bg-gray-200 rounded-b-xl">
              <TextInput
                style={{
                  // height: 150,
                  justifyContent: "flex-start",
                  textAlignVertical: "top",
                }}
                onChangeText={(e) => {
                  setNote(e);
                }}
                multiline={true}
                numberOfLines={4}
                underlineColorAndroid="transparent"
                cursorColor={main.primary}
                className="p-2 text-black text-md font-bold"
                placeholder="Add some Important Informations or Note"
                placeholderTextColor={"#3d3d3d"}
              />
            </View>
          </View>
        </View>
        <View className="mb-3">
          <Button
            func={() => {
              if (
                title !== "" &&
                price !== 0 &&
                // images.length !== 0 &&
                includedLists.length !== 0 &&
                note &&
                // imagesUploaded === true,
                subCategory
              ) {
                if (images.length !== 0 && imagesUploaded) {
                  setRedirect(true);
                  setCheck(true);
                  setData({
                    title,
                    price,
                    images: images,
                    includedLists,
                    notIncludedLists,
                    note: note,
                    sub_category: subCategory,
                    category: data.profession,
                  });
                } else {
                  setRedirect(true);
                  setCheck(true);
                  setData({
                    title,
                    price,
                    images: images,
                    includedLists,
                    notIncludedLists,
                    note: note,
                    sub_category: subCategory,
                    category: data.profession,
                  });
                }
                // setImages([])
              } else {
                imagesUploaded
                  ? messagePopup(
                      "Please Add All the Details",
                      "Seems You Did'nt Added All The Details",
                      "danger"
                    )
                  : messagePopup(
                      "Please wait for Images to Upload",
                      "",
                      "info"
                    );
              }
            }}
            text="Add"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddService;
