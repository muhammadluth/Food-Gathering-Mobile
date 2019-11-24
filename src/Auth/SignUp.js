import React, {Component} from 'react';
import {StyleSheet, Image, ToastAndroid} from 'react-native';
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
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      loading: false,
    };
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  handleSignUp() {
    const usernames = this.state.username;
    const emails = this.state.email;
    const passwords = this.state.password;
    this.setState({loading: true});

    Http.post(`/api/v1/users/register`, {
      username: usernames,
      email: emails,
      password: passwords,
    })
      .then(res => {
        this.setState({loading: false});
        console.log(res);
        ToastAndroid.show(
          'Registations Success',
          ToastAndroid.TOP,
          ToastAndroid.SHORT,
        );
        this.props.navigation.navigate('Login');
      })
      .catch(err => {
        this.setState({loading: false});
        console.log(err);
        alert('Registration Failed, Because Duplicate Email');
      });
  }
  render() {
    console.log(this.state);
    return (
      <Container>
        <LinearGradient
          colors={['#ff4757', '#ff6b81', '#dfe4ea']}
          style={styles.linearGradient}>
          <Content>
            <View style={styles.ViewLogo}>
              <Image
                style={styles.logo}
                source={require('../Assets/Images/FOOD_GATHERING.png')}
              />
            </View>
            <View style={styles.Card}>
              <Card style={{borderRadius: 20}}>
                <View>
                  <Title style={styles.ViewTitle}>Sign Up</Title>
                </View>
                <Form>
                  <View style={styles.ViewForm}>
                    <Item floatingLabel style={styles.Items}>
                      <Label>Username</Label>
                      <Input
                        onChangeText={Text => this.setState({username: Text})}
                        value={this.state.username}
                        placeholder="example123"
                        keyboardType="web-search"
                        autoCapitalize="none"
                      />
                    </Item>
                    <Item floatingLabel style={styles.Items}>
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
                        style={{borderRadius: 10, backgroundColor: '#ff4757'}}
                        onPress={() => this.handleSignUp()}>
                        {this.state.loading === true ? (
                          <Spinner color="#fff" style={{width: '100%'}} />
                        ) : (
                          <Text>Sign Up</Text>
                        )}
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
    marginTop: 5,
  },
  Card: {
    elevation: 0,
    margin: 10,
    borderRadius: 20,
  },
  ViewButton: {
    flexDirection: 'row',
  },
  linearGradient: {
    flex: 1,
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
    paddingTop: 40,
    marginBottom: -50,
  },
  logo: {
    width: 200,
    height: 200,
  },
});
