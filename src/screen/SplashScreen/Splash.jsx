import { View, Text, Image, Animated } from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getData } from '../../helper/LocalStorage';
import { main } from '../../utils/colors';
import OnBoarding from './../OnBoarding/OnBoarding';

const LETTER_BOUNCE_DURATION = 700;

const BouncingText = ({ text, delay, onComplete }) => {
  const animatedValues = useRef(text.split('').map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animations = animatedValues.map((animatedValue, index) => {
      return Animated.sequence([
        Animated.delay(delay + index * 300),
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
  const underlineValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  const getDataFromAsyncStorage = () => {
    setTimeout(async () => {
      const onBoarding = await getData('onBoarding');
      const authUser = await getData('auth-user');
      const authServiceProvider = await getData('auth-service-provider');
      if (onBoarding && authUser === "true") {
        navigation.navigate("UserNavigation")
      } else if (onBoarding === "true" && authServiceProvider === "true" ) {
        navigation.navigate("ServiceProviderNavigation")
      }else if(onBoarding === "true"){
        navigation.navigate("Auth")
      }else {
        navigation.navigate("OnBoarding")
      }
    }, 4000)
  };


  const onBounceComplete = () => {
    Animated.timing(underlineValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

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
      <BouncingText text="Jicro" delay={1000} onComplete={onBounceComplete} />
      <Animated.View
        style={{
          borderBottomColor: '#fff',
          borderBottomWidth: 5,
          width: 220,
          // marginTop: 10,
          transform: [
            {
              scaleX: underlineValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ],
        }}
      />
    </View>
  );
};

export default Splash;
