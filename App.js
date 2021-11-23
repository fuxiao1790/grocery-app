import React from 'react';
import ItemList from './views/item-list'
import OrderList from './views/order-list'
import PreviewOrder from './views/preview-order'
import StoreList from './views/store-list'
import { Scene, Router, Stack } from 'react-native-router-flux';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="StoreList" component={StoreList} hideNavBar/>
          <Scene key="ItemList" component={ItemList} hideNavBar/>
          <Scene key="OrderList" component={OrderList} hideNavBar/>
          <Scene key="PreviewOder" component={PreviewOrder} hideNavBar/>
        </Stack>
      </Router>
    )
  }
}