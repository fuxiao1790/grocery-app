import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { GetOrderList } from '../api/api'
import { Styles } from '../common/styles'
import Header from '../components/header'
import { RenderListFooter, RenderSeperator } from '../components/list-item-seperator'

export default class OrderList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			listData: []
		}
	}

	componentDidMount() {
		this.loadListData(0, 100, this.props.userData.userID)
	}

	renderListItem = (arg) => (
		<View style={Styles.listItemContainer}>
			<Text>{arg.item.location}</Text>
			{Object.keys(arg.item.items).map((itemID) => <Text>{itemID + " -> " + arg.item.items[itemID]}</Text>)}
		</View>
	)

	onEndReached = () => this.loadListData(this.state.listData.length, 5, this.props.userData.userID)

	loadListData = async (skip, count, userID) => {
		const res = await GetOrderList(skip, count, userID)

		if (res === null) {
			// connection error
			return
		}

		if (res.orders === null) {
			return
		}

		this.setState({ listData: this.state.listData.concat(res.orders) })
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<Header title={"Order List"} backOnPress={Actions.pop} />

				<FlatList
					style={Styles.list}
					renderItem={this.renderListItem}
					data={this.state.listData}
					ItemSeparatorComponent={RenderSeperator}
					ListFooterComponent={RenderListFooter}
					ListHeaderComponent={RenderSeperator}
					keyExtractor={(item, index) => index}
				// onEndReached={this.onEndReached}
				// onEndReachedThreshold={0.5}
				/>
			</View>
		)
	}
}