import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'
import { Colors } from '../common/colors'
import { Styles } from '../common/styles'
import AddItemButton from '../components/add-item-button'
import BottomHoverButton from '../components/bottom-hover-button'
import Header from '../components/header'
import { RenderListFooter, RenderSeperator } from '../components/list-item-seperator'
import RemoveItemButon from '../components/remove-item-button'

export default class PreviewOrder extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			listData: JSON.parse(JSON.stringify(this.props.orderData))
		}
	}

	listItemRemoveAllOnPress = (item) => {
		let newListData = this.state.listData.filter(i => i.data._id !== item.data._id)
		this.setState({ listData: newListData })

		this.props.listItemRemoveAllOnPress(item.data)
	}

	listItemRemoveOnPress = (item) => {
		if (item.count == 1) {
			let newListData = this.state.listData.filter(i => i.data._id !== item.data._id)
			this.setState({ listData: newListData })

		} else {
			let res = this.state.listData.find(i => i.data._id === item.data._id)
			res.count--
			this.setState(this.state)
		}

		this.props.listItemRemoveOnPress(item.data)
	}

	listItemAddOneOnPress = (item) => {
		let res = this.state.listData.find(i => i.data._id === item.data._id)
		res.count++
		this.setState(this.state)

		this.props.listItemAddOneOnPress(item.data)
	}

	renderListItem = ({ item: item, index, seperators }) => (
		<View style={Styles.listItemContainerHL}>
			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<View>
					<Text>Item Name: {item.data.name}</Text>
					<Text>Price Per Unit: {item.data.price}</Text>
					<Text>Unit In Cart: {item.count}</Text>
					<Text>Total Price: {item.data.price * item.count}</Text>
				</View>
				<View style={listItemStyles.addRemoveContainer}>
					<View style={{ flexDirection: "row", marginRight: 6 }}>
						<RemoveItemButon onPress={() => { this.listItemRemoveOnPress(item) }} />
					</View>

					<View style={{ flexDirection: "row", justifyContent: "center", marginHorizontal: 12 }}>
						<Text style={{ textAlign: "center", fontSize: 18, width: 18 }}>{item.count}</Text>
					</View>

					<View style={{ flexDirection: "row", marginLeft: 6 }}>
						<AddItemButton onPress={() => { this.listItemAddOneOnPress(item) }} />
					</View>
				</View>
			</View>
		</View>
	)

	checkoutOnPress = () => {
		Actions.Checkout({
			storeData: this.props.storeData,
			orderData: this.state.listData,
			userData: this.props.userData,
		})
	}

	calcSubTotal = () => {
		let total = 0
		this.props.orderData.forEach((el) => {
			total += el.data.price * el.count
		})
		return total
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<Header title={"Preview Order"} backOnPress={Actions.pop} />
				<FlatList
					style={Styles.list}
					renderItem={this.renderListItem}
					data={this.state.listData}
					ItemSeparatorComponent={RenderSeperator}
					ListFooterComponent={RenderListFooter}
					keyExtractor={(item, index) => item.data._id}
					ListHeaderComponent={RenderSeperator}
				/>

				<BottomHoverButton>
					<TouchableOpacity onPress={this.checkoutOnPress}>
						<Text style={{ textAlign: "center" }}>Subtotal: ${this.calcSubTotal()}</Text>
						<Text style={{ textAlign: "center", fontSize: 16 }}>Checkout</Text>
					</TouchableOpacity>
				</BottomHoverButton>
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
		justifyContent: "flex-start",
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