import { View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SmallGreyText, LargeBlackText } from "../text/Text";
import Card from "../card/Card";
import setEventOrPermission from "../../lib/utils/eventUtils";
import { Country, MatchTypeDateRow } from "../common/Common";

const onClickReminder = (date) => {
    setEventOrPermission(date).then((_) => console.log("Reminder setting"));
};

const TeamsRow = ({ match }) => (
    <View style={styles.teamsRowContainer}>
        <Country country={match.t1} image={match?.t1img} />
        <LargeBlackText style={{ fontWeight: "bold" }}>VS</LargeBlackText>
        <Country
            country={match.t2}
            image={match?.t2img}
            direction="row-reverse"
        />
    </View>
);

const ReminderNotificationButtons = ({ match }) => (
    <View style={styles.reminderNotificationButtonsContainer}>
        <MaterialCommunityIcons
            name="reminder"
            size={24}
            color="black"
            onPress={() => onClickReminder(match)}
        />
    </View>
);

const MatchSchedule = ({ match }) => {
    console.log(match);
    return (
        <View style={styles.container}>
            <Card style={styles.cardContainer}>
                <SmallGreyText style={styles.seriesText}>
                    {match?.series}
                </SmallGreyText>
                <MatchTypeDateRow match={match} />
                <TeamsRow match={match} />
                <ReminderNotificationButtons match={match} />
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
        margin: 15,
    },
    rowContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        marginVertical: 5,
        marginHorizontal: 10,
    },
    statusText: {
        paddingLeft: 10,
        alignSelf: "stretch",
    },
    reminderNotificationButtonsContainer: {
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "flex-end",
        marginVertical: 5,
        marginHorizontal: 10,
    },
    seriesText: {
        textAlign: "center",
        //paddingHorizontal: 10,
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

export default MatchSchedule;
