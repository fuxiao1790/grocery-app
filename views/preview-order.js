import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'

export default class PreviewOrder extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			listData: this.props.orderData,
		}
	}

	renderListItem = ({ item: item, index, seperators }) => (
		<TouchableOpacity onPress={() => { this.listItemOnPress(item) }}>
			<View>
				<Text>Name: {item.data.name}</Text>
				<Text>Price: {item.data.price}</Text>
				<Text>Count: {item.count}</Text>
			</View>
		</TouchableOpacity>
	)

	renderSeperator = () => (
		<View style={{paddingVertical: 8}}></View>
	)

	renderFooter = () => (
		<View style={{ paddingBottom: 100 }}></View>
	)

	render() {
		return (
			<SafeAreaView>
				<Text>Order Preview</Text>
				<FlatList 
					renderItem={this.renderListItem}
					data={this.state.listData}
					ItemSeparatorComponent={this.renderSeperator}
					ListFooterComponent={this.renderFooter}
					keyExtractor={(item, index) => item._id}
				/>
			</SafeAreaView>
		)
	}
}