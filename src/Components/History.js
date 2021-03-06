import React, {Component} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {
  View,
  Text,
  Container,
  Icon,
  Content,
  Card,
  List,
  ListItem,
  Picker,
  Row,
  Col,
} from 'native-base';
import {StyleSheet, ScrollView, RefreshControl} from 'react-native';
import ConvertRupiah from 'rupiah-format';
import Http from '../Public/Utils/Http';
import Header from './Header';

export default class History extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      order: [],
      count: 0,
      orders: 0,
      growth: 0,
      resYearIncome: 0,
      recentOrder: [],
      growthOrdeWeek: 0,
      yearCount: 0,
      detalProduct: [],
      recentdata: '',
      refresh: false,
    };
  }
  componentDidMount() {
    this.getCountOrder();
    this.getRecentOrder();
  }

  getCountOrder = async () => {
    await await Http.get(`/api/v1/order/allorder`)
      .then(result => {
        let growthCount =
          ((result.data.data[0].daynow - result.data.data[0].yesterday) /
            result.data.data[0].yesterday) *
          100;
        let gowCount =
          ((result.data.data[0].weeknow - result.data.data[0].lastweek) /
            result.data.data[0].lastweek) *
          100;
        let yearCount =
          ((result.data.data[0].yearnow - result.data.data[0].yearlast) /
            result.data.data[0].yearlast) *
          100;
        this.setState({
          count: result.data.data[0].daynow,
          orders: result.data.data[0].dayordernnow,
          resYearIncome: result.data.data[0].yearnow,
          growth: growthCount.toFixed(1),
          growthOrdeWeek: gowCount.toFixed(1),
          yearCount: yearCount.toFixed(1),
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  getRecentOrder = async value => {
    let data = value;
    await Http.get(`/api/v1/order/recent?order=${data}`)
      .then(result => {
        this.setState({
          recentOrder: result.data.data,
          recentdata: value,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  _onRefresh = () => {
    this.setState({refresh: true});
    this.getRecentOrder().then(() =>
      this.setState({
        refresh: false,
      }),
    );
    this.getCountOrder().then(() =>
      this.setState({
        refresh: false,
      }),
    );
  };

  render() {
    this.state.recentOrder.map(item => {});
    if (this.state.count === null) {
      this.state.count = 0;
    }

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
            <View style={styles.viewAll}>
              <Text style={styles.text}>ALL ORDER</Text>

              <View style={styles.viewAllOrder}>
                <View style={styles.ViewCard}>
                  <Card style={styles.card}>
                    <Text style={styles.textCard}>Today's Income</Text>
                    <Text style={styles.textCard}>
                      {ConvertRupiah.convert(this.state.count)}
                    </Text>
                    <Text style={styles.textCard}>
                      {this.state.growth}% Yesterday
                    </Text>
                  </Card>
                </View>
                <View style={styles.ViewCard}>
                  <Card style={styles.card}>
                    <Text style={styles.textCard}>Orders</Text>
                    <Text style={styles.textCard}>{this.state.orders}</Text>
                    <Text style={styles.textCard}>
                      {this.state.growthOrdeWeek}% Last Week
                    </Text>
                  </Card>
                </View>
                <View style={styles.ViewCard}>
                  <Card style={styles.card}>
                    <Text style={styles.textCard}>This Year's Income</Text>
                    <Text style={styles.textCard}>
                      {ConvertRupiah.convert(this.state.resYearIncome)}
                    </Text>
                    <Text style={styles.textCard}>
                      {this.state.yearCount}% Last Year
                    </Text>
                  </Card>
                </View>
              </View>
            </View>
            <ScrollView>
              <View style={styles.ViewRecent}>
                <Text style={styles.text}>RECENT ORDER</Text>
                <View style={styles.ViewPicker}>
                  <Picker
                    mode="dropdown"
                    iosHeader="Select your SIM"
                    iosIcon={<Icon name="arrow-down" />}
                    selectedValue={this.state.recentdata}
                    onValueChange={this.getRecentOrder.bind(this)}>
                    <Picker.Item label="Day" value="day" />
                    <Picker.Item label="Month" value="month" />
                    <Picker.Item label="Year" value="year" />
                  </Picker>
                </View>
                <View style={{marginVertical: 20}}>
                  <List style={{backgroundColor: '#ff4757'}}>
                    <ListItem>
                      <Row>
                        <Col>
                          <Text style={styles.TextList}>INVOICES</Text>
                        </Col>
                        <Col>
                          <Text style={styles.TextList}>USER</Text>
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
                  <ScrollView>
                    <List style={{backgroundColor: '#ecf0f1'}}>
                      {this.state.recentOrder.map(item => {
                        console.log(this.state.recentOrder);
                        return (
                          <ListItem>
                            <Row>
                              <Col style={{borderColor: '#000'}}>
                                <Text style={styles.textRow}>
                                  #{item.invoices}
                                </Text>
                              </Col>
                              <Col>
                                <Text style={styles.textRow}>{item.user}</Text>
                              </Col>
                              <Col>
                                <Text style={styles.textRow}>
                                  {item.datenow}
                                </Text>
                              </Col>
                              <Col>
                                <Text style={styles.textRow}>
                                  {item.orders}
                                </Text>
                              </Col>
                              <Col>
                                <Text style={styles.textRow}>
                                  {ConvertRupiah.convert(item.amount)}
                                </Text>
                              </Col>
                            </Row>
                          </ListItem>
                        );
                      })}
                    </List>
                  </ScrollView>
                </View>
              </View>
            </ScrollView>
          </Content>
        </ScrollView>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  viewAll: {
    marginTop: 10,
  },
  ViewCard: {
    flex: 1,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    height: 70,
  },
  card: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#ff4757',
  },
  textCard: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '100',
    color: '#fff',
  },
  ViewPicker: {
    position: 'absolute',
    width: 120,
    right: 0,
    top: 7,
  },
  TextList: {
    fontSize: 13,
    color: '#fff',
  },
  textRow: {
    fontSize: 10,
  },
  ViewRecent: {
    marginTop: 20,
  },
  viewAllOrder: {
    flexDirection: 'row',
  },
});
