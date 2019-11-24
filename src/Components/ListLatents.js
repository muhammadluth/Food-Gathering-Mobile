import React, {Component} from 'react';
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Card, Text, Button, View} from 'native-base';
import Http from '../Public/Utils/Http';
import ConvertRupiah from 'rupiah-format';
import {API_BASEURL} from 'react-native-dotenv';

export default class ListLatents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: [],
    };
  }
  componentDidMount() {
    this.getUpdate();
  }
  getUpdate = async () => {
    await Http.get(`/api/v1/product/desc?sort=created_at`)
      .then(result => {
        this.setState({
          updated: result.data.data,
        });
      })
      .catch(err => {
        console.log(err);
        alert('Error,Viewing Data');
      });
  };

  render() {
    const ListLatents = this.state.updated;
    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}>
        {ListLatents.map(item => (
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
            <View style={styles.View}>
              <Card style={styles.cardView}>
                <ImageBackground
                  source={{uri: `${API_BASEURL}/` + item.image}}
                  style={{height: '100%', width: '100%'}}>
                  <View style={styles.viewOverlay}>
                    <Text style={styles.textProduct}>{item.name}</Text>
                    <Text style={styles.cardPrice}>
                      {ConvertRupiah.convert(item.price)}
                    </Text>
                    <Text style={styles.textCategory}>{item.category}</Text>
                  </View>
                </ImageBackground>
              </Card>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  View: {
    width: 392,
    height: 130,
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
  textCategory: {
    fontSize: 12,
    padding: 2,
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#ff4757',
    backgroundColor: '#fff',
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 2,
  },
  cardPrice: {
    position: 'absolute',
    top: 10,
    left: 0,
    color: '#ff4757',
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    fontSize: 12,
    padding: 1,
  },
  textProduct: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textDecorationLine: 'underline',
  },
  viewOverlay: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});
