import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../common/colors";

function RenderSeperator() {
    return <View style={styles.seperator}/>
}

function RenderListFooter() {
    return <View style={styles.footer}/>
}

const styles = StyleSheet.create({
    seperator: {
        backgroundColor: Colors.COLOR_PALLET_3,
        height: 6
    },

    footer: {
        height: 120
    }
})

export { RenderSeperator, RenderListFooter }

