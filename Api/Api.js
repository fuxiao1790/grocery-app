import { Platform } from "react-native"

const BASE_URL_IOS_DEV = "https://localhost:443"
const BASE_URL_ANDROID_DEV = "http://192.168.2.11:8080"
const HEADERS = { "Content-Type": "application/json" }

const STORE_LIST_ROUTE = "/store/list"
const ITEM_LIST_ROUTE = "/item/list"
const ORDER_LIST_ROUTE = "/order/list"
const CREATE_ORDER_ROUTE = "/order/create"
const LOGIN_ROUTE = "/user/login"
const REGISTER_ROUTE = '/user/register'

async function GetStoreList(skip, count) {
    const url = urlHelper() + STORE_LIST_ROUTE

    const payload = {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ skip: skip, count: count })
    }

    return await helper(url, payload)
}

async function GetItemList(skip, count, storeID) {
    const url = urlHelper() + ITEM_LIST_ROUTE

    const payload = {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ skip: skip, count: count, "store-id": storeID })
    }

    return await helper(url, payload)
}

async function GetOrderList(skip, count, userID) {
    const url = urlHelper() + ORDER_LIST_ROUTE

    const payload = {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ 
            "skip": skip, 
            "count": count,
            "user-id": userID
        })
    }

    return await helper(url, payload)
}

async function UserRegister(username, password) {
    const url = urlHelper() + REGISTER_ROUTE
    
    const payload = {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({"username": username, "password": password})
    }

    return await helper(url, payload)
}

async function UserLogin(username, password) {
    const url = urlHelper() + LOGIN_ROUTE
    
    const payload = {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({"username": username, "password": password})
    }

    return await helper(url, payload)
}

async function SubmitOrder(userData, orderData, storeData, address) {
    const url = urlHelper() + CREATE_ORDER_ROUTE
    
    let items = {}
    orderData.forEach(item => items[item.data._id] = item.count)

    const payload = {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({
            "items": items,
            "location": address,
            "user-id": userData.userID,
            "store-id": storeData._id,
        })
    }

    return await helper(url, payload)
}

async function helper(url, payload) {
    try {
        const res = await fetch(url, payload)
        const json = await res.json()

        if (__DEV__) {
            console.log(json)
        }
    
        return json
    } catch(err) {
        console.log("error calling " + url + " | " + err)
        console.log(JSON.stringify(err))
    }

    return null
}

function urlHelper() {
    if (Platform.OS === "android") {
        return BASE_URL_ANDROID_DEV
    }

    return BASE_URL_IOS_DEV
}

export {
    GetStoreList,
    GetItemList,
    GetOrderList,
    SubmitOrder,
    UserLogin,
    UserRegister,
}