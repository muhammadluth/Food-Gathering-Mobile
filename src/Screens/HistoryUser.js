import React, {Component} from 'react';
import {StyleSheet, AsyncStorage} from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Picker,
  Icon,
  View,
  Spinner,
} from 'native-base';
import Header from '../Components/Header';
import Http from '../Public/Utils/Http';
import ConvertRupiah from 'rupiah-format';

export default class HistoryUser extends Component {
  constructor(props) {
    super();
    this.state = {
      recentOrder: [],
      data: '',
      loading: true,
      user: '',
    };
  }

  async componentDidMount() {
    await this.getRecentOrder();
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        this.setState({user: value});
        console.log(value);
      }
      console.log(value);
    } catch (error) {
      console.log(error);
    }
  }

  // show recent order
  getRecentOrder = async value => {
    let data = value;
    await Http.get(`/api/v1/order/recent?order=${data}`)
      .then(result => {
        this.setState({
          recentOrder: result.data.data,
          data: value,
          loading: false,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    console.log(this.state.data);
    return (
      <Container>
        <Header {...this.props} />
        <Content>
          <List>
            <ListItem itemHeader first>
              <View>
                <Text style={styles.TextTitle}>Update Pesanan</Text>
              </View>
              <View style={styles.ViewPicker}>
                <Picker
                  mode="dropdown"
                  iosHeader="Select your SIM"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{width: undefined}}
                  selectedValue={this.state.data}
                  onValueChange={this.getRecentOrder.bind(this)}>
                  <Picker.Item label="Day" value="day" />
                  <Picker.Item label="Month" value="month" />
                  <Picker.Item label="Year" value="year" />
                </Picker>
              </View>
            </ListItem>
            {this.state.recentOrder
              .filter(item => item.user === this.state.user)
              .map(item => (
                <ListItem>
                  {this.state.loading ? (
                    <Spinner />
                  ) : (
                    <View>
                      <View style={styles.TextDate}>
                        <Text>#{item.invoices}</Text>
                        <Text style={styles.TextTitikDua}>:</Text>
                        <Text>{item.datenow} </Text>
                      </View>
                      <View style={styles.TextProduct}>
                        <Text>{item.orders}</Text>
                        <Text style={styles.TextTotal}>
                          Total : {ConvertRupiah.convert(item.amount)}
                        </Text>
                      </View>
                    </View>
                  )}
                </ListItem>
              ))}
          </List>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  TextTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 5,
  },
  ViewPicker: {
    position: 'absolute',
    width: 120,
    right: 0,
    top: 6,
  },
  TextProduct: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  TextDate: {
    flexDirection: 'row',
  },
  TextTitikDua: {
    paddingHorizontal: 10,
  },
  TextTotal: {
    marginVertical: 10,
  },
});
