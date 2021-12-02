import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../common/colors";
import { Styles } from "../common/styles";

export default class BottomHoverButton extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.mainContainer}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>{this.props.text}</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

class BottomHoverContainer extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.mainContainer}>
                {this.props.children}
            </SafeAreaView>
        )
    }
}

export { BottomHoverContainer }

const styles = StyleSheet.create({
    mainContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
    },

    buttonContainer: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.COLOR_PALLET_1,
        borderRadius: 45,
        flex: 1,
        marginHorizontal: 36,
        marginBottom: 12,

        ...Styles.shadow,
    },

    buttonText: {
        fontSize: 16,
    }
})