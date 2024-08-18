import { View } from "react-native";
import { SmallGreyText, MediumBlackText } from "../text/Text";
import CircleImage from "../circle-image/CircleImage";
import { extractShortCode } from "../../lib/utils/utils";
import moment from "moment";

const MatchTypeDateRow = ({ match }) => (
    <View
        style={{
            ...styles.rowContainer,
            ...(match?.matchType ?? {
                justifyContent: "flex-end",
                alignItems: "stretch",
            }),
        }}
    >
        <SmallGreyText>
            {match?.matchType ? match?.matchType?.toUpperCase() : ""}
        </SmallGreyText>
        <SmallGreyText>
            {match?.dateTimeGMT &&
                moment(match?.dateTimeGMT).format("h:mm A, D MMM 'YY")}
        </SmallGreyText>
    </View>
);

const Country = ({ country, image, direction = "row" }) => (
    <View style={{ ...styles.countryContainer, flexDirection: direction }}>
        <CircleImage src={image} width={40} height={40} />
        <MediumBlackText
            style={{
                ...(direction === "row-reverse"
                    ? { paddingRight: 10 }
                    : { paddingLeft: 10 }),
            }}
        >
            {extractShortCode(country)}
        </MediumBlackText>
    </View>
);

export { MatchTypeDateRow, Country };

const styles = {
    rowContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        marginVertical: 5,
        marginHorizontal: 10,
    },
    countryContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
};
