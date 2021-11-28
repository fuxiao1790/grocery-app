import React from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Colors } from '../common/colors'
import Header from '../components/header'
import CustomTextInput from '../components/custom-text-input'
import CustomButton from '../components/custom-button'
import { SubmitOrder } from '../api/api'

export default class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            address: ""
        }
    }

    checkoutOnPress = async () => {
        if (this.state.address.length === 0) {
            return
        }

        const res = await SubmitOrder(
            this.props.userData, 
            this.props.orderData, 
            this.props.storeData,
            this.state.address,
        )
        if (res == null) {
            return
        }

        if (res.error != null) {
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
                    placeholder={"Enter Address"}
                />

                <CustomButton
                    text={"Done"}
                    onPress={this.checkoutOnPress}
                />
            </View>
        )
    }
}

