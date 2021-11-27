import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'
import { GetItemList } from '../Api/Api'
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
		if (this.state.endOfList) {
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
				removeItemOnPress={() => this.listItemRemoveOnPress(arg.item)}
				removeAllItemOnPress={() => this.listItemRemoveAllOnPress(arg.item)}
				onPress={() => { this.listItemOnPress(arg.item) }}
			/>
		)
	}

	listItemRemoveAllOnPress = (item) => {
		item.count = 0
		this.setState(this.state)
	}

	listItemRemoveOnPress = (item) => {
		item.count--
		this.setState(this.state)
	}

	listItemOnPress = (item) => {
		item.count++
		this.setState(this.state)
	}

	listOnRefresh = () => {
		this.setState(
			{ listData: [], refreshing: true, endOfList: false },
			() => { this.loadListData(this.state.listData.length, 10) }
		)
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
					onEndReachedThreshold={1}
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
			<TouchableOpacity onPress={this.props.onPress}>
				<View style={Styles.listItemContainer}>
					<View style={{flexDirection: "row", justifyContent: "space-between"}}>
						<View>
							<Text>Name: {this.props.itemName}</Text>
							<Text>Price: {this.props.itemPrice}</Text>
						</View>
						<View>
							{this.props.itemCount > 0 ?
								<>
									<Text style={{ textAlign: "right" }}>Count: {this.props.itemCount}</Text>
									<TouchableOpacity onPress={this.props.removeItemOnPress}>
										<Text style={{ textAlign: "right" }}>Remove From Cart</Text>
									</TouchableOpacity>
								</>
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
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}