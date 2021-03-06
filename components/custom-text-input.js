import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../common/colors";
import { Styles } from "../common/styles";

export default class CustomTextInput extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>{this.props.title}</Text>
                <TextInput
                    style={styles.textInput} 
                    {...this.props}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
        marginTop: 48
    },

    titleText: {
        fontSize: 20,
        marginBottom: 24
    },

    textInput: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: Colors.COLOR_PALLET_6,
        borderRadius: 24,
        fontSize: 20,
        
        ...Styles.shadow
    },
})