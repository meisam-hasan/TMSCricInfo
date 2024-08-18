import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MediumBlackText, SmallGreyText } from "../text/Text";
import Card from "../card/Card";
import AntDesign from "@expo/vector-icons/AntDesign";

const onClickPlayer =
    ({ navigation, id }) =>
    () =>
        navigation.navigate("Player", { id: id });

const NameCountry = ({ player }) => (
    <View style={styles.nameCountryContainer}>
        <MediumBlackText>{player?.name}</MediumBlackText>
        <SmallGreyText>{player?.country}</SmallGreyText>
    </View>
);

const Player = ({ player, navigation }) => (
    <TouchableOpacity
        style={styles.container}
        onPress={onClickPlayer({ navigation, id: player.id })}
    >
        <Card style={styles.cardContainer}>
            <NameCountry player={player} />
            <AntDesign name="right" size={32} color="black" />
        </Card>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    cardContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "stretch",
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingVertical: 10,
    },
    nameCountryContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
    },
});

export default Player;
