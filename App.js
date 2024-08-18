import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootSiblingParent } from "react-native-root-siblings";
import useNotification, {
    setBackgroundNotification,
} from "./src/lib/utils/notificationUtils";
import { useEffect } from "react";
import TabsNavigator from "./src/stack/tabs-navigator/TabsNavigator";
import { StatusBar } from "expo-status-bar";

setBackgroundNotification();

const Stack = createNativeStackNavigator();

export default function App() {
    const { token, registerNotification, removeNotification } =
        useNotification();

    useEffect(() => {
        registerNotification();
        return removeNotification;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <RootSiblingParent>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Tabs"
                        component={TabsNavigator}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </RootSiblingParent>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
