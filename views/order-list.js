import React from 'react'
import { View, Text } from 'react-native'
import Header from '../components/header'

export default class OrderList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			listData: []
		}
	}

	render() {
		return (
			<View>
				<Header title={"Order List"} backOnPress={Actions.pop}/>
				<Text>
					Order List
				</Text>
			</View>
		)
	}
}