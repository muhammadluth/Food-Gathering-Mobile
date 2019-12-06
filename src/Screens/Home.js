import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Linking,
  ToastAndroid,
  RefreshControl,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  Content,
  Text,
  Badge,
  Input,
  Item,
  View,
  Spinner,
  Button,
  Picker,
} from 'native-base';
import ListProduct from '../Components/ListProduct';
import ListLatents from '../Components/ListLatents';
import {connect} from 'react-redux';
import {getMenu} from '../Public/Redux/Actions/Menu';
import Icon from 'react-native-vector-icons/Ionicons';
const HEIGHT_DEVICE = Dimensions.get('window').height;
const WIDTH_DEVICE = Dimensions.get('window').width;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cart: [],
      search: '',
      sort: '',
      type: '',
      total: 0,
      allPage: [],
      loading: true,
      refresh: false,
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
        sort: this.state.sort,
        type: this.state.type,
      }),
    );
    this.setState({data: this.props.data.menuList, loading: false});
  }
  getSortASC = async value => {
    let sort = value;
    await this.setState({sort, type: 'ASC'});
    return this.fetchData(sort, this.state.search);
  };
  getSortDESC = async value => {
    let sort = value;
    await this.setState({sort, type: 'DESC'});
    return this.fetchData(sort, this.state.search);
  };

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
    ToastAndroid.show(
      'Success Add to Cart',
      ToastAndroid.TOP,
      ToastAndroid.SHORT,
    );
  }

  async addToCart() {
    await this.props.navigation.navigate('Cart', {
      cart: this.state.cart,
    });
    await this.setState({
      cart: [],
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
  _onRefresh = () => {
    this.setState({refresh: true});
    this.fetchData().then(() =>
      this.setState({
        refresh: false,
      }),
    );
  };
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
          <Button small transparent onPress={() => this.addToCart()}>
            <Icon name="ios-cart" size={35} style={styles.icon} />
            <Badge info style={{top: -10}}>
              <Text>{this.state.cart.length}</Text>
            </Badge>
          </Button>
          <Button
            small
            transparent
            style={{paddingLeft: 5}}
            onPress={() =>
              Linking.openURL(
                'whatsapp://send?text=Thanks for Feedback&phone=+6281392371406',
              )
            }>
            <Icon name="ios-chatboxes" size={35} style={styles.icon} />
          </Button>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this._onRefresh}
            />
          }>
          <Content style={{width: '100%'}}>
            <View>
              <ListLatents
                {...this.props}
                product={this.state.data}
                sort={this.state.sort}
                type={this.state.type}
              />
            </View>
          </Content>
          <Content>
            <View style={styles.viewSort}>
              <Text style={styles.textSort}>ASC :</Text>
              <View style={{width: 120}}>
                <Picker
                  mode="dropdown"
                  placeholder="Sort"
                  iosIcon={<Icon name="ios-arrow-dropup" />}
                  selectedValue={this.state.sort}
                  onValueChange={this.getSortASC.bind(this)}>
                  <Picker.Item label="Name" value="name" />
                  <Picker.Item label="Price" value="Price" />
                  <Picker.Item label="Newest" value="created_at" />
                </Picker>
              </View>
              <Text style={styles.textSort}>DESC :</Text>
              <View style={{width: 120}}>
                <Picker
                  mode="dropdown"
                  placeholder="Sort"
                  iosIcon={<Icon name="ios-arrow-dropdown" />}
                  selectedValue={this.state.sort}
                  onValueChange={this.getSortDESC.bind(this)}>
                  <Picker.Item label="Name" value="name" />
                  <Picker.Item label="Price" value="Price" />
                  <Picker.Item label="Latest" value="created_at" />
                </Picker>
              </View>
            </View>
            {this.state.loading === true ? (
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
    width: '75%',
    height: 35,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  viewSort: {
    flexDirection: 'row',
    width: '100%',
  },
  body: {
    flexDirection: 'row',
    backgroundColor: '#ff4757',
    padding: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    color: '#fff',
  },
  textSort: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
});
const mapStateToProps = state => {
  return {
    data: state.menuList,
  };
};

export default connect(mapStateToProps)(Home);
