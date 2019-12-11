import React, {Component} from 'react';
import {StyleSheet, ToastAndroid} from 'react-native';
import {
  Container,
  Content,
  Input,
  Text,
  Form,
  Label,
  Textarea,
  Button,
  Title,
  Icon,
  Body,
  View,
  Item,
  Picker,
  Card,
  Spinner,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import Header from '../Header';
import Http from '../../Public/Utils/Http';
class EditProduct extends Component {
  constructor(props) {
    super();
    this.state = {
      id: '',
      product: '',
      description: '',
      image: '',
      category: '',
      price: '',
      qty: '',
      token: '',
      allPage: [],
      isUpload: false,
      loading: false,
    };
  }
  async componentDidMount() {
    this.setState({id: this.props.navigation.getParam('id')});
    this.setState({product: this.props.navigation.getParam('product')});
    this.setState({description: this.props.navigation.getParam('description')});
    this.setState({image: this.props.navigation.getParam('image')});
    this.setState({category: this.props.navigation.getParam('category')});
    this.setState({price: this.props.navigation.getParam('price')});
    this.setState({qty: this.props.navigation.getParam('qty')});
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        this.setState({token: value});
      }
    } catch (error) {
      console.log(error);
    }
  }

  onChangeTextProduct = product => this.setState({product});
  onChangeTextDescription = description => this.setState({description});
  onChangeTextImage = image => this.setState({image});
  onChangeTextPrice = price => this.setState({price});
  onChangeTextQty = qty => this.setState({qty});

  setSelectCategory = async value => {
    await this.setState({category: value});
  };
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({image: response, isUpload: true});
      }
    });
  };
  handleEditProduct = async () => {
    const {product, description, image, category, price, qty} = {
      ...this.state,
    };
    const id = this.props.navigation.getParam('id');
    this.setState({loading: true});

    const pd = new FormData();
    pd.append('name', product);
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
    await Http.put(`/api/v1/product/${id}`, pd, {
      headers: {
        authorization: this.state.token,
      },
    })
      .then(result => {
        this.setState({loading: false});
        ToastAndroid.show(
          'Success Edit Data',
          ToastAndroid.TOP,
          ToastAndroid.SHORT,
        );
        this.props.navigation.navigate('ManageData');
      })
      .catch(err => {
        this.setState({loading: false});
        console.log(err);
        alert('Failed Edit Data');
      });
  };
  render() {
    return (
      <Container>
        <View>
          <Header {...this.props} />
        </View>
        <Content>
          <View>
            <Text style={styles.text}>Edit Product</Text>
          </View>
          <View>
            <Form>
              <View style={styles.viewForm}>
                <View style={{alignItems: 'center'}}>
                  {this.state.isUpload === true ? (
                    <Button
                      bordered
                      disabled
                      style={styles.buttonChosePhoto}
                      onPress={() => this.handleChoosePhoto()}>
                      <Icon
                        type="Ionicons"
                        name="checkmark-circle-outline"
                        style={{color: '#000'}}
                      />
                    </Button>
                  ) : (
                    <Button
                      bordered
                      style={styles.buttonChosePhoto}
                      onPress={() => this.handleChoosePhoto()}>
                      <Icon type="Ionicons" name="add" />
                    </Button>
                  )}
                </View>
                <View style={styles.form}>
                  <Item regular style={styles.item}>
                    <Input
                      onChangeText={this.onChangeTextProduct}
                      value={this.state.product}
                      keyboardType="default"
                      autoCapitalize="none"
                    />
                  </Item>
                  <Item regular style={styles.item}>
                    <Textarea
                      rowSpan={3}
                      onChangeText={this.onChangeTextDescription}
                      value={this.state.description}
                      keyboardType="default"
                      autoCapitalize="none"
                    />
                  </Item>
                  <Item regular style={styles.item}>
                    <Picker
                      mode="dropdown"
                      iosHeader="Select Category"
                      iosIcon={<Icon name="arrow-down" />}
                      selectedValue={this.state.category}
                      onValueChange={this.setSelectCategory}>
                      <Picker.Item label="Makanan" value="9" />
                      <Picker.Item label="Minuman" value="10" />
                      <Picker.Item label="Jajanan" value="11" />
                    </Picker>
                  </Item>
                  <Item regular style={styles.item}>
                    <Input
                      onChangeText={this.onChangeTextPrice}
                      value={this.state.price}
                      keyboardType="default"
                      autoCapitalize="none"
                    />
                  </Item>
                  <Item regular style={styles.item}>
                    <Input
                      onChangeText={this.onChangeTextQty}
                      value={this.state.qty}
                      keyboardType="default"
                      autoCapitalize="none"
                    />
                  </Item>
                </View>
                <View style={styles.viewButton}>
                  <Button
                    style={styles.buttons}
                    onPress={() => this.handleEditProduct()}>
                    {this.state.loading === true ? (
                      <Spinner color="#fff" style={{width: '100%'}} />
                    ) : (
                      <Text>Save Data</Text>
                    )}
                  </Button>
                </View>
              </View>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  buttons: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#ff4757',
  },
  viewButton: {
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewForm: {
    margin: 20,
  },
  form: {
    paddingTop: 25,
  },
  item: {
    marginVertical: 5,
    borderRadius: 5,
    borderColor: '#bdc3c7',
    marginLeft: 10,
    marginRight: 10,
  },
  buttonChosePhoto: {
    borderColor: '#ff4757',
    width: 65,
    height: 65,
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default EditProduct;
