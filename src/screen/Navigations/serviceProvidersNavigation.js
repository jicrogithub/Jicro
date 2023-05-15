import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddService from '../Home/ServiceProvider/AddService';
import Profile from '../Home/ServiceProvider/Profile';
import ServiceProviderHome from './../Home/ServiceProvider/ServiceProviderHome';
import Wallet from './../Home/ServiceProvider/Wallet';
import ListedServices from './../Home/ServiceProvider/ListedServices';
import ServiceProviderNav from './Navbar/ServiceProviderNav';

const Tab = createBottomTabNavigator();

function ServiceProviderNavigation() {
  return (
    <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{headerShown:false}}
    tabBar={props => <ServiceProviderNav {...props}/>}
    >
      <Tab.Screen options={{
        tabBarHideOnKeyboard:true
      }} name="Home" component={ServiceProviderHome} />
      <Tab.Screen options={{
        tabBarHideOnKeyboard:true
      }} name="Services" component={ListedServices} />
      <Tab.Screen options={{
        tabBarHideOnKeyboard:true
      }} name="Add Service" component={AddService} />
      <Tab.Screen options={{
        tabBarHideOnKeyboard:true
      }} name="Wallet" component={Wallet} />
      <Tab.Screen options={{
        tabBarHideOnKeyboard:true
      }} name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default ServiceProviderNavigation