import { FlatList, StyleSheet, View } from "react-native";
import LoaderScreen from "../../component/loader-screen/LoaderScreen";
import Header from "../../component/header/Header";
import { useEffect, useState } from "react";
import Player from "../../component/player/Player";
import savePlayers from "../../lib/data/players";
import { getPlayers } from "../../lib/data/dataRequest";

const PlayerList = ({ players, navigation, loadMore }) => (
    <View style={styles.listContainer}>
        <FlatList
            data={players}
            renderItem={({ item }) => (
                <Player player={item} navigation={navigation} />
            )}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onEndReached={loadMore}
            onEndReachedThreshold={0.35}
        />
    </View>
);

const getPlayerList = async (off = 0) => {
    try {
        const { data, offset } = await getPlayers(off);
        return data ? { data, offset } : { savePlayers: 0 };
    } catch (e) {
        return { savePlayers: 0 };
    }
};

const PlayerListScreen = ({ navigation }) => {
    const [loader, setLoader] = useState(false);
    const [players, setPlayers] = useState([]);
    const [offset, setOffset] = useState(0);
    const [totalRows, setTotalRows] = useState(0);

    const screenInit = async () => {
        setLoader(true);
        const { data, offset: off } = await getPlayerList();
        //const { data, offset } = await savePlayers;
        setPlayers(data);
        setTotalRows(off);
        setOffset(offset + 10);
        setLoader(false);
    };

    const loadMoreAsync = async () => {
        if (offset < totalRows) {
            const { data, offset: off } = await getPlayerList(parseInt(offset));
            if (off > 0) {
                setPlayers([...players, ...data]);
                setOffset(offset + 10);
            }
        }
    };

    const loadMore = async () => {
        loadMoreAsync().then((_) => console.log("More player loading"));
    };

    useEffect(() => {
        screenInit().then((_) => console.log("request success"));
    }, []);
    return (
        <LoaderScreen loader={loader} style={styles.screen}>
            <Header title="Players" />
            <PlayerList
                players={players}
                navigation={navigation}
                loadMore={loadMore}
            />
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

export default PlayerListScreen;
