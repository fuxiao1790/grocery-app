import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { Styles } from "../common/styles";
import Header from "../components/header";
import { Colors } from "../common/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BottomHoverContainer } from "../components/bottom-hover-button";
import { RenderListFooter, RenderSeperator } from "../components/list-common-components";

export default class MainPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userID: "",
        }
    }

    onLogin = (id) => this.setState({ userID: id })

    onRegister = (id) => this.setState({ userID: id })

    loginOnPress = () => Actions.Login({ onLogin: this.onLogin })

    registerOnPress = () => Actions.Register({ onRegister: this.onRegister })

    storeListOnPress = () => Actions.StoreList({ userData: { userID: this.state.userID } })

    orderListOnPress = () => Actions.OrderList({ userData: { userID: this.state.userID } })

    render() {
        return (
            <View style={Styles.backgroundColor}>
                <Header title={"Grocery"} root />

                <PromoList />

                <BottomHoverContainer>
                    {this.state.userID.length == 0 ?
                        <DoubleRoundedCornerButton
                            leftText={"Login"}
                            leftOnPress={this.loginOnPress}
                            rightText={"Register"}
                            rightOnPress={this.registerOnPress}
                        />
                        :
                        <DoubleRoundedCornerButton
                            leftText={"Start Shopping"}
                            leftOnPress={this.storeListOnPress}
                            rightText={"Order History"}
                            rightOnPress={this.orderListOnPress}
                        />
                    }
                </BottomHoverContainer>
            </View>
        )
    }
}

class PromoList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            listData: [],
            refreshing: false,
        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = async () => {
        const newData = [1, 2, 3, 4, 5]
        this.setState({ listData: this.state.listData.concat(newData), refreshing: false })
    }

    renderItem = (arg) => (
        <View style={Styles.listItemContainer}>
            <View style={listItemStyles.mainContainer}>
                <View style={listItemStyles.placeHolderImage}><Text style={{ textAlign: "center", padding: 12 }}>Placeholder Promo Image</Text></View>
                <Text style={listItemStyles.nameText}>Placeholder Promo Text 1</Text>
                <Text style={listItemStyles.locationText}>LPlaceholder Promo Text 2</Text>
            </View>
        </View>
    )

    onRefresh = () => {
        this.setState({ listData: [], refreshing: true }, this.loadData)
    }

    render() {
        return (
            <FlatList
                renderItem={this.renderItem}
                data={this.state.listData}
                onEndReached={this.loadData}
                ItemSeparatorComponent={RenderSeperator}
                ListHeaderComponent={RenderSeperator}
                ListFooterComponent={RenderListFooter}
                onRefresh={this.onRefresh}
                refreshing={this.state.refreshing}
            />
        )
    }
}

class DoubleRoundedCornerButton extends React.Component {
    render() {
        return (
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={this.props.leftOnPress}>
                        <View style={styles.buttonLeft}>
                            <Text style={styles.buttonText}>{this.props.leftText}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={this.props.rightOnPress}>
                        <View style={styles.buttonRight}>
                            <Text style={styles.buttonText}>{this.props.rightText}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const listItemStyles = StyleSheet.create({
	placeHolderImage: {
		width: "100%",
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

const styles = StyleSheet.create({

    buttonLeft: {
        paddingVertical: 12,
        paddingLeft: 16,
        marginLeft: 36,
        marginBottom: 12,
        backgroundColor: Colors.COLOR_PALLET_1,
        borderTopLeftRadius: 45,
        borderBottomLeftRadius: 45,
        borderRightColor: Colors.COLOR_PALLET_4,
        borderRightWidth: 1,
        flex: 1,
        ...Styles.shadow,
    },

    buttonRight: {
        paddingVertical: 12,
        paddingRight: 16,
        marginRight: 36,
        marginBottom: 12,
        backgroundColor: Colors.COLOR_PALLET_1,
        borderTopRightRadius: 45,
        borderBottomRightRadius: 45,
        borderRightColor: Colors.COLOR_PALLET_4,
        borderRightWidth: 1,
        flex: 1,
        ...Styles.shadow,
    },

    buttonText: {
        textAlign: "center",
        fontSize: 16
    }
})