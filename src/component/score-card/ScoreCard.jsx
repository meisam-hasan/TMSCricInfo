import { View } from "react-native";
import { SmallGreyText, MediumBlackText } from "../text/Text";
import Card from "../card/Card";
import { Country, MatchTypeDateRow } from "../common/Common";

const TeamScore = ({ match, index }) => (
    <View style={styles.teamsRowContainer}>
        <Country country={match[index]} image={match[index + "img"]} />
        <MediumBlackText>{match[index + "s"]}</MediumBlackText>
    </View>
);

const ScoreCard = ({ match }) => {
    return (
        <View style={styles.container}>
            <Card style={styles.cardContainer}>
                <SmallGreyText style={styles.seriesText}>
                    {match?.series}
                </SmallGreyText>
                <MatchTypeDateRow match={match} />
                <TeamScore match={match} index={"t1"} />
                <TeamScore match={match} index={"t2"} />
                <MediumBlackText style={styles.statusText}>
                    {match?.status}
                </MediumBlackText>
            </Card>
        </View>
    );
};

const styles = {
    container: {
        marginBottom: 15,
    },
    cardContainer: {
        flexDirection: "column",
        margin: 10,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
        marginHorizontal: 10,
    },
    statusText: {
        paddingLeft: 10,
        paddingTop: 10,
    },
    seriesText: {
        textAlign: "center",
        paddingHorizontal: 10,
        //alignSelf: "stretch",
    },
    teamsRowContainer: {
        flexDirection: "row",
        //alignItems: "center",
        marginTop: 10,
        marginHorizontal: 5,
        justifyContent: "space-between",
    },
};

export default ScoreCard;
