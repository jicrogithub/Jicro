import axios from "axios";
import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { key } from "../constants/API_KEYS";

export const getCurrentPostiton = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          resolve(coords);
        },
        error => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000
        }
      );
    });
  };
  

export const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
        console.log("Requesting location permission for Android...");
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
            console.log("Location permission granted status:", granted);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Location permission granted by user");
                return "granted";
            } else {
                console.log("Location permission denied by user");
                return "denied";
            }
        } catch (error) {
            console.log("Error requesting location permission:", error);
            return error;
        }
    } else {
        console.log("No need to request location permission for iOS");
        // For iOS, no need to request permission as it is automatically requested
        return "granted";
    }
};

export const getCurrentLocation = async () => {
  const response = await getCurrentPostiton()
  return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${response.latitude},${response.longitude}&key=${key.google_maps_key}`)
    .then((e) => {
      return e.data.results[0].formatted_address
    })
}