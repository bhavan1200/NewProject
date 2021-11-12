import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    root: {
       flexDirection: "row",
       padding: 10,
    },
    
    inputContainer: {
      backgroundColor: "#f2f2f2",
      flex: 1,
      marginRight: 10,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: "#dedede",
      alignItems: "center",
      flexDirection: "row",
      padding: 2,
    },
    icon: {
        marginHorizontal: 5,
    },
    input: {
      flex: 1,
      marginHorizontal: 5,
    },
    buttonContainer: {
        height: 40,
        width: 40,
        borderRadius: 25,
        backgroundColor: "#3777f0",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center"
    },
    buttonText: {
        color: "#fff",
        fontSize: 35,
    }
});

export default styles;

