import axios from "axios";
import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { key } from "../constants/API_KEYS";
import { getData, setData } from "./LocalStorage";

export const getCurrentPostiton = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          heading:position.coords.heading
        };
        resolve(coords);
      },
      error => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 10000,
        forceRequestLocation:true,
        accuracy:{
          android:true
        }
      }
    );
  });
};


export const requestLocationPermission = async () => {
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "App needs access to your location",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return "granted";
      } else {
        return "denied";
      }
    } catch (error) {
      return error;
    }
  } else {
    return "granted";
  }
};

export const getCurrentLocation = async () => {
  const address_formated = await getData('address_formated');
  if (!address_formated) {
    const response = await getCurrentPostiton()
    
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${response.latitude},${response.longitude}&key=${key.google_maps_key}`)
      .then(async (e) => {
        await setData('address_formated', e.data.results[0].formatted_address)
        return e.data.results[0].formatted_address
      })
  }
  return address_formated
}
export const getCurrentLocationWithLocality = async () => {
  const addressFormatted = await getData('address_formatted');
  const locality = await getData('locality');
  if (!addressFormatted || !locality) {
    try {
      const currentPosition = await getCurrentPostiton();
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentPosition.latitude},${currentPosition.longitude}&key=${key.google_maps_key}`);
      const formattedAddress = response.data.results[0].formatted_address;
      const addressComponents = response.data.results[0].address_components;
      const currentLocality = addressComponents.find(component => component.types.includes('locality')).long_name;
      console.log("currentLocality")
      await setData('address_formatted', formattedAddress);
      await setData('locality', currentLocality);
      return {
        address: formattedAddress,
        locality: currentLocality
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get current location with locality');
    }
  } else {
    return {
      address: addressFormatted,
      locality: locality
    };
  }
};


function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

export async function getDistance(longitude, latitude) {
  const coords = await getCurrentPostiton()
  const earthRadius = 6371; // Radius of the earth in km
  const dLat = deg2rad(latitude - coords.latitude);
  const dLon = deg2rad(longitude - coords.longitude);

  const a = Math.pow(Math.sin(dLat / 2), 2) +
    Math.cos(deg2rad(coords.longitude)) * Math.cos(deg2rad(latitude)) *
    Math.pow(Math.sin(dLon / 2), 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const calculatedDistance = (earthRadius * c).toFixed(2)
  const distance = calculatedDistance < 1 ? calculatedDistance : calculatedDistance * 1000
  return {
    distance
  };
}
