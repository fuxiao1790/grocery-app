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
			listData: JSON.parse(JSON.stringify(this.props.orderData))
		}
	}

	listItemRemoveAllOnPress = (item) => {
		let newListData = this.state.listData.filter(i => i.data._id !== item.data._id)
		this.setState({listData: newListData})

		this.props.listItemRemoveAllOnPress(item)
	}

	listItemRemoveOnPress = (item) => {
		if (item.count == 1) {
			let newListData = this.state.listData.filter(i => i.data._id !== item.data._id)
			this.setState({listData: newListData})
			
		} else {
			let res = this.state.listData.find(i => i.data._id === item.data._id)
			res.count --
			this.setState(this.state)
		}

		this.props.listItemRemoveOnPress(item)
	}

	listItemAddOneOnPress = (item) => {
		let res = this.state.listData.find(i => i.data._id === item.data._id)
		res.count ++
		this.setState(this.state)

		this.props.listItemAddOneOnPress(item)
	}

	renderListItem = ({ item: item, index, seperators }) => (
		<View style={Styles.listItemContainer}>
			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<View>
					<Text>Name: {item.data.name}</Text>
					<Text>Price Per Unit: {item.data.price}</Text>
					<Text>Price: {item.data.price * item.count}</Text>
				</View>
				<View>
					<View>
						{item.count > 0 ?
							<>
								<TouchableOpacity onPress={() => this.listItemRemoveOnPress(item)}>
									<Text style={{ textAlign: "right" }}>Remove One From Cart</Text>
								</TouchableOpacity>
							</>
							:
							null
						}
						{item.count > 1 ?
							<TouchableOpacity onPress={() => { this.listItemRemoveAllOnPress(item) }}>
								<Text style={{ textAlign: "right" }}>Remove All From Cart</Text>
							</TouchableOpacity>
							:
							null
						}
						<Text style={{ textAlign: "right" }}>Count: {item.count}</Text>
					</View>
				</View>
			</View>
		</View>
	)

	checkoutOnPress = () => {
		Actions.Checkout({
			storeData: this.props.storeData,
			orderData: this.props.orderData,
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
				/>

				<BottomHoverButton>
					<TouchableOpacity onPress={this.checkoutOnPress}>
						<Text style={{ textAlign: "center" }}>Subtotal: {this.calcSubTotal()}</Text>
						<Text style={{ textAlign: "center" }}>Checkout</Text>
					</TouchableOpacity>
				</BottomHoverButton>
			</View>
		)
	}
}