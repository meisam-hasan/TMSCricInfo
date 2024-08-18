import { StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

const SmallGreyText = ({ children = "", ...props }) => (
    <Text style={{ ...styles.smallGreyText, ...props.style }}>{children}</Text>
);

const SmallBlackText = ({ children = "", ...props }) => (
    <Text style={{ ...styles.smallBlackText, ...props.style }}>{children}</Text>
);
const MediumBlackText = ({ children = "", ...props }) => (
    <Text style={{ ...styles.mediumBlackText, ...props.style }}>
        {children}
    </Text>
);

const LargeBlackText = ({ children = "", ...props }) => (
    <Text style={{ ...styles.largeBlackText, ...props.style }}>{children}</Text>
);

SmallGreyText.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
    style: PropTypes.object,
};

MediumBlackText.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
    style: PropTypes.object,
};

export { SmallGreyText, MediumBlackText, LargeBlackText, SmallBlackText };

const styles = StyleSheet.create({
    smallGreyText: {
        fontSize: 16,
        color: "#a9a9a9",
        textAlign: "center",
    },
    smallBlackText: {
        fontSize: 16,
        color: "black",
        textAlign: "center",
    },
    mediumBlackText: {
        fontSize: 18,
        color: "#000000",
    },
    largeBlackText: {
        fontSize: 24,
        color: "#000000",
    },
});
