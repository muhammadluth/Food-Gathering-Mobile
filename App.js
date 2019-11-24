import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import Navigations from './src//Navigations';
import {Provider} from 'react-redux';
import store from './src/Public/Redux/store';
export default class App extends React.Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <StatusBar backgroundColor="#ff4757" barStyle="light-content" />
          <Navigations />
        </Provider>
      </>
    );
  }
}
