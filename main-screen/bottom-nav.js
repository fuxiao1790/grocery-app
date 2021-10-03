import React from "react";
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import NavButton from "./nav-button";

export default class BottomNav extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.mainContainer}>
                <NavButton text={"tab 1"}/>
                <NavButton text={"tab 1"}/>
                <NavButton text={"tab 1"}/>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
    },

    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },

    buttonText: {}
})