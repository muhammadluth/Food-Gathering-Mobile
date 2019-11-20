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
import {StyleSheet, AsyncStorage, ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import {getMenu} from '../../Public/Redux/Actions/Menu';
import Header from '../Header';
import Http from '../../Public/Utils/Http';
import ListData from './ListData';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
    this.handleButtonEditData = this.handleButtonEditData.bind(this);
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
    Http.delete(`/api/v1/product/${id}`)
      .then(res => {
        ToastAndroid.show(
          'Delete Success',
          ToastAndroid.TOP,
          ToastAndroid.SHORT,
        );
        this.props.navigation.navigate('Home');
      })
      .catch(err => {
        ToastAndroid.show(
          'Delete Failed',
          ToastAndroid.TOP,
          ToastAndroid.SHORT,
        );
        this.props.navigation.navigate('ManageData');
      });
  };
  handleButtonEditData() {
    this.props.navigation.navigate('EditData');
  }
  render() {
    AsyncStorage.getItem('token').then(res => console.log(res));
    return (
      <Container>
        <View>
          <Header {...this.props} />
        </View>
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
          {this.state.loading ? (
            <Spinner color="red" />
          ) : (
            <ListData
              data={this.state.data}
              handleDelete={this.handleDelete}
              handleButtonEditData={this.handleButtonEditData}
            />
          )}
        </Content>
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
