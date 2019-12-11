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
  Spinner,
} from 'native-base';
import {
  StyleSheet,
  ToastAndroid,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import {getMenu} from '../../Public/Redux/Actions/Menu';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../Header';
import Http from '../../Public/Utils/Http';
import ConvertRupiah from 'rupiah-format';
import {API_BASEURL} from 'react-native-dotenv';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      refresh: false,
      loadingItem: false,
      token: '',
    };
  }
  async componentDidMount() {
    await this.fetchData();
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        this.setState({token: value});
      }
    } catch (error) {
      console.log(error);
    }
  }
  async fetchData() {
    await this.props.dispatch(
      getMenu({
        search: this.state.search,
      }),
    );
    this.setState({data: this.props.data.menuList, loading: false});
  }

  handleDelete = async id => {
    this.setState({loadingItem: true});
    Http.delete(`/api/v1/product/${id}`, {
      headers: {
        authorization: this.state.token,
      },
    })
      .then(res => {
        this.setState({loadingItem: false});
        ToastAndroid.show(
          'Delete Success',
          ToastAndroid.TOP,
          ToastAndroid.SHORT,
        );
        this.props.navigation.navigate('ManageData');
      })
      .catch(err => {
        this.setState({loadingItem: false});
        alert('Delete Failed');
      });
  };
  _onRefresh = () => {
    this.setState({refresh: true});
    this.fetchData().then(() =>
      this.setState({
        refresh: false,
      }),
    );
  };

  render() {
    return (
      <Container>
        <View>
          <Header {...this.props} />
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this._onRefresh}
            />
          }>
          <Content>
            <View>
              <Text style={styles.text}>MANAGE DATA</Text>
            </View>
            <View style={styles.buttonCreate}>
              <Button
                style={{borderRadius: 5}}
                info
                small
                onPress={() => this.props.navigation.navigate('AddData')}>
                <Text>CREATE DATA</Text>
              </Button>
            </View>
            {this.state.loading === true ? (
              <Spinner color="#ff4757" />
            ) : (
              <List>
                {this.state.data.map(item => (
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
                            this.props.navigation.navigate('EditData', {
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
                    </ListItem>
                    <ListItem icon>
                      <Left>
                        <Button
                          style={{backgroundColor: 'red'}}
                          onPress={() => this.handleDelete(item.id)}>
                          {this.state.loadingItem === true ? (
                            <Spinner color="#fff" />
                          ) : (
                            <Icon active name="trash" />
                          )}
                        </Button>
                      </Left>
                    </ListItem>
                  </ListItem>
                ))}
              </List>
            )}
          </Content>
        </ScrollView>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonCreate: {
    alignItems: 'flex-start',
    marginHorizontal: 20,
  },
});
const mapStateToProps = state => {
  return {
    data: state.menuList,
  };
};

export default connect(mapStateToProps)(Index);
