import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  ToastAndroid,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  Container,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  View,
  Spinner,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../Components/Header';
import Http from '../Public/Utils/Http';
import {ADMIN} from 'react-native-dotenv';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      token: '',
      email: '',
      image: '',
      loading: true,
      refresh: false,
    };
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('user');
      const token = await AsyncStorage.getItem('token');
      const email = await AsyncStorage.getItem('email');
      if (value !== null) {
        this.setState({user: value, token: token, email: email});
      }
    } catch (error) {
      console.log(error);
    }
    this.setState({
      image: {
        uri: `https://ui-avatars.com/api/?size=256&rounded=true&name=${this.state.user}`,
      },
      loading: false,
    });
  }
  handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('email');
    this.props.navigation.navigate('Login');
  };
  handleButtonManageTrue() {
    ToastAndroid.show('Welcome Admin', ToastAndroid.TOP, ToastAndroid.SHORT);
    this.props.navigation.navigate('ManageData');
  }
  handleButtonManageFalse() {
    ToastAndroid.show(
      'Sorry, You are Not an Admin',
      ToastAndroid.TOP,
      ToastAndroid.SHORT,
    );
    this.props.navigation.navigate('Index');
  }
  handleButtonHistoryTrue() {
    ToastAndroid.show('Welcome Admin', ToastAndroid.TOP, ToastAndroid.SHORT);
    this.props.navigation.navigate('History');
  }
  handleButtonHistoryFalse() {
    ToastAndroid.show(
      'Sorry, You are Not an Admin',
      ToastAndroid.TOP,
      ToastAndroid.SHORT,
    );
    this.props.navigation.navigate('Index');
  }
  _onRefresh = () => {
    this.setState({refresh: true});
    this.setState({
      refresh: false,
    });
  };
  render() {
    return (
      <Container>
        <Header {...this.props} />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this._onRefresh}
            />
          }>
          <Content>
            <View style={{alignItems: 'center'}}>
              {this.state.loading === true ? (
                <Spinner color="red" />
              ) : (
                <Image style={styles.imageProfile} source={this.state.image} />
              )}
            </View>
            <View style={styles.viewAccount}>
              <Text style={styles.name}>{this.state.user}</Text>
            </View>
            <View style={styles.viewAccount}>
              <Text style={styles.email}>{this.state.email}</Text>
            </View>
            <ListItem icon>
              <Left>
                {this.state.email !== `${ADMIN}` ? (
                  <Button
                    style={{backgroundColor: '#f69b31'}}
                    onPress={() => this.handleButtonManageFalse()}>
                    <Icon active name="ios-paper" />
                  </Button>
                ) : (
                  <Button
                    style={{backgroundColor: '#f69b31'}}
                    onPress={() => this.handleButtonManageTrue()}>
                    <Icon active name="ios-paper" />
                  </Button>
                )}
              </Left>
              <Body>
                <Text>Manage Data</Text>
              </Body>
            </ListItem>
            <ListItem icon>
              <Left>
                {this.state.email !== `${ADMIN}` ? (
                  <Button
                    style={{backgroundColor: '#67baf6'}}
                    onPress={() => this.handleButtonHistoryFalse()}>
                    <Icon active name="ios-trending-up" />
                  </Button>
                ) : (
                  <Button
                    style={{backgroundColor: '#67baf6'}}
                    onPress={() => this.handleButtonHistoryTrue()}>
                    <Icon active name="ios-trending-up" />
                  </Button>
                )}
              </Left>
              <Body>
                <Text>History</Text>
              </Body>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button danger onPress={() => this.handleLogout()}>
                  <Icon active name="ios-log-out" />
                </Button>
              </Left>
              <Body>
                <Text>Log-Out</Text>
              </Body>
            </ListItem>
          </Content>
        </ScrollView>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  imageProfile: {
    width: 120,
    height: 120,
    marginTop: 20,
  },
  viewAccount: {
    alignItems: 'center',
    marginVertical: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  email: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
