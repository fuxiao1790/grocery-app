import React from 'react';
import ItemList from './views/item-list'
import OrderList from './views/order-list'
import PreviewOrder from './views/preview-order'
import StoreList from './views/store-list'
import Checkout from "./views/checkout"
import MainPage from './views/main-page';
import Login from './views/login';
import Register from './views/register';
import { Scene, Router, Stack } from 'react-native-router-flux';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="MainPage" component={MainPage} hideNavBar/>
          <Scene key="StoreList" component={StoreList} hideNavBar/>
          <Scene key="ItemList" component={ItemList} hideNavBar/>
          <Scene key="OrderList" component={OrderList} hideNavBar/>
          <Scene key="PreviewOrder" component={PreviewOrder} hideNavBar/>
          <Scene key="Checkout" component={Checkout} hideNavBar/>
          <Scene key="Login" component={Login} hideNavBar/>
          <Scene key="Register" component={Register} hideNavBar/>
        </Stack>
      </Router>
    )
  }
}