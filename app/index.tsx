import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import messaging from "@react-native-firebase/messaging";

const App = () => {
    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        console.log(authStatus)
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL
        console.log("enabled", enabled)
        if (enabled) {
            return true;
        }
        else {
            return false
        }
    }

    useEffect(() => {
        const handleToken = async () => {
            let enabled = await requestUserPermission();
            if (enabled) {
                let token = messaging().getToken()
                console.log("token", token)
            }
            else {
                alert("permission not granted")
            }
        }
        handleToken()

        // Handle user opening the app from a notification (when the app is in the background)
        messaging().onNotificationOpenedApp((remoteMessage: any) => {
            console.log(
                "Notification caused app to open from background state:",
                remoteMessage.notification,

            );

        });

        // Check if the app was opened from a notification (when the app was completely quit)
        messaging()
            .getInitialNotification()
            .then((remoteMessage) => {
                if (remoteMessage) {
                    console.log(
                        "Notification caused app to open from quit state:",
                        remoteMessage.notification
                    );

                }
            });




        const unsubscribe = messaging().onMessage(
            async (remoteMessage) => {
                let msg = JSON.stringify(remoteMessage)
                alert(msg)
            }
        )

        return unsubscribe
    }, [])



    //register bg



    return (
        <View>
            <Text>fcmmm</Text>
        </View>
    )
}

export default App

const styles = StyleSheet.create({})