import { StyleSheet } from "react-native"
import { Colors } from "./colors"

const Styles = StyleSheet.create({
    listItemContainer: {
        backgroundColor: Colors.COLOR_PALLET_2,
        paddingVertical: 12,
        paddingHorizontal: 16
    },

    listItemContainerHL: {
        backgroundColor: Colors.COLOR_PALLET_4,
        paddingVertical: 12,
        paddingHorizontal: 16
    },

    list: {
        backgroundColor: Colors.COLOR_PALLET_3
    }
})

export {
    Styles
}