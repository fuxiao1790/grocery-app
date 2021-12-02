import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../common/colors";

function RenderSeperator() {
    return <View style={styles.seperator}/>
}

function RenderListFooter() {
    return <SafeAreaView style={styles.footer}/>
}

const styles = StyleSheet.create({
    seperator: {
        backgroundColor: Colors.COLOR_PALLET_3,
        height: 6
    },

    footer: {
        padding: 36
    }
})

export { RenderSeperator, RenderListFooter }

