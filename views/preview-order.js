import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'
import { Styles } from '../common/styles'
import BottomHoverButton from '../components/bottom-hover-button'
import Header from '../components/header'
import { RenderListFooter, RenderSeperator } from '../components/list-item-seperator'

export default class PreviewOrder extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			listData: this.props.orderData,
		}
	}

	renderListItem = ({ item: item, index, seperators }) => (
		<View style={Styles.listItemContainer}>
			<Text>Name: {item.data.name}</Text>
			<Text>Price Per Unit: {item.data.price}</Text>
			<Text>Unit: {item.count}</Text>
			<Text>Price: {item.data.price * item.count}</Text>
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
				/>

				<BottomHoverButton>
					<TouchableOpacity onPress={this.checkoutOnPress}>
						<Text style={{textAlign: "center"}}>Subtotal: {this.calcSubTotal()}</Text>
						<Text style={{textAlign: "center"}}>Checkout</Text>
					</TouchableOpacity>
				</BottomHoverButton>
			</View>
		)
	}
}