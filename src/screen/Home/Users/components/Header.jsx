import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { View, TouchableWithoutFeedback, TextInput, Image, Keyboard, Animated, Easing, Text, TouchableOpacity } from 'react-native';
import { main } from "../../../../utils/colors";
import MapView, { Marker } from 'react-native-maps';
import GooglePlacesInput from './../../ServiceProvider/components/GooglePlacesAutocomplete';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from './../../../components/Button';
import { requestLocationPermission, getCurrentPostiton, getCurrentLocationWithLocality } from '../../../../helper/Location';
import { useNavigation } from '@react-navigation/native';
import { getCurrentLocation } from './../../../../helper/Location';
import { getData } from '../../../../helper/LocalStorage';
const Header = ({ func }) => {
  const navigation = useNavigation()
  const [inputSelected, setInputSelected] = useState(false);
  const [address, setAddress] = useState({
    address: '',
    locality: ''
  })
  useEffect(() => {
    // getCurrentLocationWithLocality()
    const getAddr = async () => {
      try {
        const address_formated = await getData('address_formated')
        const locality = await getData('locality')
        // console.log(address_formated)
        setAddress({
          address: address_formated,
          locality
        })
      } catch (e) {
        setAddress({
          address: "",
          locality: ""
        })
      }
    }
    getAddr()
  }, [])
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [animatedValue] = useState(new Animated.Value(0));
  const [fadeValue] = useState(new Animated.Value(1));
  const placeholders = ['Search for plumbers, carpenters, beautician', 'Try "Bulb Fixing 💡" or "Door bell Not.. 🛎"', 'Find Services in Just one Click', 'Search "Cupboard Cleaning"', "Try 'Jhadu Pocha' or 'khana Bna de'", "I want to take Massage 😣"];
  const refRBSheet = useRef()
  const mapRef = useRef()
  const [cords, setCords] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  })
  const handleRegionChange = useCallback((newCords) => {
    setCords(newCords);
    mapRef?.current?.animateToRegion(newCords, 3000);
  }, [])
  const getLiveLocation = async () => {
    const location = await requestLocationPermission()
    if (location === "granted") {
      const response = await getCurrentPostiton()
      handleRegionChange({
        latitude: response.latitude,
        longitude: response.longitude,
        latitudeDelta: 0.0002,
        longitudeDelta: 0.000001
      });
    }
  }
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const animatePlaceholder = () => {
    Animated.parallel([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 250,
        easing: Easing.cubic,
        useNativeDriver: false,
      }),
      Animated.timing(fadeValue, {
        toValue: 0,
        duration: 500,
        easing: Easing.cubic,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setPlaceholderIndex((placeholderIndex + 1) % placeholders.length);
      animatedValue.setValue(0);
      fadeValue.setValue(1);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      animatePlaceholder();
    }, 2000);

    return () => clearInterval(interval);
  }, [placeholderIndex]);
  const placeholderTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0],
  });

  const placeholderOpacity = fadeValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View className="bg-[#684DE9] w-full h-32 rounded-b-3xl p-2 flex" >
        <View className="flex flex-row items-center gap-2 mb-3" >
          <Image source={require('../assets/location.png')} className="w-8 h-8" />
          <View className="" >
            <Text className="text-white text-2xl font-black">{address.locality}</Text>
            <View className="flex flex-row items-center " >
              <Text className="text-white text-md font-semibold">{address.address.length > 32 ? `${address.address.slice(0, 36)}...` : address.address}</Text>
              <TouchableOpacity onPress={() => {
                refRBSheet.current.open()
                // await getLiveLocation()
              }} >
                <Image className="h-6 w-6" source={require("../assets/drop_down.png")} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Search')
        }} activeOpacity={0.7} className="h-10 w-full rounded-2xl bg-gray-100 flex flex-row items-center">
          <Image source={require('../assets/search.png')} className="w-5 h-5 mx-3" />
          <Animated.Text
            className="text-gray-600 font-bold"
            style={{
              transform: [{ translateY: placeholderTranslateY }],
              opacity: placeholderOpacity,
              // color:"#1c1c1c"
            }}>
            {placeholders[placeholderIndex]}
          </Animated.Text>
          {/* <TextInput className="h-full flex-1" style={{ fontSize: 16 }} /> */}
        </TouchableOpacity>
        <RBSheet
          height={500}
          dragFromTopOnly={true}
          animationType={'slide'}
          ref={refRBSheet}
          closeOnDragDown={true}
          // closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: main.primary,
              width: 70
            },
            container: {
              // backgroundColor: main.primary,
              paddingLeft: 10,
              paddingRight: 10,
              borderRadius: 20
            }
          }}
        >
          <GooglePlacesInput setCords={setCords} setAddress={setAddress} onChange={handleRegionChange} refRBSheet={refRBSheet} />
        </RBSheet>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Header;
