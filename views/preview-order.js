import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'

export default class PreviewOrder extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<SafeAreaView>
				<Text>
					Preview Order
				</Text>
			</SafeAreaView>
		)
	}
}