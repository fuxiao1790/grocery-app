import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'
import { GetItemList } from '../Api/Api'

export default class ItemList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			listData: [], // {data: itemData{}, count: int}
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

		this.setState({ loading: true }, async () => {
			const data = await GetItemList(skip, count, this.props.storeData._id)

			let nextState = {
				listData: data.items == null ? this.state.listData : this.state.listData.concat(data.items.map((val) => ({ data: val, count: 0 }))),
				loading: false,
			}

			if (data.items == null || data.items.length != count) {
				nextState["endOfList"] = true
			}

			this.setState(nextState)
		})
	}

	renderListItem = (arg) => {
		return (
			<ListItem
				itemName={arg.item.data.name}
				itemPrice={arg.item.data.price}
				itemCount={arg.item.count}
				removeItemOnPress={() => this.listItemRemoveOnPress(arg.item)}
				onPress={() => { this.listItemOnPress(arg.item) }}
			/>
		)
	}

	listItemRemoveOnPress = (item) => {
		item.count--
		this.setState(this.state)
	}

	listItemOnPress = (item) => {
		item.count++
		this.setState(this.state)
	}

	renderSeperator = () => (
		<View style={{ paddingVertical: 8 }}></View>
	)

	renderFooter = () => (
		<View style={{ paddingBottom: 100 }}></View>
	)

	calcSelectedItemCount = () => {
		let total = 0
		this.state.listData.forEach((el) => total += el.count)
		return total
	}

	previewOnPress = () => {
		let orderData = []
		this.state.listData.forEach((el) => el.count > 0 ? orderData.push(el) : null)
		Actions.PreviewOrder({
			orderData: orderData,
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
						<TouchableOpacity onPress={this.previewOnPress}>
							<Text>View Detail</Text>
							<Text>{this.calcSelectedItemCount()} Items in Cart</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		)
	}
}

class ListItem extends React.Component {
	render() {
		return (
			<TouchableOpacity onPress={this.props.onPress}>
				<View>
					<Text>Name: {this.props.itemName}</Text>
					<Text>Price: {this.props.itemPrice}</Text>
					{this.props.itemCount > 0 ?
						<>
							<Text>Count: {this.props.itemCount}</Text>
							<TouchableOpacity onPress={this.props.removeItemOnPress}>
								<Text>Remove From Cart</Text>
							</TouchableOpacity>
						</>
						:
						null
					}
				</View>
			</TouchableOpacity>
		)
	}
}