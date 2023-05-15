import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import ICON from "../../../icons/ICONS"

function UserBottomNav({ state, descriptors, navigation }) {
  let home = ICON.home;
  let booking = ICON.booking;
  return (
    <View style={style.mainView} className="bg-blue">
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
        return (
          <TouchableOpacity
            activeOpacity={0.5}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[style.navTab, isFocused && style.focusStyle]}
            key={route.name}
          >
            {label == "Home" && <Image style={[style.imgIcon , isFocused && style.imgFocus]} source={home} />}
            {label == "Bookings" && <Image style={[style.imgIcon , isFocused && style.imgFocus]} source={booking} />}
            <Text className="text-green-950 text-xs opacity-60" style={[isFocused && style.labelfocus]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default UserBottomNav;

const style = StyleSheet.create({
  mainView: {
    padding: 7,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 15,
  },
  navTab: {
    width: 100,
    height: 40,
    padding: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  imgIcon: {
    width: 28,
    height: 28,
    opacity:0.5
  },
  imgFocus: {
    tintColor: "#684DE9",
    opacity:1.1
  },
  labelfocus:{
    color:"#684DE9",
    opacity:1
  }
})
  // export default UserBottomNav;