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
  AsyncStorage,
  ToastAndroid,
  RefreshControl,
  ScrollView,
} from 'react-native';
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
        console.log(value);
      }
      console.log(value);
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
      console.log(item.name);
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
    console.log(this.state.cart);
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
            <Right style={{marginTop: 10}}>
              <Body>
                <Button
                  success
                  href="#"
                  small
                  onPress={() =>
                    item.qty >= item.count ? this.false : (item.qty += 1)
                  }>
                  <Icon name="ios-add" />
                </Button>
              </Body>
            </Right>
            <Right style={{marginTop: 15}}>
              <Body>
                <Badge info>
                  <Text>{item.qty}</Text>
                </Badge>
              </Body>
            </Right>
            <Right style={{marginTop: 10}}>
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
          <View>
            <View>
              <Text style={{textAlign: 'center'}}>Pull for Refresh Page</Text>
            </View>
            <View style={{margin: 20}}>
              <Text style={{marginBottom: 10, fontWeight: 'bold'}}>
                TOTAL :
                {ConvertRupiah.convert(
                  this.state.cart.reduce((a, c) => a + c.price * c.qty, 0),
                )}
              </Text>
              <Text>Belum termasuk PPN</Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Button
                danger
                style={styles.buttonCheckout}
                onPress={() => this.handleCancel()}>
                <Text>Cancel</Text>
              </Button>
              <Button
                success
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
  buttonCheckout: {
    width: 110,
    marginRight: 5,
    marginLeft: 5,
    justifyContent: 'center',
    bottom: 10,
    borderRadius: 20,
  },
});
