import { StyleSheet, View } from "react-native";
import {
    Table,
    TableWrapper,
    Row,
    Rows,
    Col,
} from "react-native-reanimated-table";

const StatTable = ({
    head,
    title,
    data,
    headFlex = [1, 1, 1, 1, 1, 1, 1, 1, 1],
    rowsFlex = [1, 1, 1, 1, 1, 1, 1, 1],
}) => {
    return (
        <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 1, borderColor: "white" }}>
                <Row
                    data={head}
                    flexArr={headFlex}
                    style={styles.head}
                    textStyle={styles.text}
                />
                <TableWrapper
                    style={styles.wrapper}
                    borderStyle={{ borderWidth: 1, borderColor: "white" }}
                >
                    <Col
                        data={title}
                        style={styles.title}
                        //heightArr={[28, 28]}
                        textStyle={styles.text}
                    />
                    <Rows
                        data={data}
                        flexArr={rowsFlex}
                        style={styles.row}
                        textStyle={styles.text}
                    />
                </TableWrapper>
            </Table>
        </View>
    );
};

export default StatTable;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 10,
        backgroundColor: "#fff",
        alignSelf: "stretch",
        width: "100%",
    },
    head: { height: 40, backgroundColor: "#f1f8ff" },
    wrapper: { flexDirection: "row" },
    title: { flex: 1, backgroundColor: "#f6f8fa" },
    row: { height: 28 },
    text: { textAlign: "center" },
});
