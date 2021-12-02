import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'
import { GetStoreList } from '../api/api'
import { Colors } from '../common/colors'
import { Styles } from '../common/styles'
import Header from '../components/header'
import { RenderListFooter, RenderSeperator } from '../components/list-common-components'

export default class StoreList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			listData: [],
			loading: false,
			endOfList: false,
		}
	}

	componentDidMount() {
		this.loadListData(0, 3)
	}

	loadListData = async (skip, count) => {
		if (this.state.endOfList || this.state.loading) {
			return
		}

		this.setState({ loading: true }, async () => {

			const data = await GetStoreList(skip, count)

			if (data === null) {
				return
			}

			let nextState = {
				loading: false,
				listData: this.state.listData,
			}

			if (data.stores != null) {
				nextState["listData"] = this.state.listData.concat(data.stores)
			}

			if (data.stores == null || data.stores.length != count) {
				nextState["endOfList"] = true
			}

			this.setState(nextState)
		})
	}

	listItemOnPress = (data) => {
		Actions.ItemList({
			storeData: data,
			userData: this.props.userData,
		})
	}

	renderListItem = ({ item: data, index, seperators }) => (
		<TouchableOpacity onPress={() => { this.listItemOnPress(data) }}>
			<View style={Styles.listItemContainer}>
				<View style={listItemStyles.mainContainer}>
					<View style={listItemStyles.placeHolderImage}><Text style={{ textAlign: "center", padding: 12 }}>Placeholder Image</Text></View>
					<Text style={listItemStyles.nameText}>Name: {data.name}</Text>
					<Text style={listItemStyles.locationText}>Location: {data.location}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)

	render() {
		return (
			<View style={{ flex: 1 }}>
				<Header title={"Store List"} backOnPress={Actions.pop} />

				<FlatList
					style={Styles.list}
					renderItem={this.renderListItem}
					data={this.state.listData}
					ItemSeparatorComponent={RenderSeperator}
					ListFooterComponent={RenderListFooter}
					ListHeaderComponent={RenderSeperator}
					keyExtractor={(item, index) => item._id}
					onEndReached={() => { this.loadListData(this.state.listData.length, 3) }}
					onEndReachedThreshold={0.5}
				/>
			</View>
		)
	}
}

const listItemStyles = StyleSheet.create({
	placeHolderImage: {
		width: 256,
		height: 256,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.COLOR_PALLET_3,
		borderRadius: 12,
	},

	mainContainer: {
		justifyContent: "center",
		alignItems: "center"
	},

	locationText: {
		marginTop: 12,
		fontSize: 16
	},

	nameText: {
		marginTop: 12,
		fontSize: 20
	}
})