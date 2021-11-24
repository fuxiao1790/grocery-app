import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'
import { GetItemList } from '../Api/Api'

export default class ItemList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			listData: [],
			selectedItems: [], // []{item, count}
		}
	}

	componentDidMount() {
		this.loadListData(0, 10)
	}

	loadListData = async (skip, count) => {
		const data = await GetItemList(skip, count, this.props.storeData._id)
		this.setState({ listData: data.items })
	}

	renderListItem = ({ item: data, index, seperators }) => (
		<TouchableOpacity onPress={() => { this.listItemOnPress(data) }}>
			<View>
				<Text>Name: {data.name}</Text>
				<Text>Price: {data.price}</Text>
			</View>
		</TouchableOpacity>
	)

	listItemOnPress = (item) => {
		res = this.state.selectedItems.find((li) => li.data._id == item._id)
		if (res != undefined || res != null) {
			res.count ++
		} else {
			this.state.selectedItems.push({data: item, count: 1})
		}
		
		this.setState(this.state)
	}

	renderSeperator = () => (
		<View><Text>SEPERATOR</Text></View>
	)

	renderFooter = () => (
		<View style={{ paddingBottom: 100 }}></View>
	)

	calcSelectedItemCount = () => {
		let total = 0
		this.state.selectedItems.forEach((el) => {total += el.count})
		return total
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<Text>Store Name: {this.props.storeData.name}</Text>

				<FlatList
					renderItem={this.renderListItem}
					data={this.state.listData}
					ItemSeparatorComponent={this.renderSeperator}
					ListFooterComponent={this.renderFooter}
					keyExtractor={(item, index) => item._id}
				/>

				<View>
					<View style={{ position: "absolute", bottom: 0, right: 0 }}>
						<TouchableOpacity onPress={() => { Actions.PreviewOrder({ orderData: this.state.order }) }}>
							<Text>View Order Detail</Text>
							<Text>Order Detail</Text>
							<Text>{this.calcSelectedItemCount()}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		)
	}
}