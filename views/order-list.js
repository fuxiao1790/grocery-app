import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'

export default class OrderList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			listData: []
		}
	}

	render() {
		return (
			<SafeAreaView>
				<Text>
					Item List
				</Text>
			</SafeAreaView>
		)
	}
}