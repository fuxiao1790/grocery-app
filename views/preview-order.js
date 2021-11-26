import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'

export default class PreviewOrder extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			listData: this.props.orderData,
		}
	}

	renderListItem = ({ item: item, index, seperators }) => (
		<View>
			<Text>Name: {item.data.name}</Text>
			<Text>Price: {item.data.price}</Text>
			<Text>Count: {item.count}</Text>
		</View>
	)

	renderSeperator = () => (
		<View style={{ paddingVertical: 8 }}></View>
	)

	renderFooter = () => (
		<View style={{ paddingBottom: 100 }}></View>
	)

	checkoutOnPress = () => {
		Actions.Checkout({
			storeData: this.props.storeData,
			orderData: this.props.orderData,
		})
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<Text>Order Preview</Text>
				<FlatList
					renderItem={this.renderListItem}
					data={this.state.listData}
					ItemSeparatorComponent={this.renderSeperator}
					ListFooterComponent={this.renderFooter}
					keyExtractor={(item, index) => item.data._id}
				/>

				<View>
					<View style={{ position: "absolute", bottom: 0, right: 0, marginRight: 36, marginBottom: 24 }}>
						<TouchableOpacity onPress={this.checkoutOnPress}>
							<Text>Checkout</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		)
	}
}