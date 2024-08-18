import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import Toast from "react-native-root-toast";
import { useRef, useState } from "react";
import { Platform } from "react-native";

const setBackgroundNotification = () => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });
};

async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: "default",
        title: "Original Title",
        body: "And here is the body!",
        data: { someData: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    });
}

function handleRegistrationError(errorMessage) {
    Toast.show(errorMessage);
    throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            handleRegistrationError(
                "Permission not granted to get push token for push notification!"
            );
            return;
        }
        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ??
            Constants?.easConfig?.projectId;
        if (!projectId) {
            handleRegistrationError("Project ID not found");
        }
        try {
            const pushTokenString = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            console.log(pushTokenString);
            return pushTokenString;
        } catch (e) {
            handleRegistrationError(`${e}`);
        }
    } else {
        handleRegistrationError(
            "Must use physical device for push notifications"
        );
    }
}

function useNotification() {
    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState(undefined);
    const notificationListener = useRef(undefined);
    const responseListener = useRef(undefined);

    const registerNotification = () => {
        registerForPushNotificationsAsync()
            .then((token) => {
                setExpoPushToken(token ?? "");
                console.log(token, "Expo push token");
            })
            .catch((error) => setExpoPushToken(`${error}`));

        notificationListener.current =
            Notifications.addNotificationReceivedListener((note) => {
                setNotification(note);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    console.log(response);
                }
            );
    };

    const removeNotification = () => {
        notificationListener.current &&
            Notifications.removeNotificationSubscription(
                notificationListener.current
            );
        responseListener.current &&
            Notifications.removeNotificationSubscription(
                responseListener.current
            );
    };

    return {
        token: expoPushToken,
        notification,
        registerNotification,
        removeNotification,
    };
}

export default useNotification;
export { setBackgroundNotification, sendPushNotification };
