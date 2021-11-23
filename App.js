import React from 'react';
import ItemList from './views/item-list'
import OrderList from './views/order-list'
import PreviewOrder from './views/preview-order'
import StoreList from './views/store-list'
import {
  Scene,
  Router,
  Stack,
} from 'react-native-router-flux';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="login" component={ItemList} hideNavBar/>
          <Scene key="register" component={OrderList} hideNavBar/>
          <Scene key="home" component={PreviewOrder} hideNavBar/>
          <Scene key="home" component={StoreList} hideNavBar/>
        </Stack>
      </Router>
    )
  }
}

// @react-native-community/masked-view @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens
