import React from "react";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";
import Header from "../components/header";
import CustomTextInput from "../components/custom-text-input";
import CustomButton from "../components/custom-button";
import { UserLogin } from "../api/api"
import { Colors } from "../common/colors";
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
        const res = await UserLogin(this.state.username, this.state.password)

        if (res.userid != null && res.userid.length > 0) {
            if (this.props.onLogin instanceof Function) {
                this.props.onLogin(res.userid)
            }
            Actions.pop()
        }
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