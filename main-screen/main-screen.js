import React from 'react';
import {
	Text,
	View,
	StyleSheet
} from 'react-native'
import BottomNav from './nav-button';

export default class MainScreen extends React.Component {
	render() {
		return (
			<View style={styles.mainContainer}>
				<Text>Sample App</Text>
				<BottomNav />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: "column",
		justifyContent: "space-between",
		flex: 1
	}
})