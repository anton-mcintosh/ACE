import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: colors.defaultBackground,
    },

    mainContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: colors.defaultBackground,
    },
    header: {
        fontSize: 50,
        fontWeight: "bold",
        color: colors.defaultText,
    },
    titleContainer: {
        width: 400,
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 30,
        marginTop: 20,
    },
    titleInput: {
        placeholderTextColor: colors.defaultText,
        flex: 1,
        fontSize: 20,
        color: colors.defaultText,
        backgroundColor: colors.secondaryBackground,
        width: "80%",
        padding: 10,
        margin: 10,
        borderRadius: 5,
        minHeight: 50,
    },
    timeContainer: {
        width: 400,
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    timeButton: {
        width: 200,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.buttonPrimary,
        borderRadius: 30,
        marginTop: 20,
    },
});