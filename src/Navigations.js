import React, {Component} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Cart from './Screens/Cart';
import Home from './Screens/Home';
import History from './Components/History';
import Splashscreen from './Screens/Splashscreen';
import HistoryUser from './Screens/HistoryUser';
import Details from './Components/Details';
import ManageData from './Components/Manage Data/Index';
import AddData from './Components/Manage Data/AddProduct';
import EditData from './Components/Manage Data/EditProduct';
import Menu from './Screens/Menu';

const MainNavigator = createStackNavigator(
  {
    Splashscreen: {screen: Splashscreen},
    Login: {screen: Login},
    SignUp: {screen: SignUp},
    Cart: {screen: Cart},
    Details: {screen: Details},
    History: {screen: History},
    ManageData: {screen: ManageData},
    AddData: {screen: AddData},
    EditData: {screen: EditData},
    Index: createMaterialBottomTabNavigator({
      Home: {
        screen: Home,
        navigationOptions: {
          tabBarLabel: 'Home',
          tabBarIcon: ({tintColor}) => (
            <View>
              <Icon style={[{color: tintColor}]} size={25} name={'ios-home'} />
            </View>
          ),
          activeColor: '#ff4757',
          inactiveColor: '#bdc3c7',
          barStyle: {backgroundColor: '#fff'},
        },
      },

      HistoryUser: {
        screen: HistoryUser,
        navigationOptions: {
          tabBarLabel: 'Notification',
          tabBarIcon: ({tintColor}) => (
            <View>
              <Icon style={[{color: tintColor}]} size={25} name={'ios-paper'} />
            </View>
          ),
          activeColor: '#ff4757',
          inactiveColor: '#bdc3c7',
          barStyle: {backgroundColor: '#fff'},
        },
      },
      Menu: {
        screen: Menu,
        navigationOptions: {
          tabBarLabel: 'Menu',
          tabBarIcon: ({tintColor}) => (
            <View>
              <Icon style={[{color: tintColor}]} size={25} name={'ios-menu'} />
            </View>
          ),
          activeColor: '#ff4757',
          inactiveColor: '#bdc3c7',
          barStyle: {backgroundColor: '#fff'},
        },
      },
    }),
  },
  {
    headerMode: 'none',
    initialRouteName: 'Splashscreen',
  },
);

export default createAppContainer(MainNavigator);
