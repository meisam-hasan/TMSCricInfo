import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Platform } from "react-native";
import Header from "../../component/header/Header";
import ScoreCard from "../../component/score-card/ScoreCard";
import LoaderScreen from "../../component/loader-screen/LoaderScreen";
import matchSchedule from "../../lib/data/schedule";
import { getCurrentMatches } from "../../lib/data/dataRequest";
import Constants from "expo-constants";

const MatchList = ({ matches }) => (
    <View style={styles.listContainer}>
        <FlatList
            data={matches}
            renderItem={({ item }) => <ScoreCard match={item} />}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        />
    </View>
);

const filteredMatches = (matchList) =>
    matchList.filter((match) => match.status !== "Match not started");

const getLiveScoreData = async () => {
    try {
        const { data, offset } = await getCurrentMatches();
        return data
            ? { data: filteredMatches(data), offset }
            : { data: filteredMatches(matchSchedule), offset: 0 };
    } catch (e) {
        return { data: filteredMatches(matchSchedule), offset: 0 };
    }
};

function LiveScoreScreen() {
    const [loader, setLoader] = useState(false);
    const [currentMatches, setCurrentMatches] = useState([]);
    const [timeOutClear, setTimeOutClear] = useState(null);

    const getLiveScore = () => {
        setTimeOutClear(
            setTimeout(() => {
                updateList().then(() => console.log("Refresing data."));
            }, 60000)
        );
    };

    const updateList = async () => {
        const { data, offset: off } = await getLiveScoreData();
        //const { data, offset: off } = await getLiveScoreData();
        setCurrentMatches(data);
    };

    const componentDidUnMount = () => {
        clearTimeout(timeOutClear);
    };

    const screenInit = async () => {
        setLoader(true);
        const { data, offset: off } = await getLiveScoreData();
        //const { data, offset: off } = await getLiveScoreData();
        setCurrentMatches(data);
        setLoader(false);
        getLiveScore();
    };
    useEffect(() => {
        screenInit().then((_) => console.log("request success"));

        return componentDidUnMount;
    }, []);
    return (
        <LoaderScreen loader={loader} style={styles.screen}>
            <Header title={"Live Scores"} />
            <MatchList matches={currentMatches} />
        </LoaderScreen>
    );
}

// MatchList.propTypes = {
//     matches: PropTypes.array.isRequired,
// };

const styles = StyleSheet.create({
    screen: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 70,
        marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
        backgroundColor: "white",
    },
    listContainer: {
        width: "100%",
        margin: 10,
        padding: 10,
        height: "100%",
    },
});

export default LiveScoreScreen;
