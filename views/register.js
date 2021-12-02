import React from "react";
import { Alert, KeyboardAvoidingView, View } from "react-native";
import { Actions } from "react-native-router-flux";
import Header from "../components/header";
import CustomTextInput from "../components/custom-text-input";
import { UserLogin, UserRegister } from "../api/api"
import { Styles } from "../common/styles";
import RoundedCornerButton from "../components/rounded-corner-button";

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
        if (this.state.username.length === 0) {
            Alert.alert("Input Error", "Username cannot be empty")
            return
        }

        if (this.state.password.length === 0) {
            Alert.alert("Input Error", "Password cannot be empty")
            return
        }

        const registerRes = await UserRegister(this.state.username, this.state.password)
        
        if (registerRes === null) {
            Alert.alert("Network Error", "Is the server running?")
            return
        }

        if (registerRes.error != null) {
            Alert.alert("Register Error", "Username already in use")
            return
        }
        
        // auto login after user registers
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
            <KeyboardAvoidingView style={Styles.backgroundColor} behavior={Platform.OS === 'android' ? null : "padding"}>
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

                <RoundedCornerButton
                    text={"Register"}
                    onPress={this.registerOnPress}
                />
            </KeyboardAvoidingView>
        )
    }
}