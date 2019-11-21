import React, {Component} from 'react';
import {StyleSheet, AsyncStorage, ToastAndroid} from 'react-native';
import {
  Container,
  Content,
  Input,
  Text,
  Form,
  Label,
  Textarea,
  Left,
  Button,
  Title,
  Icon,
  Body,
  View,
  Picker,
  Item,
} from 'native-base';
import {Grid, Col, Row} from 'react-native-easy-grid';
import ImagePicker from 'react-native-image-picker';
import Header from '../Header';
import Http from '../../Public/Utils/Http';
import {API_BASEURL} from 'react-native-dotenv';
class AddProduct extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      description: '',
      image: '',
      category: '',
      price: '',
      qty: '',
      allPage: [],
    };
  }

  setSelectCategory = async value => {
    await this.setState({category: value});
  };
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({image: response});
      }
    });
  };
  handleAddProduct = async () => {
    const {name, description, image, category, price, qty} = {
      ...this.state,
    };

    const pd = new FormData();
    pd.append('name', name);
    pd.append('description', description);
    pd.append('image', {
      name: image.fileName,
      type: image.type,
      uri:
        Platform.OS === 'android'
          ? image.uri
          : image.uri.replace('file://', ''),
    });
    pd.append('category_id', category);
    pd.append('price', price);
    pd.append('qty', qty);

    console.log(pd);
    await Http.post(`/api/v1/product/`, pd)
      .then(result => {
        console.log(result);
        ToastAndroid.show(
          'Success Add Data',
          ToastAndroid.TOP,
          ToastAndroid.SHORT,
        );
        this.props.navigation.navigate('ManageData');
      })
      .catch(err => {
        console.log(err.response);
        ToastAndroid.show(
          'Failed Add Data',
          ToastAndroid.TOP,
          ToastAndroid.SHORT,
        );
        this.props.navigation.navigate('AddData');
      });
  };
  render() {
    console.log(this.state);
    return (
      <Container>
        <View>
          <Header {...this.props} />
        </View>
        <Content>
          <View>
            <Text style={styles.text}>ADD DATA</Text>
          </View>
          <View>
            <Form>
              <Grid>
                <Row>
                  <Col style={styles.col}>
                    <Label>Product</Label>
                  </Col>
                  <Col style={{width: 5, marginTop: 12}}>
                    <Label>:</Label>
                  </Col>
                  <Col>
                    <Item regular style={styles.itemProduct}>
                      <Input
                        onChangeText={Text => this.setState({name: Text})}
                        value={this.state.name}
                      />
                    </Item>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.col}>
                    <Label>Description</Label>
                  </Col>
                  <Col style={{width: 5, marginTop: 12}}>
                    <Label>:</Label>
                  </Col>
                  <Col>
                    <Item regular style={styles.itemProduct}>
                      <Textarea
                        rowSpan={5}
                        onChangeText={Text =>
                          this.setState({description: Text})
                        }
                        value={this.state.description}
                      />
                    </Item>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.col}>
                    <Label>Image</Label>
                  </Col>
                  <Col style={{width: 5, marginTop: 12}}>
                    <Label>:</Label>
                  </Col>
                  <Col>
                    <Item regular style={styles.itemProduct}>
                      <Button onPress={() => this.handleChoosePhoto()}>
                        <Text>Choose Photo</Text>
                      </Button>
                    </Item>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.col}>
                    <Label>Category</Label>
                  </Col>
                  <Col style={{width: 5, marginTop: 12}}>
                    <Label>:</Label>
                  </Col>
                  <Col>
                    <Item regular style={styles.itemProduct}>
                      <Picker
                        mode="dropdown"
                        iosHeader="Select Category"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{width: undefined}}
                        selectedValue={this.state.category}
                        onValueChange={this.setSelectCategory}>
                        <Picker.Item label="Makanan" value="9" />
                        <Picker.Item label="Minuman" value="10" />
                        <Picker.Item label="Jajanan" value="11" />
                      </Picker>
                    </Item>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.col}>
                    <Label>Price</Label>
                  </Col>
                  <Col style={{width: 5, marginTop: 12}}>
                    <Label>:</Label>
                  </Col>
                  <Col>
                    <Item regular style={styles.itemProduct}>
                      <Input
                        onChangeText={Text => this.setState({price: Text})}
                        value={this.state.price}
                      />
                    </Item>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.col}>
                    <Label>Quantity</Label>
                  </Col>
                  <Col style={{width: 5, marginTop: 12}}>
                    <Label>:</Label>
                  </Col>
                  <Col>
                    <Item regular style={styles.itemProduct}>
                      <Input
                        onChangeText={Text => this.setState({qty: Text})}
                        value={this.state.qty}
                      />
                    </Item>
                  </Col>
                </Row>
              </Grid>
              <View style={styles.viewButton}>
                <Button
                  success
                  style={styles.buttons}
                  onPress={this.handleAddProduct}>
                  <Icon name="ios-paper" />
                  <Text>Save Data</Text>
                </Button>
              </View>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  col: {
    marginTop: 12,
    width: 100,
    marginLeft: 10,
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
  buttons: {
    margin: 20,
    position: 'relative',
    borderRadius: 10,
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#000',
    marginLeft: '25%',
  },
  itemProduct: {
    borderColor: '#bdc3c7',
    marginBottom: 5,
    marginRight: 5,
  },
  icons: {
    margin: 20,
  },
});

export default AddProduct;
