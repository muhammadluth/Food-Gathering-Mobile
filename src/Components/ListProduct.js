import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';
import {
  Text,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';

import Icon from 'react-native-vector-icons/Ionicons';
import ConvertRupiah from 'rupiah-format';
import {API_BASEURL} from 'react-native-dotenv';

export default class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cart: [],
      search: '',
      total: 0,
      allPage: [],
      active: false,
    };
  }

  render() {
    const {product, handleCart} = this.props;
    return (
      <List>
        {product.map(item => (
          <ListItem thumbnail>
            <Left>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Details', {
                    id: item.id,
                    product: item.name,
                    image: item.image,
                    price: item.price,
                    category: item.category,
                    description: item.description,
                    quantity: item.qty,
                  })
                }>
                <Thumbnail
                  square
                  source={{uri: `${API_BASEURL}/` + item.image}}
                />
              </TouchableOpacity>
            </Left>
            <Body>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Details', {
                    id: item.id,
                    product: item.name,
                    image: item.image,
                    price: item.price,
                    category: item.category,
                    description: item.description,
                    quantity: item.qty,
                  })
                }>
                <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                <Text note numberOfLines={1}>
                  {ConvertRupiah.convert(item.price)}
                </Text>
              </TouchableOpacity>
            </Body>
            <Right>
              <Button
                style={{
                  backgroundColor: '#ff4757',
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                }}
                onPress={() => this.props.handleCart(item)}>
                <Icon
                  size={25}
                  style={{alignItems: 'center', color: '#fff'}}
                  name="ios-cart"
                />
              </Button>
            </Right>
          </ListItem>
        ))}
      </List>
    );
  }
}
const styles = StyleSheet.create({
  searchBar: {
    width: 250,
    height: 40,
    marginBottom: 10,
    marginTop: 20,
    borderColor: '#000',
  },
  body: {
    alignItems: 'center',
  },
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
    margin: 22,
  },
});
