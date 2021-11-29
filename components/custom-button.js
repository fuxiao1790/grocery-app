import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../common/colors";

export default class CustomButton extends React.Component {
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
        backgroundColor: Colors.COLOR_PALLET_4,
        marginBottom: 12,
        marginHorizontal: 24,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 45,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },

    text: {
        textAlign: 'center',
        fontSize: 18
    }
})