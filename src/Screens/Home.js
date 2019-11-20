import React, {Component} from 'react';
import {StyleSheet, ScrollView, AsyncStorage, Linking} from 'react-native';
import {
  Container,
  Content,
  Text,
  Input,
  Item,
  View,
  Spinner,
  Button,
} from 'native-base';
import ListProduct from '../Components/ListProduct';
import ListLatents from '../Components/ListLatents';
import {connect} from 'react-redux';
import {getMenu} from '../Public/Redux/Actions/Menu';
import Icon from 'react-native-vector-icons/Ionicons';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cart: [],
      search: '',
      total: 0,
      allPage: [],
      loading: true,
    };
    this.handleCart = this.handleCart.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }
  async fetchData() {
    await this.props.dispatch(
      getMenu({
        search: this.state.search,
      }),
    );
    this.setState({data: this.props.data.menuList, loading: false});
  }

  getSearch = async () => {
    let search = this.state.search;
    await this.setState({search});
    return this.fetchData(search);
  };
  calculateTotal(price) {
    this.setState({
      total: this.state.total + price,
    });
    this.state.handleCount(this.state.cart.length);
  }

  handleCart(result) {
    this.setState(state => {
      const cart = state.cart;
      let inCart = false;
      cart.forEach(item => {
        if (item.id === result.id) {
          inCart = true;
          item.qty += 1;
        }
      });
      if (!inCart) {
        cart.push({...result, qty: 1});
      }
      AsyncStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    });
  }

  render() {
    return (
      <Container>
        <View style={styles.body}>
          <Item rounded style={styles.searchBar}>
            <Input
              placeholder="Food Gathering"
              onChangeText={Text => this.setState({search: Text})}
              value={this.state.search}
            />
            <Icon
              name="ios-search"
              size={25}
              style={{paddingHorizontal: 10}}
              onPress={() => this.getSearch()}
            />
          </Item>
          <View style={styles.viewButtonCart}>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate('Cart', {
                  cart: this.state.cart,
                })
              }>
              <Icon name="ios-cart" size={35} style={styles.icon} />
            </Button>
          </View>
          <View style={styles.viewButtonCS}>
            <Button
              transparent
              onPress={() =>
                Linking.openURL(
                  'whatsapp://send?text=Thanks for Feedback&phone=+6281392371406',
                )
              }>
              <Icon name="ios-chatboxes" size={35} style={styles.icon} />
            </Button>
          </View>
        </View>

        <ScrollView>
          <Content style={{width: '100%'}}>
            <View>
              <ListLatents {...this.props} />
            </View>
          </Content>
          <Content>
            {this.state.loading ? (
              <Spinner color="red" />
            ) : (
              <View>
                <ListProduct
                  {...this.props}
                  product={this.state.data}
                  handleCart={this.handleCart}
                />
              </View>
            )}
          </Content>
        </ScrollView>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  searchBar: {
    width: 250,
    height: 35,
    marginVertical: 12,
    borderColor: '#fff',
    backgroundColor: '#fff',
    marginLeft: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  body: {
    flexDirection: 'row',
    backgroundColor: '#ff4757',
  },
  icon: {
    color: '#fff',
  },
  viewButtonCart: {
    position: 'absolute',
    right: 70,
    paddingVertical: 10,
  },
  viewButtonCS: {
    position: 'absolute',
    right: 15,
    paddingVertical: 12,
  },
});
const mapStateToProps = state => {
  return {
    data: state.menuList,
  };
};

export default connect(mapStateToProps)(Home);
