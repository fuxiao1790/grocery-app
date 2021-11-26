import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text>Check out</Text>
                    <Text>Delivery Address</Text>
                </View>
                <View>
                    <View style={{ position: "absolute", bottom: 0, right: 0, marginRight: 36, marginBottom: 24 }}>
                        <TouchableOpacity onPress={this.checkoutOnPress}>
                            <Text>Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}