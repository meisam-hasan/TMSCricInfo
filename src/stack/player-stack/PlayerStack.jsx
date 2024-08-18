import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlayerListScreen from "../../screen/player-list/PlayerList";
import PlayerDetailsScreen from "../../screen/player-details/PlayerDetails";

const PlayerStack = createNativeStackNavigator();

const PlayerStackNavigator = () => (
    <PlayerStack.Navigator initialRouteName="Players">
        <PlayerStack.Screen
            name="Players"
            component={PlayerListScreen}
            options={{
                title: "Players",
                headerShown: false,
            }}
        />
        <PlayerStack.Screen
            name="Player"
            component={PlayerDetailsScreen}
            options={{
                title: "Player",
                headerShown: true,
            }}
        />
    </PlayerStack.Navigator>
);

export default PlayerStackNavigator;
