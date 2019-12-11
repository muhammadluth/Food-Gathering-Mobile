import React, {Component} from 'react';
import {StyleSheet, Image, ToastAndroid, Dimensions} from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Card,
  View,
  Title,
  Button,
  Text,
  Spinner,
} from 'native-base';
import Http from '../Public/Utils/Http';
import PasswordInputText from 'react-native-hide-show-password-input';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
const HEIGHT_DEVICE = Dimensions.get('window').height;
const WIDTH_DEVICE = Dimensions.get('window').width;
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showToast: false,
      loading: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    const emails = this.state.email;
    const passwords = this.state.password;
    this.setState({loading: true});

    Http.post(`/api/v1/users/login`, {
      email: emails,
      password: passwords,
    })
      .then(res => {
        this.setState({loading: false});
        if (res.data.success === 200) {
          AsyncStorage.setItem('user', `${res.data.username}`);
          AsyncStorage.setItem('token', `Bearer: ${res.data.token}`);
          AsyncStorage.setItem('email', `${res.data.email}`);
          ToastAndroid.show(
            'Login Success',
            ToastAndroid.TOP,
            ToastAndroid.SHORT,
          );
          this.props.navigation.navigate('Index');
        } else {
          alert('Email or Password incorect');
        }
      })
      .catch(err => {
        this.setState({loading: false});
        console.log(err);
        alert('Your Connections Failed');
      });
  }
  render() {
    return (
      <Container>
        <LinearGradient
          colors={['#ff4757', '#ff6b81', '#dfe4ea']}
          style={styles.linearGradient}>
          <Content>
            <View style={styles.Card}>
              <View style={styles.ViewLogo}>
                <Image
                  style={styles.logo}
                  source={require('../Assets/Images/FoodGathering.png')}
                />
              </View>
              <Card style={styles.cardLogin}>
                <View>
                  <Title style={styles.ViewTitle}>Login</Title>
                </View>
                <Form>
                  <View style={styles.ViewForm}>
                    <Item floatingLabel>
                      <Label>Email</Label>
                      <Input
                        onChangeText={Text => this.setState({email: Text})}
                        value={this.state.email}
                        placeholder="example@gmail.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </Item>
                    <PasswordInputText
                      onChangeText={Text => this.setState({password: Text})}
                      value={this.state.password}
                    />
                  </View>
                  <View style={styles.ViewButton}>
                    <View style={styles.Button}>
                      <Button
                        style={styles.buttonLogin}
                        onPress={() => this.handleLogin()}>
                        {this.state.loading === true ? (
                          <Spinner color="#fff" style={{width: '100%'}} />
                        ) : (
                          <Text>Login</Text>
                        )}
                      </Button>
                    </View>
                    <View style={styles.Button}>
                      <Button
                        bordered
                        style={styles.buttonSignUp}
                        onPress={() =>
                          this.props.navigation.navigate('SignUp')
                        }>
                        <Text style={{color: '#ff4757'}}>Sign Up</Text>
                      </Button>
                    </View>
                  </View>
                </Form>
              </Card>
            </View>
          </Content>
        </LinearGradient>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  Items: {
    marginBottom: 5,
    marginTop: 5,
  },
  Card: {
    borderRadius: 20,
    marginHorizontal: 10,
  },
  ViewButton: {
    flexDirection: 'row',
  },
  Input: {
    borderColor: '#000',
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    borderTopRightRadius: 300,
    borderBottomLeftRadius: 300,
  },
  Button: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  ViewTitle: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 28,
    paddingBottom: 20,
    paddingTop: 20,
  },
  ViewForm: {
    marginLeft: 20,
    marginRight: 20,
  },
  ViewLogo: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  cardLogin: {
    borderRadius: 20,
  },
  buttonLogin: {
    borderRadius: 10,
    backgroundColor: '#ff4757',
  },
  buttonSignUp: {
    borderRadius: 10,
    borderColor: '#ff4757',
  },
});
