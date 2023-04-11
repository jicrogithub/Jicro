import { View, Text,Image } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import {main} from "../../utils/colors"
import {setData,getData} from "../../helper/LocalStorage"

const OnBoarding = ({navigation}) => {
  return (
    <View className="flex-1 bg-black" >
      <Onboarding
      bottomBarColor={"#ececec"}
      showPagination={true}
      showSkip={false}
      titleStyles={{
        color:main.primary,
        fontWeight:900
      }}
      subTitleStyles={{
        fontSize:14,
        fontWeight:300
      }}
  pages={[
    {
      backgroundColor: main.bgColor,
      image: <Image style={{
        height:500
      }} source={require('./assets/1.png')} />,
      title: 'Services at Your Door Steps',
      subtitle: 'Discover and book top-rated service providers with ease of Jicro',
    },
    {
      backgroundColor: main.bgColor,
      image: <Image style={{
        height:500
      }} source={require('./assets/2.png')} />,
      title: 'Easy To Use',
      subtitle: 'No need of Complexity. Just One Tap Thing you Know 😎.',
    },
    {
      backgroundColor: main.bgColor,
      image: <Image style={{
        height:500
      }} source={require('./assets/3.png')} />,
      title: 'Lowest Price',
      subtitle: 'We pride ourselves on offering You the lowest prices Starting from just Rs.69.',
    },
  ]}
  onDone={()=>{
    setData("onBoarding","true")
    navigation.navigate("Auth")
  }}
/>
    </View>
  )
}

export default OnBoarding