import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";
import Header from "../components/header";

export default class MainPage extends React.Component {
    render() {
        return (
            <View>
                <Header title={"Grocery"} root/>
                <TouchableOpacity onPress={Actions.StoreList}>
                    <Text>
                        Start Shopping
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}