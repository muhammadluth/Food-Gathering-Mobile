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
  Icon,
  View,
  Picker,
  Item,
  Spinner,
  Card,
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import Header from '../Header';
import Http from '../../Public/Utils/Http';
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
      loading: false,
      isUpload: false,
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
        this.setState({image: response, isUpload: true});
      }
    });
  };
  handleAddProduct = async () => {
    this.setState({loading: true});
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
    await Http.post(`/api/v1/product/`, pd)
      .then(res => {
        this.setState({loading: false});
        if (res.data.status === 200) {
          ToastAndroid.show(
            'Success Add Data',
            ToastAndroid.TOP,
            ToastAndroid.SHORT,
          );
          this.props.navigation.navigate('ManageData');
        } else {
          alert('Product Already Exist');
        }
      })
      .catch(err => {
        this.setState({loading: false});
        console.log(err);
        alert('Connection Timeout');
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
            <Text style={styles.text}>Add Product</Text>
          </View>
          <View>
            <Form>
              <View style={styles.viewForm}>
                <Card style={styles.cardForm}>
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
                  <View>
                    <Item stackedLabel>
                      <Label>Product</Label>
                      <Input
                        onChangeText={Text => this.setState({name: Text})}
                        value={this.state.name}
                      />
                    </Item>
                  </View>
                  <View>
                    <Item stackedLabel>
                      <Label>Description</Label>
                      <Textarea
                        rowSpan={3}
                        onChangeText={Text =>
                          this.setState({description: Text})
                        }
                        value={this.state.description}
                      />
                    </Item>
                  </View>
                  <View>
                    <Item stackedLabel style={{alignItems: 'flex-start'}}>
                      <Label>Category</Label>
                      <Picker
                        mode="dropdown"
                        iosHeader="Select Category"
                        iosIcon={<Icon name="arrow-down" />}
                        style={styles.piceker}
                        selectedValue={this.state.category}
                        onValueChange={this.setSelectCategory}>
                        <Picker.Item label="Makanan" value="9" />
                        <Picker.Item label="Minuman" value="10" />
                        <Picker.Item label="Jajanan" value="11" />
                      </Picker>
                    </Item>
                  </View>
                  <View>
                    <Item stackedLabel>
                      <Label>Price</Label>
                      <Input
                        onChangeText={Text => this.setState({price: Text})}
                        value={this.state.price}
                      />
                    </Item>
                  </View>
                  <View>
                    <Item stackedLabel>
                      <Label>Quantity</Label>
                      <Input
                        onChangeText={Text => this.setState({qty: Text})}
                        value={this.state.qty}
                      />
                    </Item>
                  </View>
                  <View style={styles.viewButton}>
                    <Button
                      style={styles.buttons}
                      onPress={this.handleAddProduct}>
                      {this.state.loading === true ? (
                        <Spinner color="#fff" style={{width: '100%'}} />
                      ) : (
                        <Text>Save Data</Text>
                      )}
                    </Button>
                  </View>
                </Card>
              </View>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  piceker: {
    width: 150,
    marginLeft: -7,
  },
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
  cardForm: {
    padding: 30,
    borderRadius: 10,
  },
  buttonChosePhoto: {
    borderColor: '#ff4757',
    width: 65,
    height: 65,
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default AddProduct;
