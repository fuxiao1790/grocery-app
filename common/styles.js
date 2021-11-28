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
    }
})

export {
    Styles
}