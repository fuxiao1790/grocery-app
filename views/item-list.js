import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'
import { GetItemList } from '../api/api'
import { Styles } from '../common/styles'
import BottomHoverButton from '../components/bottom-hover-button'
import Header from '../components/header'
import { RenderListFooter, RenderSeperator } from '../components/list-item-seperator'

export default class ItemList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			listData: [], // {data: itemData{}, count: int}
			loading: false,
			endOfList: false,
			refreshing: false,
		}
	}

	componentDidMount() {
		this.loadListData(this.state.listData.length, 10)
	}

	loadListData = async (skip, count) => {
		if (this.state.endOfList || this.state.loading) {
			return
		}

		this.setState({ loading: true }, async () => {

			const data = await GetItemList(skip, count, this.props.storeData._id)

			let nextState = {
				loading: false,
				listData: this.state.listData,
				refreshing: false,
			}

			if (data.items != null) {
				nextState["listData"] = this.state.listData.concat(data.items.map((val) => ({ data: val, count: 0 })))
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
				addItemOnPress={() => { this.listItemAddOneOnPress(arg.item) }}
				removeItemOnPress={() => this.listItemRemoveOnPress(arg.item)}
				removeAllItemOnPress={() => this.listItemRemoveAllOnPress(arg.item)}
			/>
		)
	}

	listItemRemoveAllOnPress = (item) => {
		let res = this.state.listData.find(i => i.data._id === item.data._id)
		res.count = 0
		this.setState(this.state)
	}

	listItemRemoveOnPress = (item) => {
		let res = this.state.listData.find(i => i.data._id === item.data._id)
		if (res.count <= 0) {
			return
		}
		res.count --
		this.setState(this.state)
	}

	listItemAddOneOnPress = (item) => {
		let res = this.state.listData.find(i => i.data._id === item.data._id)
		res.count ++
		this.setState(this.state)
	}

	listOnRefresh = () => {
		this.setState(
			{ listData: [], refreshing: true, endOfList: false },
			() => { this.loadListData(this.state.listData.length, 10) }
		)
	}

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
			userData: this.props.userData,
			listItemAddOneOnPress: this.listItemAddOneOnPress,
			listItemRemoveOnPress: this.listItemRemoveOnPress,
			listItemRemoveAllOnPress: this.listItemRemoveAllOnPress,
		})
	}

	render() {
		let selectedItemCount = this.calcSelectedItemCount()
		return (
			<View style={{ flex: 1 }}>
				<Header title={"Item List"} backOnPress={Actions.pop} />

				<FlatList
					style={Styles.list}
					renderItem={this.renderListItem}
					data={this.state.listData}
					ItemSeparatorComponent={RenderSeperator}
					ListFooterComponent={RenderListFooter}
					keyExtractor={(item, index) => item.data._id}
					onEndReached={() => { this.loadListData(this.state.listData.length, 5) }}
					onEndReachedThreshold={0.5}
				// onRefresh={this.listOnRefresh}
				// refreshing={this.state.refreshing}
				/>

				{selectedItemCount > 0 ?
					<BottomHoverButton>
						<TouchableOpacity onPress={this.previewOnPress}>
							<Text>{selectedItemCount} Items in Cart</Text>
							<Text>View Order Detail</Text>
						</TouchableOpacity>
					</BottomHoverButton>
					:
					null
				}
			</View>
		)
	}
}

class ListItem extends React.Component {
	render() {
		return (
			<TouchableOpacity onPress={this.props.addItemOnPress}>
				<View style={this.props.itemCount > 0 ? Styles.listItemContainerHL : Styles.listItemContainer}>
					<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
						<View>
							<Text>Name: {this.props.itemName}</Text>
							<Text>Price: {this.props.itemPrice}</Text>
						</View>
						<View>
							<TouchableOpacity onPress={this.props.addItemOnPress}>
								<Text style={{ textAlign: "right" }}>Add To Cart</Text>
							</TouchableOpacity>
							{this.props.itemCount > 0 ?
								<TouchableOpacity onPress={this.props.removeItemOnPress}>
									<Text style={{ textAlign: "right" }}>Remove From Cart</Text>
								</TouchableOpacity>
								:
								null
							}
							{this.props.itemCount > 1 ?
								<TouchableOpacity onPress={this.props.removeAllItemOnPress}>
									<Text style={{ textAlign: "right" }}>Remove All From Cart</Text>
								</TouchableOpacity>
								:
								null
							}
							{this.props.itemCount > 0 ?
								<Text style={{ textAlign: "right" }}>Count: {this.props.itemCount}</Text>
								:
								null
							}
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}