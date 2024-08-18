import { ScrollView, StyleSheet } from "react-native";
import LoaderScreen from "../../component/loader-screen/LoaderScreen";
import Header from "../../component/header/Header";
import { useEffect, useState } from "react";
import PlayerDetails from "../../component/player-details/PlayerDetails";
import playerDetails from "../../lib/data/player";
import { getPlayer } from "../../lib/data/dataRequest";
const getSelected = async (id) => {
    try {
        const selected = await getPlayer(id);
        return selected || playerDetails;
    } catch (e) {
        return playerDetails;
    }
};

const PlayerDetailsScreen = ({ route }) => {
    const { id } = route.params;
    const [loader, setLoader] = useState(false);
    const [title, setTitle] = useState("");
    const [player, setPlayer] = useState(playerDetails);
    console.log("Player id: ", id);
    const screenInit = async () => {
        setLoader(true);
        const selectedPlayer = await getSelected(id);
        //const selectedPlayer = playerDetails;
        setTitle(selectedPlayer.name);
        setPlayer(selectedPlayer);
        setLoader(false);
    };

    useEffect(() => {
        screenInit().then((_) => console.log("request success"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <LoaderScreen loader={loader} style={styles.screen}>
            <Header title={title} />
            <ScrollView horizontal={false}>
                <PlayerDetails player={player} />
            </ScrollView>
        </LoaderScreen>
    );
};

const styles = StyleSheet.create({
    screen: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 70,
    },
    listContainer: {
        width: "100%",
        margin: 10,
        padding: 10,
        height: "100%",
    },
});

export default PlayerDetailsScreen;
