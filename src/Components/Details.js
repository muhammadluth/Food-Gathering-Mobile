import React, {Component} from 'react';
import {Image, ImageBackground, StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  View,
  List,
  ListItem,
  Separator,
} from 'native-base';
import {API_BASEURL} from 'react-native-dotenv';
import Header from './Header';
import ConvertRupiah from 'rupiah-format';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.getParam('id'),
      product: this.props.navigation.getParam('product'),
      image: this.props.navigation.getParam('image'),
      price: this.props.navigation.getParam('price'), //
      category: this.props.navigation.getParam('category'),
      description: this.props.navigation.getParam('description'), //
      quantity: this.props.navigation.getParam('quantity'), //
    };
  }
  render() {
    return (
      <Container>
        <Header {...this.props} />
        <Content>
          <View style={styles.ViewBody}>
            <View>
              <Text style={styles.TextTitle}>{this.state.product}</Text>
            </View>
            <View style={styles.View}>
              <Card style={styles.cardView}>
                <ImageBackground
                  source={{uri: `${API_BASEURL}/` + this.state.image}}
                  style={{height: '100%', width: '100%'}}>
                  <View style={styles.viewOverlay}>
                    <Text style={styles.textCategory}>
                      {this.state.category}
                    </Text>
                  </View>
                </ImageBackground>
              </Card>
            </View>
            <View>
              <List>
                <ListItem itemDivider>
                  <Text style={styles.TitleDescription}>Description</Text>
                </ListItem>
                <ListItem>
                  <Text style={styles.TextDescription}>
                    {this.state.description}
                  </Text>
                </ListItem>
                <ListItem itemDivider>
                  <Text>Stock</Text>
                  <Text style={{paddingHorizontal: 10}}>:</Text>
                  <Text>{this.state.quantity}</Text>
                </ListItem>
                <ListItem style={styles.ListDivider} itemDivider>
                  <Text>Price</Text>
                  <Text style={{paddingHorizontal: 15}}>:</Text>
                  <Text>{ConvertRupiah.convert(this.state.price)}</Text>
                </ListItem>
              </List>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  View: {
    width: 393,
    height: 230,
  },
  cardView: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    marginHorizontal: 10,
    position: 'absolute',
    borderColor: '#000',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
  },
  viewOverlay: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  TextTitle: {
    fontSize: 24,
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  ViewBody: {
    marginVertical: 10,
  },
  textCategory: {
    fontSize: 18,
    padding: 2,
    fontWeight: 'bold',
    color: '#ff4757',
    backgroundColor: '#fff',
    borderRadius: 5,
    position: 'absolute',
    top: 10,
    left: 0,
  },
  TitleDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  TextDescription: {
    fontSize: 14,
  },
  ListDivider: {
    marginVertical: 10,
  },
});
