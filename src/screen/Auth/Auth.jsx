import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";
import { main } from "../../utils/colors";
import Seperator from "./components/Seperator";
import WhatsApp from "./components/WhatsApp";
import { useAuth } from "../../suppliers/BackendInteractions/Auth";
import { useEffect } from "react";
import {
  getCurrentLocationWithLocality,
  requestLocationPermission,
} from "../../helper/Location";
import {
  getCurrentLocation,
  getCurrentPostiton,
} from "./../../helper/Location";
import RBSheet from "react-native-raw-bottom-sheet";
import Button from "../components/Button";
import { useLoading } from "../../suppliers/StateManagement/Loading";
import {
  getFcmToken,
  requestPushNotificationPermision,
} from "../../helper/Notification";
import { getData } from "../../helper/LocalStorage";
import { useTestLogin } from "../../suppliers/BackendInteractions/Utils";
import { messagePopup } from "../../helper/Message";
const Auth = ({ navigation }) => {
  const { enabled } = useTestLogin();
  const [auth, setAuth] = useState(null);
  const {
    verifyUser,
    verifyServiceProvider,
    shouldNavigateUser,
    shouldNavigateServiceProvider,
    isError,
    verifyTest,
  } = useAuth();
  const { setLoading } = useLoading();
  const [status, setStatus] = useState(false);
  useEffect(() => {
    const getPermision = async () => {
      const permisionStatus = await requestLocationPermission();
      if (permisionStatus === "granted" || permisionStatus !== "denied") {
        const { address } = await getCurrentLocationWithLocality();
        if (address) {
          setStatus(false);
        }
      } else {
        setStatus(true);
        messagePopup(
          "Please Enable Location Permision",
          "We need Your Location to show Nearby Services, Please Enable it. To Continue",
          "danger"
        );
      }
    };
    getPermision();
  }, [status]);

  useEffect(() => {
    requestPushNotificationPermision();
    const checkFcmToken = async () => {
      const token = await getData("fcm-token");
      try {
        if (token) return;
        if (!token) {
          getFcmToken();
        }
      } catch (error) {}
    };
    checkFcmToken();
  }, []);
  useEffect(() => {
    if (isError) {
      setLoading(false);
    }
  }, [isError]);
  const refRBSheet = useRef();
  useEffect(() => {
    const linkingEvent = Linking.addEventListener("url", handleDeepLink);
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });
    return () => {
      linkingEvent.remove();
    };
  }, [handleDeepLink, auth]);
  const handleDeepLink = async (url) => {
    const regExp = /waId=([\w-]+)/;
    const match = url.url.match(regExp);
    if (match && auth === "Auth") {
      const waId = match[1];
      const address = await getCurrentLocation();
      const coords = await getCurrentPostiton();
      verifyUser(waId, {
        address,
        long: coords.longitude,
        lat: coords.latitude,
      });
    } else if (auth === "SPAuth") {
      const waId = match[1];
      verifyServiceProvider(waId);
    }
  };
  useEffect(() => {
    if (shouldNavigateUser) {
      navigation.replace("UserNavigation");
    } else if (shouldNavigateServiceProvider) {
      navigation.replace("ServiceProviderNavigation");
    }
  }, [shouldNavigateUser, shouldNavigateServiceProvider]);
  return (
    <View className="h-screen">
      <View className="w-full h-[60%] bg-[#684DE9] flex justify-center items-center">
        <Image className="w-84 h-84" source={require("./assets/namaste.gif")} />
      </View>
      <View
        style={main.shadows}
        className="h-[45%] w-full bg-white mt-[-20px] shadow-xl rounded-3xl py-8 px-2"
      >
        <Text className="text-[#684DE9] font-black text-6xl text-center">
          Welcome
        </Text>
        <Text className="text-gray-600 font-black text-lg text-center">
          How is Your Day Today?
        </Text>
        <Seperator text="Log in or Sign up" />
        {!enabled ? (
          <WhatsApp disabled={status} set={setAuth} setTO={"Auth"} />
        ) : (
          <Button
            func={() => {
              verifyTest(123456789);
            }}
            text="Play Console 'Test' Login"
          />
        )}
        <Seperator text="*" />
        {!enabled && (
          <TouchableOpacity
            disabled={status}
            onPress={() => {
              refRBSheet.current.open();
            }}
            activeOpacity={0.5}
            style={{
              backgroundColor: main.bgColor,
            }}
            className={`w-50 h-5 rounded-xl mt-1 flex justify-center items-center my-[-10px]`}
          >
            <Text className="text-gray-500 font-black text-lg">
              Continue as Service Provider
            </Text>
          </TouchableOpacity>
        )}
        <View className="p-6">
          <Text className="text-center text-gray-400">
            By Continuing as User You are agreeing Our
          </Text>
          <Text className="text-center text-gray-400 font-black">
            Terms and Conditions
          </Text>
        </View>
      </View>
      <RBSheet
        height={350}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: main.primary,
          },
          container: {
            borderRadius: 30,
          },
        }}
      >
        <View className="h-full w-full p-2">
          <Text className="text-[#684DE9] font-black text-6xl text-center">
            Welcome
          </Text>
          <Text className="text-gray-600 font-black text-sm text-center">
            How is Your business Going 🤗?
          </Text>
          <View className="my-3">
            <WhatsApp
              disabled={status}
              status={status}
              set={setAuth}
              setTO={"SPAuth"}
              bgColor={main.success}
              text={"Login with WhatsApp"}
            />
            <Seperator text="OR" />
            <Button
              func={() => {
                navigation.navigate("_Profile");
                refRBSheet.current.close();
              }}
              text={"Create an Account"}
            />
          </View>
          <View>
            <Text className="text-center text-gray-400 text-[11px]">
              By Continuing as Service Provider You are agreeing Our
            </Text>
            <Text className="text-center text-gray-400 font-black">
              Terms and Conditions
            </Text>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export default Auth;
