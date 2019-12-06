import React, {Component} from 'react';
import {View, Container, Card} from 'native-base';
import {ImageBackground, StyleSheet, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
export default class Splashscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
    };
  }
  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        this.setState({token: value});
      }
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      if (this.state.token === null) {
        this.props.navigation.replace('Login');
      }
    }, 2000);
  }
  render() {
    return (
      <Container>
        {this.state.token !== null ? (
          this.props.navigation.replace('Index')
        ) : (
          <LinearGradient
            colors={['#ff4757', '#ff6b81', '#dfe4ea']}
            style={styles.linearGradient}>
            <View style={styles.content}>
              <Card style={styles.CardLogo}>
                <ImageBackground
                  source={require('../Assets/Images/FOOD_GATHERING.png')}
                  style={styles.Logo}
                />
              </Card>
            </View>
          </LinearGradient>
        )}
      </Container>
    );
  }
}
const HEIGHT_DEVICE = Dimensions.get('window').height;
const WIDTH_DEVICE = Dimensions.get('window').width;
const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  Logo: {
    width: 200,
    height: 200,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
    height: '100%',
  },
  CardLogo: {
    height: 130,
    borderRadius: 10,
    justifyContent: 'center',
  },
});
