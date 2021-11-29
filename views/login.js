import React from "react";
import { Alert, View } from "react-native";
import { Actions } from "react-native-router-flux";
import Header from "../components/header";
import CustomTextInput from "../components/custom-text-input";
import CustomButton from "../components/custom-button";
import { UserLogin } from "../api/api"
import { Styles } from "../common/styles";

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
        }
    }

    usernameOnChange = (str) => this.setState({username: str})
    
    passwordOnChange = (str) => this.setState({password: str})

    loginOnPress = async () => {
        if (this.state.username.length === 0) {
            Alert.alert("Input Error", "Username cannot be empty")
            return
        }

        if (this.state.password.length === 0) {
            Alert.alert("Input Error", "Password cannot be empty")
            return
        }

        const res = await UserLogin(this.state.username, this.state.password)

        if (res === null) {
            // network error nothing was returned from server
            Alert.alert("Network Error", "Is the server running?")
            return
        }

        if (res.error !== null && (res.userid === null || res.userid.length === 0)) {
            // username password mimatch
            Alert.alert("Input Error", "Username password mismatch")
            return
        }


        if (this.props.onLogin instanceof Function) {
            this.props.onLogin(res.userid)
        }
        Actions.pop()
    }

    render() {
        return (
            <View style={Styles.backgroundColor}>
                <Header title={"Login"} backOnPress={Actions.pop}/>

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
                    text={"Login"}
                    onPress={this.loginOnPress}
                />
            </View>
        )
    }
}