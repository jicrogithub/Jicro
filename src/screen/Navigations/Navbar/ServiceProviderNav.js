import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import ICON from "../../../icons/ICONS"

const windowWidth = Dimensions.get('window').width;

function ServiceProviderNav({ state, descriptors, navigation }) {
  let home = ICON.home;
  let wallet = ICON.wallet;
  let profile = ICON.profile;
  let services = ICON.booking;

  return (
    <View style={styles.mainView} className="bg-blue">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const dynamicTabStyle = {
          width: windowWidth / state.routes.length,
        };

        return (
          <TouchableOpacity
            activeOpacity={0.5}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.navTab, isFocused && styles.focusStyle, dynamicTabStyle]}
            key={route.name}
          >
            {/* for any specific type of file  */}
            {label == "Home" && <Image style={[styles.imgIcon , isFocused && styles.imgFocus]} source={home} />}
            {label == "Services" && <Image style={[styles.imgIcon , isFocused && styles.imgFocus]} source={services} />}
            {label =="Add Service" && <AddIcon/>}
            {label == "Profile" && <Image style={[styles.imgIcon , isFocused && styles.imgFocus]} source={profile} />}
            {label == "Wallet" && <Image style={[styles.imgIcon , isFocused && styles.imgFocus]} source={wallet} />}
            <Text className="text-green-950 text-xs opacity-60" style={[isFocused && styles.labelfocus]}>{!(label == 'Add Service') && label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const AddIcon = () => {
  return (
    <View className={`w-10 h-10  bg-primary flex items-center justify-center rounded-full`}>
      <Text className="font-medium text-5xl text-gray-400">+</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    padding: 3,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 15,
    backgroundColor:"#fff"
  },
  navTab: {
    height: 50,
    padding: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  focusStyle: {
    // backgroundColor:color.primary,
  },
  imgIcon: {
    width: 25,
    height: 25,
    opacity: 0.5
  },
  imgFocus: {
    tintColor: "#684DE9",
    opacity: 1.1
  },
  labelfocus: {
    color: "#684DE9",
    opacity: 1
  }
});

export default ServiceProviderNav;
