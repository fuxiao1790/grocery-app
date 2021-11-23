import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { GetItemList } from '../Api/Api'

export default class ItemList extends React.Component {
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
		const data = await GetItemList(skip, count, this.props.storeData._id)
		this.setState({listData: data.Items})
	}

	renderListItem = ({item: listItem, index, seperators}) => (
		<TouchableOpacity onPress={() => {}}>
			<View>
				<Text>Location: {listItem.location}</Text>
				<Text>Name: {listItem.name}</Text>
			</View>
		</TouchableOpacity>
	)

	renderSeperator = () => (
		<View><Text>SEPERATOR</Text></View>
	)

	render() {
		return (
			<SafeAreaView style={{flex: 1}}>
				<Text>{this.props.storeData.name}</Text>

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