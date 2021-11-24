import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'
import { GetStoreList } from '../Api/Api'

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

	renderListItem = ({item: data, index, seperators}) => (
		<TouchableOpacity onPress={() => {Actions.ItemList({storeData: data})}}>
			<View>
				<Text>Location: {data.location}</Text>
				<Text>Name: {data.name}</Text>
			</View>
		</TouchableOpacity>
	)

	renderSeperator = () => (
		<View><Text>SEPERATOR</Text></View>
	)

	render() {
		return (
			<SafeAreaView style = {{flex: 1}}>
				<FlatList
					renderItem = {this.renderListItem}
					data = {this.state.listData}
					ItemSeparatorComponent = {this.renderSeperator}
					keyExtractor = {(item, index) => item._id}
				/>
			</SafeAreaView>
		)
	}
}