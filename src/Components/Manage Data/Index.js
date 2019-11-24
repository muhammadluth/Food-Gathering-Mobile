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
import {
  StyleSheet,
  AsyncStorage,
  ToastAndroid,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import {getMenu} from '../../Public/Redux/Actions/Menu';
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
    };
  }
  componentDidMount() {
    this.fetchData();
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
    Http.delete(`/api/v1/product/${id}`)
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
    AsyncStorage.getItem('token').then(res => console.log(res));
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
            <ListItem icon>
              <Left>
                <Button
                  style={{backgroundColor: '#007AFF'}}
                  onPress={() => this.props.navigation.navigate('AddData')}>
                  <Icon active name="add" />
                </Button>
              </Left>
              <Body>
                <Text>Add Data</Text>
              </Body>
            </ListItem>
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
const mapStateToProps = state => {
  return {
    data: state.menuList,
  };
};

export default connect(mapStateToProps)(Index);
