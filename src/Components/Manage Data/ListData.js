import React, {Component} from 'react';
import {
  Container,
  Content,
  Button,
  ListItem,
  View,
  Text,
  Icon,
  Left,
  Body,
  List,
  Thumbnail,
  Right,
  Spinner,
} from 'native-base';
import {StyleSheet, AsyncStorage} from 'react-native';
import ConvertRupiah from 'rupiah-format';
import {API_BASEURL} from 'react-native-dotenv';
export default class ListData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    AsyncStorage.getItem('token').then(res => console.log(res));
    return (
      <List>
        {this.props.data.map(item => (
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
                {ConvertRupiah.convert(item.price)}
              </Text>
            </Body>
            <ListItem icon style={{marginRight: -20}}>
              <Left>
                <Button
                  style={{backgroundColor: '#FF9501'}}
                  onPress={() =>
                    this.props.handleButtonEditData({
                      id: item.id,
                      product: item.name,
                      description: item.description,
                      image: item.image,
                      category: item.category,
                      price: item.price,
                      qty: item.qty,
                    })
                  }>
                  <Icon active name="create" />
                </Button>
              </Left>
              <Body>
                <Text>Edit Data</Text>
              </Body>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button
                  style={{backgroundColor: 'red'}}
                  onPress={() => this.props.handleDelete(item.id)}>
                  <Icon active name="trash" />
                </Button>
              </Left>
              <Body>
                <Text>Delete Data</Text>
              </Body>
            </ListItem>
          </ListItem>
        ))}
      </List>
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
});
