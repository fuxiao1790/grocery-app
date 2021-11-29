import React from "react";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";
import { Styles } from "../common/styles";
import CustomButton from "../components/custom-button";
import Header from "../components/header";

export default class MainPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userID: "",
        }
    }

    onLogin = (id) => this.setState({ userID: id })

    onRegister = (id) => this.setState({ userID: id })

    loginOnPress = () => Actions.Login({ onLogin: this.onLogin })

    registerOnPress = () => Actions.Register({ onRegister: this.onRegister })

    storeListOnPress = () => Actions.StoreList({userData: { userID: this.state.userID }})

    orderListOnPress = () => Actions.OrderList({ userData: { userID: this.state.userID } })       

    render() {
        return (
            <View style={Styles.backgroundColor}>
                <Header title={"Grocery"} root />

                {this.state.userID.length == 0 ?
                    <>
                        <CustomButton
                            text={"Login"}
                            onPress={this.loginOnPress}
                        />
                        <CustomButton
                            text={"Register"}
                            onPress={this.registerOnPress}
                        />
                    </>
                    :
                    <>
                        <CustomButton
                            text={"Start Shopping"}
                            onPress={this.storeListOnPress}
                        />
                        <CustomButton
                            text={"Order History"}
                            onPress={this.orderListOnPress}
                        />
                    </>
                }
            </View>
        )
    }
}