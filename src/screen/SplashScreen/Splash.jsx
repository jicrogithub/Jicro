import { View, Text, Image, Animated } from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getData } from '../../helper/LocalStorage';
import { main } from '../../utils/colors';
import OnBoarding from './../OnBoarding/OnBoarding';
import { useFetch } from '../../suppliers/BackendInteractions/Fetch';

const LETTER_BOUNCE_DURATION = 600;

const BouncingText = ({ text, delay, onComplete }) => {
  const animatedValues = useRef(text.split('').map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animations = animatedValues.map((animatedValue, index) => {
      return Animated.sequence([
        Animated.delay(delay + index * 200),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: LETTER_BOUNCE_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: LETTER_BOUNCE_DURATION,
          useNativeDriver: true,
        }),
      ]);
    });

    Animated.parallel(animations).start(onComplete);
  }, []);

  return (
    <View style={{ flexDirection: 'row' }}>
      {text.split('').map((letter, index) => (
        <Animated.Text
          key={`${letter}-${index}`}
          style={{
            fontWeight: '900',
            fontSize: 130,
            color: "#fff",
            transform: [{
              translateY: animatedValues[index].interpolate({
                inputRange: [0, 1],
                outputRange: [0, -25],
              })
            }],
          }}
        >
          {letter}
        </Animated.Text>
      ))}
    </View>
  );
};

const Splash = ({ navigation }) => {
  const { getSP, getServices, getOrders } = useFetch()
  const getServicesFromServer = async () => {
    const authUser = await getData('auth-user');
    const onBoarding = await getData('onBoarding');
    if (authUser && onBoarding === 'true') {
      getServices()
    }
  }
  const getServicesProviderInfoFromServer = async () => {
    const onBoarding = await getData('onBoarding');
    const authServiceProvider = await getData('auth-service-provider');
    if (authServiceProvider && onBoarding === 'true') {
      getSP();
      getOrders()
    }
  }
  useEffect(() => {
    getServicesFromServer()
    getServicesProviderInfoFromServer()
  }, [])
  const onBounceComplete = useCallback(() => {
    (async () => {
      const onBoarding = await getData('onBoarding');
      const authUser = await getData('auth-user');
      const authServiceProvider = await getData('auth-service-provider');
      if (onBoarding && authUser === "true") {
        navigation.replace("UserNavigation")
      } else if (onBoarding === "true" && authServiceProvider === "true") {
        navigation.replace("ServiceProviderNavigation");
      } else if (onBoarding === "true") {
        navigation.replace("Auth")
      } else {
        navigation.replace("OnBoarding")
      }
    })()
  })

  return (
    <View
      style={{
        backgroundColor: '#684DE9',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <BouncingText text="Jicro" delay={100} onComplete={onBounceComplete} />

    </View>
  );
};

export default Splash;
