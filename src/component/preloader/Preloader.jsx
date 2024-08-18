import { View, StyleSheet, ActivityIndicator } from "react-native";

const Preloader = () => {
    return (
        <View style={styles.loader}>
            {/* <Text>Loading ...</Text> */}
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

const styles = StyleSheet.create({
    loader: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
});

export default Preloader;
