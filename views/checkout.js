import React from 'react'
import { Alert, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Colors } from '../common/colors'
import Header from '../components/header'
import CustomTextInput from '../components/custom-text-input'
import RoundedCornerButton from '../components/rounded-corner-button'
import { SubmitOrder } from '../api/api'
import { Mutex } from 'async-mutex'

export default class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            address: ""
        }

        this.checkoutButtonMutex = new Mutex()
        this.didCheckout = false
    }

    checkoutOnPress = async () => {
        const unlock = await this.checkoutButtonMutex.acquire()

        if (this.didCheckout) {
            unlock()
            return
        }

        if (this.state.address.length === 0) {
            Alert.alert("Input Error", "Address cannot be empty")
            unlock()
            return
        }

        const res = await SubmitOrder(
            this.props.userData, 
            this.props.orderData, 
            this.props.storeData,
            this.state.address,
        )
        if (res === null) {
            // network error nothing was returned from server
            Alert.alert("Network Error", "Is the server running?")
            unlock()
            return
        }

        if (res.error !== null) {
            // internal server errors, eg db failing.
            Alert.alert("Server Error", "Server Could not handle the request at the momemnt?")
            unlock()
            return
        }

        Alert.alert("Success", "Order sumitted")
        Actions.popTo("MainPage")
        this.didCheckout = true
        unlock()
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

                <RoundedCornerButton
                    text={"Done"}
                    onPress={this.checkoutOnPress}
                />
            </View>
        )
    }
}

