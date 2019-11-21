import React, {Component} from 'react';
import {StyleSheet, Image, ToastAndroid} from 'react-native';
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
import {AsyncStorage} from 'react-native';
import Header from '../Components/Header';
import Http from '../Public/Utils/Http';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      token: '',
      email: '',
      image: '',
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('user');
      const token = await AsyncStorage.getItem('token');
      const email = await AsyncStorage.getItem('email');
      if (value !== null) {
        this.setState({user: value, token: token, email: email});
        console.log(value);
      }
      console.log(value);
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
  render() {
    return (
      <Container>
        <Header {...this.props} />
        <Content>
          <View style={{alignItems: 'center'}}>
            {this.state.loading ? (
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
              {this.state.email !== 'admin@admin.com' ? (
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
              {this.state.email !== 'admin@admin.com' ? (
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
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    margin: 18,
    fontFamily: 'GothamRounded-Bold',
    fontWeight: 'bold',
    color: '#ff4757',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  icons: {
    margin: 20,
  },
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
