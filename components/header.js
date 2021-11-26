import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


export default class Header extends React.Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.backButtonContainer}>
                    {!this.props.root ?
                        <TouchableOpacity onPress={this.props.backOnPress}>
                            <Text style={styles.backButtonText}>
                                Back
                            </Text>
                        </TouchableOpacity>
                        :
                        null
                    }
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        {this.props.title}
                    </Text>
                </View>

                <View style={styles.dummyItemContainer} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    backButtonContainer: {
        flex: 1,
    },

    titleContainer: {
        flex: 3,
    },

    dummyItemContainer: {
        flex: 1,
    },

    titleText: {
        textAlign: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 24
    },

    backButtonText: {
        textAlign: "center",
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})