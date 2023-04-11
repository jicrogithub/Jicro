import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ServiceProviderHome from '../Home/Service Provider/ServiceProviderHome';


const Tab = createBottomTabNavigator();

function ServiceProvidernavigation() {
  return (
    <Tab.Navigator
    initialRouteName="ServiceProviderHome"
    screenOptions={{headerShown:false}}
    >
      <Tab.Screen name="ServiceProviderHome" component={ServiceProviderHome} />
    </Tab.Navigator>
  );
}
export default ServiceProvidernavigation