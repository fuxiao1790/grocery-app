import React from "react";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";
import CustomButton from "../components/custom-button";
import Header from "../components/header";

export default class MainPage extends React.Component {
    render() {
        return (
            <View>
                <Header title={"Grocery"} root />

                <CustomButton
                    text={"Start Shopping"}
                    onPress={Actions.StoreList}
                />

                <CustomButton
                    text={"Login"}
                    onPress={Actions.Login}
                />

                <CustomButton
                    text={"Register"}
                    onPress={Actions.Register}
                />
            </View>
        )
    }
}