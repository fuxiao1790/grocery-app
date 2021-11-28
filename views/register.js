import React from "react";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";
import Header from "../components/header";
import CustomTextInput from "../components/custom-text-input";
import CustomButton from "../components/custom-button";
import { UserLogin, UserRegister } from "../api/api"
import { Styles } from "../common/styles";

export default class register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
        }
    }

    usernameOnChange = (str) => this.setState({ username: str })
    passwordOnChange = (str) => this.setState({ password: str })

    registerOnPress = async () => {
        const registerRes = await UserRegister(this.state.username, this.state.password)
        if (registerRes != null && registerRes.error != null) {
            return
        }

        const loginRes = await UserLogin(this.state.username, this.state.password)
        if (loginRes != null && loginRes.userid != null && loginRes.userid.length > 0) {
            if (this.props.onRegister instanceof Function) {
                this.props.onRegister(loginRes.userid)
            }
            Actions.pop()
        }
    }

    render() {
        return (
            <View style={Styles.backgroundColor}>
                <Header title={"Register"} backOnPress={Actions.pop} />

                <CustomTextInput
                    title={"Username"}
                    onChangeText={this.usernameOnChange}
                />

                <CustomTextInput
                    title={"Password"}
                    onChangeText={this.passwordOnChange}
                    secureTextEntry
                />

                <CustomButton
                    text={"Register"}
                    onPress={this.registerOnPress}
                />
            </View>
        )
    }
}