import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { Colors } from "../common/colors";
import { Styles } from "../common/styles";
import Header from "../components/header";
import { RenderSeperator, RenderListFooter } from "../components/list-common-components";

export default class OrderDetail extends React.Component {
    renderHeader = () => {
        return (
            <View>
                {RenderSeperator()}
                <View style={Styles.listItemContainer}>
                    <Text>Delivery address: {this.props.orderData.location}</Text>
                    <Text>Subtotal: {this.props.orderData.subtotal}</Text>
                    <Text>Created at: {new Date(this.props.orderData["created-at"] * 1000).toTimeString()}</Text>

                    <Text>Store name: {this.props.orderData["store-data"].name}</Text>
                    <Text>Store address: {this.props.orderData["store-data"].location}</Text>
                </View>
                {RenderSeperator()}
            </View>
        )
    }

    renderItem = (arg) => {
        const itemData = arg.item["item-data"]

        return (
            <View style={Styles.listItemContainer}>
                <View style={listItemStyles.contentContainer}>
                    <View>
                        <Text>Item Name: {itemData.name}</Text>
                        <Text>Price Per Unit: {itemData.price}</Text>
                        <Text>Units In Cart: {arg.item.count}</Text>
                        <Text>Total Price: ${itemData.price * arg.item.count}</Text>
                    </View>
                    <View style={listItemStyles.placeHolderImage}><Text style={{ textAlign: "center", padding: 12 }}>Placeholder Image</Text></View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title={"Order Detail"} backOnPress={Actions.pop} />

                <FlatList
                    ListHeaderComponent={this.renderHeader}
                    data={this.props.orderData["item-data"]}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={RenderSeperator}
                    ListFooterComponent={RenderListFooter}
                    style={Styles.list}
                />
            </View>
        )
    }
}

const listItemStyles = StyleSheet.create({
    contentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    placeHolderImage: {
		width: 64,
		height: 64,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.COLOR_PALLET_3,
		borderRadius: 12,
	},
})