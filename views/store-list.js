import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'
import { GetStoreList } from '../api/api'
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
		this.setState({listData: data.stores})
	}

	listItemOnPress = (data) => {
		Actions.ItemList({
			storeData: data, 
			userData: this.props.userData,
		})
	}

	renderListItem = ({item: data, index, seperators}) => (
		<TouchableOpacity onPress={() => { this.listItemOnPress(data) }}>
			<View style={Styles.listItemContainer}>
				<Text>Location: {data.location}</Text>
				<Text>Name: {data.name}</Text>
			</View>
		</TouchableOpacity>
	)

	renderSeperator = () => (
		<View style={{paddingVertical: 8}}></View>
	)

	render() {
		return (
			<View style = {{flex: 1}}>
				<Header title={"Store List"} backOnPress={Actions.pop}/>

				<FlatList
					style={Styles.list}
					renderItem = {this.renderListItem}
					data = {this.state.listData}
					ItemSeparatorComponent = {RenderSeperator}
					ListFooterComponent = {RenderListFooter}
					keyExtractor = {(item, index) => item._id}
				/>
			</View>
		)
	}
}