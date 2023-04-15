import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ServiceProviderHome from '../Home/Service Provider/ServiceProviderHome';

const Tab = createBottomTabNavigator();

function ServiceProvidernavigation() {
  return (
    <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{headerShown:false}}
    >
      <Tab.Screen options={{
        tabBarHideOnKeyboard:true
      }} name="Home" component={ServiceProviderHome} />
    </Tab.Navigator>
  );
}
export default ServiceProvidernavigation