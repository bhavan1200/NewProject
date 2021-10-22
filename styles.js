import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    root: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#F9FBFC",
        width: "100%",
        flex: 1,
    },

    logo: {
        width: "70%",
        maxWidth: 300,
        maxHeight: 200,
        alignSelf: "center"
    },

    phoneInputContainer: {
        backgroundColor: "white",
        alignSelf: "center",
        width: "80%",
        borderColor:"#e8e8e8",
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,

    },

    buttonContainer: {
        
        width: "80%",
        padding: 15,
        marginTop: 15,
        alignSelf: "center",
        borderRadius: 5,
        backgroundColor: "#3B71F3",
    }, 

    buttonText: {
      fontWeight: "bold",
      color: "white",
      alignSelf: "center"
    },

    
});

export default styles;
