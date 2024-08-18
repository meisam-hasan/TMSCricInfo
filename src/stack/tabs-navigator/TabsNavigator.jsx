//navigation for bottom tab
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import LiveScoreScreen from "../../screen/live-score/LiveScore";
import PlayerStackNavigator from "../player-stack/PlayerStack";
import ScheduleScreen from "../../screen/schedule/Schedule";
import Colors from "../../lib/constants/colors";

const Tabs = createBottomTabNavigator();

//bottom tab navigator
const TabsNavigator = () => {
    return (
        <Tabs.Navigator
            initialRouteName="LiveScore"
            screenOptions={{
                headerShown: false,
                // tabBarShowLabel: false,
                tabBarActiveTintColor: "#FF0000",
                tabBarInactiveTintColor: "#000000",
                tabBarStyle: {
                    backgroundColor: "white",
                    borderTopWidth: 1,
                    borderTopColor: "#DFDFDF",
                    elevation: 0,
                },
            }}
        >
            {/*tab for home*/}
            <Tabs.Screen
                name="LiveScore"
                component={LiveScoreScreen}
                options={{
                    tabBarLabel: ({ focused, color, size }) => (
                        <Text
                            style={{
                                color: focused ? Colors.primary : color,
                                fontWeight: "bold",
                            }}
                        >
                            Live Score
                        </Text>
                    ),
                    tabBarIcon: ({ focused, color, size }) => (
                        <MaterialIcons
                            name="sports-score"
                            size={focused ? size + 1 : size - 1}
                            color={color}
                        />
                    ),
                }}
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        if (route.state && route.state.routeNames.length > 0) {
                            navigation.navigate("LiveScore");
                        }
                    },
                })}
            />

            <Tabs.Screen
                name="PlayersTab"
                component={PlayerStackNavigator}
                options={{
                    tabBarLabel: ({ focused, color, size }) => (
                        <Text
                            style={{
                                color: focused ? Colors.primary : color,
                                fontWeight: "bold",
                                fontSize: focused ? 15 : 12,
                            }}
                        >
                            Players
                        </Text>
                    ),
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name="people"
                            size={focused ? size + 1 : size - 1}
                            color={color}
                        />
                    ),
                }}
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        if (route.state && route.state.routeNames.length > 0) {
                            navigation.navigate("PlayersTab", {
                                screen: "Players",
                            });
                        }
                    },
                })}
            />

            <Tabs.Screen
                name="Schedule"
                component={ScheduleScreen}
                options={{
                    tabBarLabel: ({ focused, color, size }) => (
                        <Text
                            style={{
                                color: focused ? Colors.primary : color,
                                fontWeight: "bold",
                                fontSize: focused ? 15 : 12,
                            }}
                        >
                            Schedule
                        </Text>
                    ),
                    tabBarIcon: ({ focused, color, size }) => (
                        <MaterialIcons
                            name="schedule"
                            size={focused ? size - 2 : size - 4}
                            color={color}
                        />
                    ),
                }}
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        if (route.state && route.state.routeNames.length > 0) {
                            navigation.navigate("Schedule");
                        }
                    },
                })}
            />
        </Tabs.Navigator>
    );
};

export default TabsNavigator;
