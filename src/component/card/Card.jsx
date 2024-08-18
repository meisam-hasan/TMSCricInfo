import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const Card = ({ children, ...props }) => (
    <View style={styles.cardContainer}>
        <View style={props.style || styles.cardContent}>{children}</View>
    </View>
);

Card.propTypes = {
    children: PropTypes.array.isRequired || PropTypes.element.isRequired,
    style: PropTypes.object,
};

const styles = StyleSheet.create({
    cardContainer: {
        shadowColor: "rgba(0, 0, 0, 1)",
        shadowRadius: 3,
        shadowOffset: { x: 0, y: 10 },
        shadowOpacity: 1,
        border: "blue",
        borderVerticalWidth: 10,
        alignSelf: "stretch",
        backgroundColor: "white",
        borderRadius: 10,
        marginHorizontal: 5,
        marginVertical: 5,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
    cardContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 20,
    },
});

export default Card;
