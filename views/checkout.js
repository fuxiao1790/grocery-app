import React from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Colors } from '../common/colors'
import Header from '../components/header'
import CustomTextInput from '../components/custom-text-input'
import CustomButton from '../components/custom-button'

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
                <CustomTextInput
                    onChangeText={this.onChangeText}
                    title={"Delivery Address"}
                />

                <CustomButton
                    text={"Done"}
                    onPress={this.checkoutOnPress}
                />
            </View>
        )
    }
}

