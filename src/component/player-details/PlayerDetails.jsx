import { StyleSheet, View } from "react-native";
import CircleImage from "../circle-image/CircleImage";
import { MediumBlackText, SmallBlackText, SmallGreyText } from "../text/Text";
import StatTable from "../stat-table/StatTable";
import {
    BattingStatsConstant,
    BattingStatsRunsConstant,
    BowlingStatsConstant,
    BowlingStatsRunsConstants,
    getTableArray,
    MatchType,
} from "../../lib/utils/statUtils";
import moment from "moment";
import { getPlayerAge } from "../../lib/utils/dateUtils";

const SmallGreyDobuleRow = ({ first, second }) => (
    <View
        style={{
            ...styles.rowContainer,
        }}
    >
        <SmallGreyText>{first}</SmallGreyText>
        <SmallGreyText>{second}</SmallGreyText>
    </View>
);

const SkillStyle = ({ skill, skillStyle, style = {} }) => (
    <View
        style={{
            ...styles.skillContainer,
            ...style,
        }}
    >
        <MediumBlackText style={{ fontWeight: "bold" }}>
            {skill}
        </MediumBlackText>
        <MediumBlackText>{skillStyle}</MediumBlackText>
    </View>
);

const AgeRow = ({ player }) => (
    <SmallGreyDobuleRow
        first={"Age : " + getPlayerAge(player.dateOfBirth)}
        second={"DOB : " + moment(player.dateOfBirth).format("D MMM 'YY")}
    />
);

const BattingStatTable = ({ player }) => (
    <StatTable
        head={["", ...BattingStatsConstant]}
        title={MatchType.map((type) => type.toUpperCase())}
        data={getTableArray(player?.stats, "batting", BattingStatsConstant)}
    />
);

const BattingRunStatTable = ({ player }) => (
    <StatTable
        head={["", ...BattingStatsRunsConstant]}
        title={MatchType.map((type) => type.toUpperCase())}
        data={getTableArray(player?.stats, "batting", BattingStatsRunsConstant)}
        headFlex={[1, 1, 1, 1, 1, 1, 1]}
        rowsFlex={[1, 1, 1, 1, 1, 1]}
    />
);

const BowlingStatTable = ({ player }) => (
    <StatTable
        head={["", ...BowlingStatsConstant]}
        title={MatchType.map((type) => type.toUpperCase())}
        data={getTableArray(player?.stats, "bowling", BowlingStatsConstant)}
    />
);

const BowlingRunStatTable = ({ player }) => (
    <StatTable
        head={["", ...BowlingStatsRunsConstants]}
        title={MatchType.map((type) => type.toUpperCase())}
        data={getTableArray(
            player?.stats,
            "bowling",
            BowlingStatsRunsConstants
        )}
        headFlex={[1, 1, 1, 1, 1]}
        rowsFlex={[1, 1, 1, 1]}
    />
);

const PlayerDetails = ({ player }) => {
    return (
        <View style={styles.container}>
            <CircleImage src={player?.playerImg} size={100} />
            <SmallBlackText style={{ marginTop: 10 }}>
                {player?.country}
            </SmallBlackText>
            <AgeRow player={player} />
            <SkillStyle skillStyle={player?.battingStyle} skill={"Batting"} />
            <BattingStatTable player={player} />
            <BattingRunStatTable player={player} />
            <SkillStyle
                skillStyle={player?.bowlingStyle}
                skill={"Bowling"}
                style={{ marginVertical: 10 }}
            />
            <BowlingStatTable player={player} />
            <BowlingRunStatTable player={player} />
        </View>
    );
};

export default PlayerDetails;

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
        width: "100%",
        marginTop: 10,
        flexDirection: "column",
        alignItems: "center",
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    skillContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        paddingBottom: 5,
        paddingHorizontal: 10,
    },
});
