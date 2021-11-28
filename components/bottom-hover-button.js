import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../common/colors";

export default class BottomHoverButton extends React.Component {
    render() {
        return (
            <View style={{ position: "absolute", bottom: 0, right: 0 }}>
                <SafeAreaView>
                    <View style={styles.buttonContainer}>
                        {this.props.children}
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginRight: 24,
        marginBottom: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.COLOR_PALLET_2,
        borderRadius: 45,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.55,
        shadowRadius: 2.22,

        elevation: 3,
    }
})