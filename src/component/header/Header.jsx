import { SafeAreaView, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

const Header = ({ title }) => (
    <SafeAreaView style={styles.header}>
        <Text style={styles.title}>{title}</Text>
    </SafeAreaView>
);

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignSelf: "center",
        alignContent: "center",
        alignItems: "center",
    },
    title: {
        justifyContent: "center",
        fontSize: 24,
        fontStyle: "bold",
        color: "#000000",
        alignSelf: "center",
        alignContent: "center",
        alignItems: "center",
    },
});

export default Header;
