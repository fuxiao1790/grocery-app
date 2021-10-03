import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";

export default class NavButton extends React.Component {
    render() {
        return(
            <View style={styles.buttonContainer}>
                {/* <TouchableWithoutFeedback> */}
                    <Text style={styles.buttonText}>{this.props.text}</Text>
                {/* </TouchableWithoutFeedback> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },

    buttonText: {
        flex: 1,
        textAlign: "center",
        paddingVertical: 12
    }
})