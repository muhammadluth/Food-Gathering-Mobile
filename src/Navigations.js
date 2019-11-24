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
import Locations from './Screens/Location';

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
          activeColor: '#f0edf6',
          inactiveColor: '#226557',
          barStyle: {backgroundColor: '#ff4757'},
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
          activeColor: '#f0edf6',
          inactiveColor: '#226557',
          barStyle: {backgroundColor: '#ff4757'},
        },
      },
      Location: {
        screen: Locations,
        navigationOptions: {
          tabBarLabel: 'Maps',
          tabBarIcon: ({tintColor}) => (
            <View>
              <Icon style={[{color: tintColor}]} size={25} name={'ios-pin'} />
            </View>
          ),
          activeColor: '#f0edf6',
          inactiveColor: '#226557',
          barStyle: {backgroundColor: '#ff4757'},
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
          activeColor: '#f0edf6',
          inactiveColor: '#226557',
          barStyle: {backgroundColor: '#ff4757'},
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
