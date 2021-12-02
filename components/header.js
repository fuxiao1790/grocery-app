import React from "react";
import { StyleSheet, View, Text, StatusBar, SafeAreaView, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from '../common/colors'
import { Styles } from "../common/styles";

export default class Header extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.mainContainer}>
                <StatusBar backgroundColor={Colors.COLOR_PALLET_1}/>
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

                <View style={styles.searchButtonContainer}>
                    {this.props.searchButton === true ?
                        <TouchableOpacity onPress={this.props.searchButtonOnPress}>
                            <Text style={styles.backButtonText}>
                                Search
                            </Text>
                        </TouchableOpacity>
                        :
                        null
                    }
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.COLOR_PALLET_1,
        
        ...Styles.shadow
    },

    backButtonContainer: {
        flex: 1,
        backgroundColor: Colors.COLOR_PALLET_1
    },

    titleContainer: {
        flex: 3,
        backgroundColor: Colors.COLOR_PALLET_1
    },

    searchButtonContainer: {
        flex: 1,
        backgroundColor: Colors.COLOR_PALLET_1
    },

    titleText: {
        textAlign: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 24,
        backgroundColor: Colors.COLOR_PALLET_1
    },

    backButtonText: {
        textAlign: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: Colors.COLOR_PALLET_1
    }
})