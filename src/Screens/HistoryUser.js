import React, {Component} from 'react';
import {
  StyleSheet,
  AsyncStorage,
  ScrollView,
  RefreshControl,
} from 'react-native';
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
  Row,
  Col,
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
      refresh: false,
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
  _onRefresh = () => {
    this.setState({refresh: true});
    this.getRecentOrder().then(() =>
      this.setState({
        refresh: false,
      }),
    );
  };

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
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this._onRefresh}
            />
          }>
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
              <View style={{position: 'absolute', top: 60, left: 20}}>
                <Text>{this.state.user}</Text>
              </View>
              <View style={{marginTop: 10}}>
                <List style={{backgroundColor: '#ff4757'}}>
                  <ListItem>
                    <Row>
                      <Col>
                        <Text style={styles.TextList}>INVOICES</Text>
                      </Col>
                      <Col>
                        <Text style={styles.TextList}>DATE</Text>
                      </Col>
                      <Col>
                        <Text style={styles.TextList}>ORDERS</Text>
                      </Col>
                      <Col>
                        <Text style={styles.TextList}>AMOUNT</Text>
                      </Col>
                    </Row>
                  </ListItem>
                </List>
                {this.state.loading === true ? (
                  <Spinner color="#ff4757" />
                ) : (
                  <List style={{backgroundColor: '#ecf0f1'}}>
                    {this.state.recentOrder
                      .filter(item => item.user === this.state.user)
                      .map(item => {
                        return (
                          <ListItem>
                            <Row>
                              <Col style={{borderColor: '#000'}}>
                                <Text style={{fontSize: 12}}>
                                  #{item.invoices}
                                </Text>
                              </Col>
                              <Col>
                                <Text style={{fontSize: 12}}>
                                  {item.datenow}
                                </Text>
                              </Col>
                              <Col>
                                <Text style={{fontSize: 12}}>
                                  {item.orders}
                                </Text>
                              </Col>
                              <Col>
                                <Text style={{fontSize: 12}}>
                                  {ConvertRupiah.convert(item.amount)}
                                </Text>
                              </Col>
                            </Row>
                          </ListItem>
                        );
                      })}
                  </List>
                )}
              </View>
            </List>
          </Content>
        </ScrollView>
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
  TextList: {
    fontSize: 13,
    color: '#fff',
  },
});
