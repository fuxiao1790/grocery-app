import React from "react";
import { SafeAreaView, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";
import Header from "../components/header";

export default class MainPage extends React.Component {
    render() {
        return (
            <SafeAreaView>
                <Header title={"Grocery"} root/>
                <TouchableOpacity onPress={Actions.StoreList}>
                    <Text>
                        Start Shopping
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}