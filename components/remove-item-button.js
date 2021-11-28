import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../common/colors";

export default class RemoveItemButon extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.background}>
                    <Text style={styles.text}>-</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.COLOR_PALLET_3,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 36,
        width: 36,
        height: 36
    },

    text: {
        fontSize: 24,
        color: "white",
        paddingBottom: 2,
        paddingLeft: 1
    }
})