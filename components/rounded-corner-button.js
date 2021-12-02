import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../common/colors";
import { Styles } from "../common/styles";

export default class RoundedCornerButton extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={styles.button}>
                        <Text style={styles.text}>{this.props.text}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        marginTop: 96,
    },

    button: {
        backgroundColor: Colors.COLOR_PALLET_1,
        marginBottom: 12,
        marginHorizontal: 24,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 45,

        ...Styles.shadow,
    },

    text: {
        textAlign: 'center',
        fontSize: 18,
    }
})