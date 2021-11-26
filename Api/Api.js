const BASE_URL = "https://localhost:443"
const HEADERS = { "Content-Type": "application/json" }

const STORE_LIST_ROUTE = "/store/list"
const ITEM_LIST_ROUTE = "/item/list"
const ORDER_LIST_ROUTE = "/order/list"
const SUBMIT_ORDER_ROUTE = "/order/submit"

async function GetStoreList(skip, count) {
    const url = BASE_URL + STORE_LIST_ROUTE

    const payload = {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ skip: skip, count: count })
    }

    const res = await fetch(url, payload)
    const json = await res.json()

    if (__DEV__) {
        console.log(json)
    }

    return json
}

async function GetItemList(skip, count, storeID) {
    const url = BASE_URL + ITEM_LIST_ROUTE

    const payload = {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ skip: skip, count: count, "store-id": storeID })
    }

    const res = await fetch(url, payload)
    const json = await res.json()

    if (__DEV__) {
        console.log(json)
    }

    return json
}

async function GetOrderList(skip, count) {
    const url = BASE_URL + ORDER_LIST_ROUTE

    const payload = {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ skip: skip, count: count })
    }

    const res = await fetch(url, payload)
    const json = await res.json()

    if (__DEV__) {
        console.log(json)
    }

    return json
}

async function SubmitOrder(orderData) {
    const url = BASE_URL + SUBMIT_ORDER_ROUTE

    const payload = {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(orderData)
    }

    const res = await fecth(url, payload)
    const json = await res.json()

    if (__DEV__) {
        console.log(json)
    }

    return json
}

export {
    GetStoreList,
    GetItemList,
    GetOrderList,
    SubmitOrder,
}