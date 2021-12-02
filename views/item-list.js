import React from 'react'
import { View, Text, FlatList, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'
import { GetItemList } from '../api/api'
import { Colors } from '../common/colors'
import { Styles } from '../common/styles'
import AddItemButton from '../components/add-item-button'
import BottomHoverButton from '../components/bottom-hover-button'
import CustomTextInput from '../components/custom-text-input'
import Header from '../components/header'
import { RenderListFooter, RenderSeperator } from '../components/list-common-components'
import RemoveItemButon from '../components/remove-item-button'

export default class StoreItemList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			cartData: new Map(), // itemID => { data: itemData, count: count }
			searchQuery: {
				searchName: "",
				priceMin: "",
				priceMax: "",
			}
		}
	}

	calcSelectedItemCount = () => {
		let total = 0
		this.state.cartData.forEach((val) => total += val.count)
		return total
	}

	onUpdateSelectedItems = (newData) => this.setState({ cartData: newData })

	listItemRemoveAllOnPress = (item) => {
		this.state.cartData.delete(item._id)

		this.setState(this.state)
	}

	listItemRemoveOnPress = (item) => {
		if (!this.state.cartData.has(item._id)) {
			return
		}

		if (this.state.cartData.get(item._id).count > 1) {
			this.state.cartData.set(item._id, { itemData: item, count: this.state.cartData.get(item._id).count - 1 })
		} else {
			this.state.cartData.delete(item._id)
		}

		this.setState(this.state)
	}

	listItemAddOneOnPress = (item) => {
		if (!this.state.cartData.has(item._id)) {
			this.state.cartData.set(item._id, { itemData: item, count: 1 })
		} else {
			this.state.cartData.set(item._id, { itemData: item, count: this.state.cartData.get(item._id).count + 1 })
		}

		this.setState(this.state)
	}

	previewOnPress = () => {
		Actions.PreviewOrder({
			orderData: Array.from(this.state.cartData, ([key, value]) => ({ data: value.itemData, count: value.count })),
			storeData: this.props.storeData,
			userData: this.props.userData,
			listItemAddOneOnPress: this.listItemAddOneOnPress,
			listItemRemoveOnPress: this.listItemRemoveOnPress,
			listItemRemoveAllOnPress: this.listItemRemoveAllOnPress,
		})
	}

	updateSeachQuery = (q) => this.setState({ searchQuery: q })
	searchButtonOnPress = () => Actions.EditSearchQuery({
		updateSeachQuery: this.updateSeachQuery,
		searchQuery: this.state.searchQuery,
	})

	resetSearchQuery = () => this.setState({
		searchQuery: {
			searchName: "",
			priceMin: "",
			priceMax: "",
		}
	})

	removeSearchQueryOnPress = () => {
		Alert.alert(
			"Remove Query", 
			"Remove Search Query?",
			[
				{text: "Ok", onPress: this.resetSearchQuery},
				{text: "Cancel"}
			]
		)
	}

	render() {
		let selectedItemCount = this.calcSelectedItemCount()
		return (
			<View style={{ flex: 1 }}>
				<Header
					title={"Item List"}
					backOnPress={Actions.pop}
					searchButton
					searchButtonOnPress={this.searchButtonOnPress}
				/>

				{this.state.searchQuery.searchName !== "" ||
					this.state.searchQuery.priceMin !== "" ||
					this.state.searchQuery.priceMax !== "" ?
					<TouchableOpacity onPress={this.removeSearchQueryOnPress}>
						<View style={searchQueryStyles.mainContainer}>
							<Text>Item name: {this.state.searchQuery.searchName}</Text>
							<Text>Min Price: {this.state.searchQuery.priceMin}</Text>
							<Text>Max Price: {this.state.searchQuery.priceMax}</Text>
						</View>
					</TouchableOpacity>
					:
					null
				}

				<ItemList
					storeData={this.props.storeData}
					userData={this.props.userData}
					cartData={this.state.cartData}
					searchQuery={this.state.searchQuery}
					listItemAddOneOnPress={this.listItemAddOneOnPress}
					listItemRemoveOnPress={this.listItemRemoveOnPress}
					removeAllItemOnPress={this.listItemRemoveAllOnPress}
				/>

				{selectedItemCount > 0 ?
					<BottomHoverButton
						onPress={this.previewOnPress}
						text={"Preview Order"}
					/>
					:
					null
				}
			</View>
		)
	}
}

class ItemList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			listData: [],
			loading: false,
			endOfList: false,
		}
	}

	componentDidMount() {
		this.loadListData(0, 5) // always load default list data
	}

	componentDidUpdate(prevProps) {
		if (this.props.searchQuery.searchName !== prevProps.searchQuery.searchName ||
			this.props.searchQuery.priceMin !== prevProps.searchQuery.priceMin ||
			this.props.searchQuery.priceMax !== prevProps.searchQuery.priceMax ) {

			this.setState(
				{listData: [], loading: false, endOfList: false}, 
				() => { this.loadListData(0, 5) }
			)
		}
	}

	loadListData = async (skip, count) => {
		if (this.state.endOfList || this.state.loading) {
			return
		}

		this.setState({ loading: true }, async () => {
			const data = await GetItemList(
				skip, 
				count, 
				this.props.storeData._id,
				this.props.searchQuery.searchName,
				this.props.searchQuery.priceMax,
				this.props.searchQuery.priceMin
			)

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
			itemCount={this.props.cartData.has(arg.item._id) ? this.props.cartData.get(arg.item._id).count : 0}
			addItemOnPress={() => { this.props.listItemAddOneOnPress(arg.item) }}
			removeItemOnPress={() => this.props.listItemRemoveOnPress(arg.item)}
			removeAllItemOnPress={() => this.props.listItemRemoveAllOnPress(arg.item)}
		/>
	)

	render() {
		return (
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
		)
	}
}

class EditSearchQuery extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			searchQuery: this.props.searchQuery ? JSON.parse(JSON.stringify(this.props.searchQuery)) : {
				searchName: "",
				priceMin: 0,
				priceMax: 0,
			}
		}
	}

	searchOnPress = () => {
		if (isNaN(this.state.searchQuery.priceMin)) {
			Alert.alert("Input Error", "Min price must be a number")
			return
		}

		if (isNaN(this.state.searchQuery.priceMax)) {
			Alert.alert("Input Error", "Max price must be a number")
			return
		}


		this.props.updateSeachQuery({
			searchName: this.state.searchQuery.searchName,
			priceMin: this.state.searchQuery.priceMin,
			priceMax: this.state.searchQuery.priceMax,
		})
		Actions.pop()
	}

	onChangeSearchName = (str) => {
		this.setState({
			searchQuery: {
				searchName: str,
				priceMin: this.state.searchQuery.priceMin,
				priceMax: this.state.searchQuery.priceMax,
			}
		})
	}

	onChangePriceMin = (str) => {
		if (isNaN(str)) {
			Alert.alert("Input Error", "Min price must be a number")
			return
		}

		this.setState({
			searchQuery: {
				searchName: this.state.searchQuery.searchName,
				priceMin: str,
				priceMax: this.state.searchQuery.priceMax,
			}
		})
	}

	onChangePriceMax = (str) => {
		if (isNaN(str)) {
			Alert.alert("Input Error", "Max price must be a number")
			return
		}

		this.setState({
			searchQuery: {
				searchName: this.state.searchQuery.searchName,
				priceMin: this.state.searchQuery.priceMin,
				priceMax: str,
			}
		})
	}

	render() {
		return (
			<KeyboardAvoidingView style={Styles.backgroundColor} behavior={Platform.OS === 'android' ? null : "padding"}>
				<Header backOnPress={Actions.pop} title={"Search Item"} />

				<CustomTextInput
					title={"Item Name"}
					value={this.state.searchQuery.searchName}
					defaultValue={this.state.searchQuery.searchName}
					placeholder={"Enter Item Name"}
					onChangeText={this.onChangeSearchName}
				/>

				<CustomTextInput
					title={"Min Price"}
					value={this.state.searchQuery.priceMin}
					defaultValue={this.state.searchQuery.priceMin}
					placeholder={"Enter Min Price"}
					onChangeText={this.onChangePriceMin}
				/>

				<CustomTextInput
					title={"Max Price"}
					value={this.state.searchQuery.priceMax}
					defaultValue={this.state.searchQuery.priceMax}
					placeholder={"Enter Max Price"}
					onChangeText={this.onChangePriceMax}
				/>

				<BottomHoverButton text={"Search"} onPress={this.searchOnPress} />
			</KeyboardAvoidingView>
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

const searchQueryStyles = StyleSheet.create({
	mainContainer: { 
		flexDirection: "row", 
		justifyContent: "space-between",
		paddingHorizontal: 12,
		paddingVertical: 4
	}
})

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

export {
	EditSearchQuery,
}