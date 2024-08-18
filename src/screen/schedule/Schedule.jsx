import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Platform } from "react-native";
import Header from "../../component/header/Header";
import { getCurrentMatches } from "../../lib/data/dataRequest";
import LoaderScreen from "../../component/loader-screen/LoaderScreen";
import MatchSchedule from "../../component/match-schedule/MatchSchedule";
import matchSchedule from "../../lib/data/schedule";
import Constants from "expo-constants";

const MatchList = ({ matches, loadMore }) => (
    <View style={styles.listContainer}>
        <FlatList
            data={matches}
            renderItem={({ item }) => <MatchSchedule match={item} />}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
        />
    </View>
);

const filteredMatches = (matchList) =>
    matchList.filter((match) => match.status === "Match not started");

const getMatchScheduleData = async (off) => {
    try {
        const { data, offset } = await getCurrentMatches(off);
        return data
            ? { data: filteredMatches(data), offset }
            : { data: filteredMatches(matchSchedule), offset: 0 };
    } catch (e) {
        return { data: filteredMatches(matchSchedule), offset: 0 };
    }
};

function ScheduleScreen() {
    const [loader, setLoader] = useState(false);
    const [currentMatches, setCurrentMatches] = useState([]);
    const [offset, setOffset] = useState(0);
    const [totalRows, setTotalRows] = useState(0);

    const screenInit = async () => {
        setLoader(true);
        const { data, offset: off } = await getMatchScheduleData();
        //const { data, offset: off } = filteredMatches(matchSchedule);
        setCurrentMatches(data);
        setTotalRows(off);
        setOffset(offset + 50);
        setLoader(false);
    };

    const loadMoreAsync = async () => {
        if (offset < totalRows) {
            const { data, offset: off } = await getCurrentMatches(
                parseInt(offset)
            );
            if (off > 0) {
                setCurrentMatches([...currentMatches, ...data]);
                setOffset(offset + 50);
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
            <Header title={"Match Schedule"} />
            <MatchList matches={currentMatches} loadMore={loadMore} />
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
        backgroundColor: "white",
        marginBottom: 70,
        marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    },
    listContainer: {
        width: "100%",
        margin: 10,
        padding: 10,
        height: "100%",
    },
});

export default ScheduleScreen;
