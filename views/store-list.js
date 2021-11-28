import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'
import { GetStoreList } from '../api/api'
import { Colors } from '../common/colors'
import { Styles } from '../common/styles'
import Header from '../components/header'
import { RenderListFooter, RenderSeperator } from '../components/list-item-seperator'

export default class StoreList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			listData: []
		}
	}

	componentDidMount() {
		this.loadListData(0, 10)
	}

	loadListData = async (skip, count) => {
		const data = await GetStoreList(skip, count)
		this.setState({ listData: data.stores })
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
					keyExtractor={(item, index) => item._id}
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