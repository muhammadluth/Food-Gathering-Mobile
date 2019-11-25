import React, {Component} from 'react';
import {
  Container,
  Content,
  Button,
  Icon,
  Text,
  View,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  Badge,
} from 'native-base';
import {
  StyleSheet,
  ToastAndroid,
  RefreshControl,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../Components/Header';
import ConvertRupiah from 'rupiah-format';
import Http from '../Public/Utils/Http';
import {API_BASEURL} from 'react-native-dotenv';
export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      data: [],
      cart: [],
      total: 0,
      name: '',
      user: '',
      email: '',
      token: '',
      refresh: false,
    };
  }
  async componentDidMount() {
    this.handleData();
    try {
      const value = await AsyncStorage.getItem('user');
      const token = await AsyncStorage.getItem('token');
      const email = await AsyncStorage.getItem('email');
      if (value !== null) {
        this.setState({
          user: value,
          token: token,
          email: email,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  _onRefresh = () => {
    this.setState({refresh: true});
    this.setState({
      refresh: false,
    });
  };
  handleData() {
    this.setState({cart: this.props.navigation.getParam('cart')});
  }
  async handleCheckOut() {
    let cashier = await this.state.user;
    let receipt = Math.floor(Math.random() * 10000);
    this.state.cart.map((item, index) => {
      Http.post(`/api/v1/order/`, {
        invoices: receipt,
        user: cashier,
        orders: item.name,
        amount: item.price * item.qty,
      })
        .then(res => {
          ToastAndroid.show(
            'Success Checkout',
            ToastAndroid.TOP,
            ToastAndroid.SHORT,
          );
          this.props.navigation.navigate('Index');
        })
        .catch(err => {
          console.log(err);
          ToastAndroid.show(
            'Failed Checkout',
            ToastAndroid.TOP,
            ToastAndroid.SHORT,
          );
          this.props.navigation.navigate('Cart');
        });
    });
  }
  async handleCancel() {
    await this.setState({
      cart: [],
    });
    ToastAndroid.show('Cancle Checkout', ToastAndroid.TOP, ToastAndroid.SHORT);
    try {
      await AsyncStorage.removeItem('cart');
      return true;
    } catch (exception) {
      return false;
    }
  }
  render() {
    if (this.state.cart) {
      var ListCart = this.state.cart.map(item => {
        return (
          <ListItem thumbnail>
            <Left>
              <Thumbnail
                square
                source={{uri: `${API_BASEURL}/` + item.image}}
              />
            </Left>
            <Body>
              <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
              <Text note numberOfLines={1}>
                Price :{ConvertRupiah.convert(item.price * item.qty)}
              </Text>
            </Body>
            <Right style={styles.qty}>
              <Body>
                <Button
                  success
                  small
                  onPress={() =>
                    item.qty >= item.count ? this.false : (item.qty += 1)
                  }>
                  <Icon name="ios-add" />
                </Button>
              </Body>
            </Right>
            <Right style={styles.qty}>
              <Body>
                <Badge info>
                  <Text>{item.qty}</Text>
                </Badge>
              </Body>
            </Right>
            <Right style={styles.qty}>
              <Body>
                <Button
                  danger
                  small
                  onPress={() =>
                    item.qty <= 0 ? this.false : (item.qty -= 1)
                  }>
                  <Icon name="ios-remove" />
                </Button>
              </Body>
            </Right>
          </ListItem>
        );
      });
    }
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refresh}
            onRefresh={this._onRefresh}
          />
        }>
        <Container>
          <View>
            <Header {...this.props} />
          </View>
          <Content>{ListCart}</Content>
          <View style={styles.viewText}>
            <Text style={{textAlign: 'center', color: '#dfe4ea'}}>
              Pull for Refresh Page
            </Text>
          </View>
          <View>
            <View style={styles.viewTotal}>
              <Text style={styles.textTotal}>
                TOTAL :
                {ConvertRupiah.convert(
                  this.state.cart.reduce((a, c) => a + c.price * c.qty, 0),
                )}
              </Text>
              <Text>Belum termasuk PPN</Text>
            </View>

            <View style={styles.viewCheckout}>
              <Button
                danger
                style={styles.buttonCheckout}
                onPress={() => this.handleCancel()}>
                <Text>Cancel</Text>
              </Button>
              <Button
                info
                style={styles.buttonCheckout}
                onPress={() => this.handleCheckOut()}>
                <Text>Checkout</Text>
              </Button>
            </View>
          </View>
        </Container>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  buttonCheckout: {
    width: 110,
    marginRight: 5,
    marginLeft: 5,
    justifyContent: 'center',
    bottom: 10,
    borderRadius: 20,
  },
  viewCheckout: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  qty: {
    paddingTop: 30,
    fontSize: 11,
    marginHorizontal: -5,
  },
  viewText: {
    position: 'absolute',
    bottom: 300,
    top: 300,
    left: 100,
    right: 100,
  },
  textTotal: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  viewTotal: {
    margin: 20,
  },
});
