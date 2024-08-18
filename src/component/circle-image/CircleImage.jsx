import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function CircleImage({ src, size }) {
    return (
        <View
            style={{
                ...styles.container,
                ...(size && { height: size }),
                ...(size && { width: size }),
            }}
        >
            <Image
                style={{
                    ...styles.image,
                    ...(size && { borderRadius: size / 2 }),
                }}
                source={src ?? src}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: "#fff",
        // alignItems: "center",
        // justifyContent: "center",
    },
    image: {
        flex: 1,
        width: "100%",
        backgroundColor: "#0553",
    },
});
