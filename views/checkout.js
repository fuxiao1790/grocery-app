import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'
import { Colors } from '../common/colors'
import BottomHoverButton from '../components/bottom-hover-button'
import Header from '../components/header'

export default class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            address: ""
        }
    }

    checkoutOnPress = () => {
        if (this.state.address.length === 0) {
            return
        }

        Actions.popTo("MainPage")
    }

    onChangeText = (str) => this.setState({ address: str })

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.COLOR_PALLET_3 }}>
                <Header title={"Checkout"} backOnPress={Actions.pop} />
                <View style={styles.addressContainer}>
                    <Text style={styles.addressText}>Delivery Address</Text>
                    <TextInput
                        onChangeText={this.onChangeText}
                        style={styles.addressTextInput}
                    />
                </View>

                <View style={styles.doneContainer}>
                    <TouchableOpacity onPress={this.checkoutOnPress}>
                        <View style={styles.doneButton}>
                            <Text style={styles.doneText}>Done</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    addressContainer: {
        marginHorizontal: 24,
        marginTop: 48
    },

    addressText: {
        fontSize: 20,
        marginBottom: 24
    },

    addressTextInput: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "white",
        borderRadius: 24,
        fontSize: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },

    doneContainer: {
        marginHorizontal: 24,
        marginTop: 96
    },

    doneButton: {
        backgroundColor: Colors.COLOR_PALLET_1,
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

    doneText: {
        textAlign: 'center'
    }
})