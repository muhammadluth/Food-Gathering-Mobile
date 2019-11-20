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
} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {StyleSheet, Dimensions, ScrollView} from 'react-native';
import ConvertRupiah from 'rupiah-format';
import {API_BASEURL} from 'react-native-dotenv';
import Http from '../Public/Utils/Http';
import Header from './Header';

class History extends React.Component {
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
    };
    // this.getRecentOrder = this.getRecentOrder.bind(this);
  }
  componentDidMount() {
    this.getCountOrder();
    // this.getValue()
    this.getRecentOrder();
  }

  // Card
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

  // grafik
  // getRecentOrder = async event => {
  //   let data = event.target.value;
  //   await Http.get(`/api/v1/order/revenue?order=${data}`)
  //     .then(result => {
  //       this.setState({
  //         data: result.data.data,
  //         order: data,
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  // show recent order
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

  render() {
    this.state.recentOrder.map(item => {});
    // card if nul
    if (this.state.count === null) {
      this.state.count = 0;
    }

    return (
      <>
        <Container>
          <Header {...this.props} />
          <Content>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.ViewCard}>
                <Card style={styles.card}>
                  <Text style={styles.textCard}>Today's Income</Text>
                  <Text style={styles.textCard}>
                    {ConvertRupiah.convert(this.state.count)}
                  </Text>
                  <Text style={styles.textCard}>100%</Text>
                </Card>
              </View>
              <View style={styles.ViewCard}>
                <Card style={styles.card}>
                  <Text style={styles.textCard}>Orders</Text>
                  <Text style={styles.textCard}>{this.state.orders}</Text>
                  <Text style={styles.textCard}>
                    {this.state.growthOrdeWeek}%
                  </Text>
                </Card>
              </View>
              <View style={styles.ViewCard}>
                <Card style={styles.card}>
                  <Text style={styles.textCard}>This Year's Income</Text>
                  <Text style={styles.textCard}>
                    {ConvertRupiah.convert(this.state.resYearIncome)}
                  </Text>
                  <Text style={styles.textCard}>{this.state.yearCount}%</Text>
                </Card>
              </View>
            </View>
            <ScrollView>
              <View>
                <Text style={styles.text}>REVENUE</Text>
                <LineChart
                  data={{
                    labels: [
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                    ],
                    datasets: [
                      {
                        data: [
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                        ],
                      },
                    ],
                  }}
                  width={Dimensions.get('window').width} // from react-native
                  height={220}
                  yAxisLabel={'$'}
                  chartConfig={{
                    backgroundColor: '#ff4757',
                    backgroundGradientFrom: '#ff4757',
                    backgroundGradientTo: '#ff4757',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: '6',
                      strokeWidth: '2',
                      stroke: '#ffa726',
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
              </View>
              <View>
                <Text style={styles.text}>RECENT ORDER</Text>
                <View style={styles.ViewPicker}>
                  <Picker
                    mode="dropdown"
                    iosHeader="Select your SIM"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{width: undefined}}
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
                  <List style={{backgroundColor: '#ecf0f1'}}>
                    {this.state.recentOrder.map(item => {
                      return (
                        <ListItem>
                          <Row>
                            <Col style={{borderColor: '#000'}}>
                              <Text style={{fontSize: 10}}>
                                #{item.invoices}
                              </Text>
                            </Col>
                            <Col>
                              <Text style={{fontSize: 10}}>{item.user}</Text>
                            </Col>
                            <Col>
                              <Text style={{fontSize: 10}}>{item.datenow}</Text>
                            </Col>
                            <Col>
                              <Text style={{fontSize: 10}}>{item.orders}</Text>
                            </Col>
                            <Col>
                              <Text style={{fontSize: 10}}>
                                {ConvertRupiah.convert(item.amount)}
                              </Text>
                            </Col>
                          </Row>
                        </ListItem>
                      );
                    })}
                  </List>
                </View>
              </View>
            </ScrollView>
          </Content>
        </Container>
      </>
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
    textDecorationLine: 'underline',
  },
  icons: {
    margin: 20,
  },
  ViewCard: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    height: 60,
    width: 120,
  },
  card: {
    borderRadius: 10,
    backgroundColor: '#ff4757',
  },
  textCard: {
    marginTop: 1,
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '100',
    color: '#fff',
  },
  ViewPicker: {
    position: 'absolute',
    width: 100,
    right: 0,
    top: 7,
  },
  TextList: {
    fontSize: 13,
    color: '#fff',
  },
});

export default History;