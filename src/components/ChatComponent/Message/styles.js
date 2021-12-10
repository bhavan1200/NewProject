import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        borderRadius:10,
        maxWidth: "75%",
        flexDirection: "row",
        alignItems: "flex-start",
        flexDirection: "column"
    },
    leftContainer: {
        backgroundColor:"#3777f0",
        marginLeft: 10,
        marginRight: "auto",
    },
    rightContainer: {
        backgroundColor:"lightgrey",
        marginLeft: "auto",
        marginRight: 10,
    }
});
export default styles;
