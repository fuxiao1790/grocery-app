import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'
import { GetOrderList } from '../api/api'
import { Styles } from '../common/styles'
import Header from '../components/header'
import { RenderListFooter, RenderSeperator } from '../components/list-common-components'

export default class OrderList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			listData: [],
			loading: false,
			endOfList: false,
		}
	}

	componentDidMount() {
		this.loadListData(0, 100, this.props.userData.userID)
	}

	listItemOnPress = (item) => Actions.OrderDetail({orderData: item})

	renderListItem = (arg) => (
		<TouchableOpacity onPress={() => this.listItemOnPress(arg.item)}>
			<View style={Styles.listItemContainer}>
				<Text>Order Detail</Text>
				<Text>Delivery address: {arg.item.location}</Text>
				<Text>Subtotal: {arg.item.subtotal}</Text>
				<Text>Created at: {new Date(arg.item["created-at"] * 1000).toTimeString()}</Text>

				<Text>Store Detail</Text>
				<Text>Store name: {arg.item["store-data"].name}</Text>
				<Text>Store address: {arg.item["store-data"].location}</Text>
			</View>
		</TouchableOpacity>
	)

	onEndReached = () => this.loadListData(this.state.listData.length, 5, this.props.userData.userID)

	loadListData = async (skip, count, userID) => {
		if (this.state.loading || this.state.endOfList) {
			return
		}

		this.setState({loading: true}, async() => {
			if (this.state.endOfList) {
				return
			}

			const res = await GetOrderList(skip, count, userID)
			if (res === null) {
				// connection error
				return
			}

			if (res.orders === null || res.orders.length === 0) {
				this.setState({ 
					listData: this.state.listData.concat(res.orders),
					loading: false,
					endOfList: true,
				})
			} else {
				this.setState({ 
					listData: this.state.listData.concat(res.orders),
					loading: false,
					endOfList: false,
				})
			}
		})
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<Header title={"Order History"} backOnPress={Actions.pop} />

				<FlatList
					style={Styles.list}
					renderItem={this.renderListItem}
					data={this.state.listData}
					ItemSeparatorComponent={RenderSeperator}
					ListFooterComponent={RenderListFooter}
					ListHeaderComponent={RenderSeperator}
					keyExtractor={(item, index) => item._id}
				/>
			</View>
		)
	}
}