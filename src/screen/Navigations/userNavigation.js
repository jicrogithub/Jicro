import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import { useFetch } from '../../suppliers/BackendInteractions/Fetch';
import UserHome from '../Home/Users/UserHome';
import { Loading } from './../Home/Users/components/Loading';
import { main } from './../../utils/colors';
import Bookings from './../Home/Users/Bookings';
import { useEffect, useState } from 'react';
import UserBottomNav from './Navbar/UserBottomNav';

const Tab = createBottomTabNavigator();

function UserNavigation() {
  const { data, getServices } = useFetch()
  const [fetch, setFetch] = useState(false)
  useEffect(() => {
    setFetch(true)
    getServices()
  }, [])
  return (
    <>
      {
        Object.keys(data).length !== 0 || fetch ? <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
          tabBar={props => <UserBottomNav {...props}/>}
        >
          <Tab.Screen options={{
            tabBarHideOnKeyboard: true
          }} name="Home" component={UserHome} />
          <Tab.Screen options={{
            tabBarHideOnKeyboard: true
          }} name="Bookings" component={Bookings} />
        </Tab.Navigator> : <Loading text={'Jicro'} delay={100} />
      }
    </>
  );
}

export default UserNavigation