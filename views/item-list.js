import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'
import { GetItemList } from '../api/api'
import { Colors } from '../common/colors'
import { Styles } from '../common/styles'
import AddItemButton from '../components/add-item-button'
import BottomHoverButton from '../components/bottom-hover-button'
import Header from '../components/header'
import { RenderListFooter, RenderSeperator } from '../components/list-item-seperator'
import RemoveItemButon from '../components/remove-item-button'

export default class ItemList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			listData: [],
			loading: false,
			endOfList: false,
			itemsInCart: new Map(), // itemID => itemCount
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

			if (data === null) {
				return
			}

			let nextState = {
				loading: false,
				listData: this.state.listData,
			}

			if (data.items != null) {
				nextState["listData"] = this.state.listData.concat(data.items)
			}

			if (data.items == null || data.items.length != count) {
				nextState["endOfList"] = true
			}

			this.setState(nextState)
		})
	}

	renderListItem = (arg) => (
		<ListItem
			itemName={arg.item.name}
			itemPrice={arg.item.price}
			itemCount={this.state.itemsInCart.has(arg.item._id) ? this.state.itemsInCart.get(arg.item._id) : 0}
			addItemOnPress={() => { this.listItemAddOneOnPress(arg.item) }}
			removeItemOnPress={() => this.listItemRemoveOnPress(arg.item)}
			removeAllItemOnPress={() => this.listItemRemoveAllOnPress(arg.item)}
		/>
	)

	listItemRemoveAllOnPress = (item) => {
		this.state.itemsInCart.delete(item._id)

		this.setState(this.state)
	}

	listItemRemoveOnPress = (item) => {
		if (!this.state.itemsInCart.has(item._id)) {
			return
		}

		if (this.state.itemsInCart.get(item._id) > 1) {
			this.state.itemsInCart.set(item._id, this.state.itemsInCart.get(item._id) - 1)
		}
		
		this.state.itemsInCart.delete(item._id)

		this.setState(this.state)
	}

	listItemAddOneOnPress = (item) => {
		if (!this.state.itemsInCart.has(item._id)) {
			this.state.itemsInCart.set(item._id, 1)
		} else {
			this.state.itemsInCart.set(item._id, this.state.itemsInCart.get(item._id) + 1)
		}

		this.setState(this.state)
	}

	calcSelectedItemCount = () => {
		let total = 0
		this.state.itemsInCart.forEach((count) => total += count)
		return total
	}

	previewOnPress = () => {
		let orderData = this.state.listData
			.filter(item => this.state.itemsInCart.has(item._id))
			.map(item => ({ data: item, count: this.state.itemsInCart.get(item._id) }))

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
					ListHeaderComponent={RenderSeperator}
					keyExtractor={(item, index) => item._id}
					onEndReached={() => { this.loadListData(this.state.listData.length, 5) }}
					onEndReachedThreshold={0.5}
				/>

				{selectedItemCount > 0 ?
					<BottomHoverButton>
						<TouchableOpacity onPress={this.previewOnPress}>
							<Text style={{ textAlign: "center" }}>{selectedItemCount} Items in Cart</Text>
							<Text style={{ textAlign: "center" }}>View Order Detail</Text>
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
			<View style={this.props.itemCount > 0 ? Styles.listItemContainerHL : Styles.listItemContainer}>
				<View style={listItemStyles.mainContainer}>
					<View style={listItemStyles.placeHolderImage}><Text style={{ textAlign: "center", padding: 12 }}>Placeholder Image</Text></View>
					<View style={listItemStyles.subContainer}>
						<Text>{this.props.itemName}</Text>
						<Text>${this.props.itemPrice}</Text>
						<View style={listItemStyles.addRemoveContainer}>
							<View style={{ flexDirection: "row", marginRight: 6 }}>
								<RemoveItemButon onPress={this.props.removeItemOnPress} />
							</View>

							<View style={{ flexDirection: "row", justifyContent: "center", marginHorizontal: 12 }}>
								<Text style={{ textAlign: "center", fontSize: 18 }}>{this.props.itemCount}</Text>
							</View>

							<View style={{ flexDirection: "row", marginLeft: 6 }}>
								<AddItemButton onPress={this.props.addItemOnPress} />
							</View>
						</View>
					</View>
				</View>
			</View>
		)
	}
}

const listItemStyles = StyleSheet.create({
	placeHolderImage: {
		width: 124,
		height: 124,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.COLOR_PALLET_3,
		borderRadius: 12,
	},

	addRemoveContainer: {
		height: 36,
		width: 120,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		marginTop: 12
	},

	mainContainer: {
		flexDirection: "row",
	},

	subContainer: {
		justifyContent: "space-between",
		alignItems: "center",
		flex: 1,
		marginLeft: 12,
		paddingVertical: 12
	}
})