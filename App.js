import React, {Component} from 'react';
import Navigations from './src//Navigations';
import {Provider} from 'react-redux';
import store from './src/Public/Redux/store';
export default class App extends React.Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <Navigations />
        </Provider>
      </>
    );
  }
}
