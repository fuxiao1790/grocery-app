import { StyleSheet } from "react-native"
import { Colors } from "./colors"

const Styles = StyleSheet.create({
    listItemContainer: {
        backgroundColor: Colors.COLOR_PALLET_2,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginHorizontal: 6,
        borderRadius: 6,
    },

    listItemContainerHL: {
        backgroundColor: Colors.COLOR_PALLET_4,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginHorizontal: 6,
        borderRadius: 6,
    },

    list: {
        backgroundColor: Colors.COLOR_PALLET_3,
        flex: 1
    },

    backgroundColor: {
        backgroundColor: Colors.COLOR_PALLET_3,
        flex: 1
    },

    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.33,
        shadowRadius: 2.22,

        elevation: 3,
    }
})

export {
    Styles
}