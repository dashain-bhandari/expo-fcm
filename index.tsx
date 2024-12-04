import { registerRootComponent } from 'expo';
import { Redirect } from 'expo-router';
import { View } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import "expo-router/entry"
function App() {


  // Set background message handler
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background:', remoteMessage);
  });
  return <Redirect href={"/+not-found"}></Redirect>;
}

registerRootComponent(App);
