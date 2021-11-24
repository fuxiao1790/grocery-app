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
			selectedItems: [], // []{data, count}
			loading: false,
			endOfList: false,
		}
	}

	componentDidMount() {
		this.loadListData(this.state.listData.length, 10)
	}

	loadListData = async (skip, count) => {
		if (this.state.endOfList) {
			return
		}

		this.setState({loading: true}, async () => {
			const data = await GetItemList(skip, count, this.props.storeData._id)
			let nextState = {
				listData: data.items == null ? this.state.listData : this.state.listData.concat(data.items),
				loading: false,
			}
			if (data.items == null || data.items.length != count) {
				nextState["endOfList"] = true
			}
			this.setState(nextState)
		})
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
		<View style={{paddingVertical: 8}}></View>
	)

	renderFooter = () => (
		<View style={{ paddingBottom: 100 }}></View>
	)

	calcSelectedItemCount = () => {
		let total = 0
		this.state.selectedItems.forEach((el) => {total += el.count})
		return total
	}

	checkoutOnPress = () => {
		Actions.PreviewOrder({ 
			orderData: this.state.selectedItems,
			storeData: this.props.storeData,
		})
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
					onEndReached={() => { this.loadListData(this.state.listData.length, 5) }}
					onRefresh={() => { this.loadListData(this.state.listData.length, 10) }}
				/>

				<View>
					<View style={{ position: "absolute", bottom: 0, right: 0, marginRight: 36, marginBottom: 24 }}>
						<TouchableOpacity onPress={this.checkoutOnPress}>
							<Text>Checkout</Text>
							<Text>{this.calcSelectedItemCount()} Items in Cart</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		)
	}
}