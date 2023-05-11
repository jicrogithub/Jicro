import messaging from '@react-native-firebase/messaging';
import { setData } from './LocalStorage';
import { messagePopup } from './Message';

const requestPushNotificationPermision = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // 
  } else {
    await messaging().requestPermission();
  }
}

const getFcmToken = async () => {
  const token = await messaging().getToken()
  
  setData('fcm-token', token)
}
const suscribeToTopicFcm = async (topic) => {
  const token = await messaging().subscribeToTopic(topic)
  setData('fcm-token', token)
}
const pushNotification = () => {
  getFcmToken()
  messaging().onMessage(async (remoteMessage) => {
    const notification = remoteMessage;
    messagePopup(notification.notification.title, notification.notification.body,'success')
    // );
  });

  messaging().onNotificationOpenedApp((remoteMessage) => {
    
  });

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          JSON.stringify(remoteMessage)
        );
      }
    });
  // messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //   
  // });
}
export { requestPushNotificationPermision, getFcmToken, suscribeToTopicFcm, pushNotification }