import React from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'
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
            <SafeAreaView style={{ flex: 1 }}>
                <Header title={"Checkout"} backOnPress={Actions.pop}/>
                <View style={styles.addressContainer}>
                    <Text style={styles.addressText}>Delivery Address</Text>
                    <TextInput 
                        onChangeText={this.onChangeText}
                        style={styles.addressTextInput}
                    />
                </View>
                <View>
                    <View style={{ position: "absolute", bottom: 0, right: 0, marginRight: 36, marginBottom: 24 }}>
                        <TouchableOpacity onPress={this.checkoutOnPress}>
                            <Text>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    addressContainer: {
        flex: 1,
        marginHorizontal: 24,
        marginTop: 24
    },

    addressText: {
        fontSize: 20,
        marginBottom: 12
    },

    addressTextInput: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "gray",
        borderRadius: 24,
        fontSize: 20
    }
})