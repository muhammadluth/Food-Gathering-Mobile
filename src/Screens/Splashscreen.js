import React, {Component} from 'react';
import {View, Container, Card} from 'native-base';
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
export default class Splashscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: null,
    };
  }
  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        this.setState({token: value});
        console.log(value);
      }
      console.log(value);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      if (this.state.token === null) {
        this.props.navigation.navigate('Login');
      }
    }, 2000);
  }
  render() {
    console.log(this.state.token);
    return (
      <Container>
        {this.state.token !== null ? (
          this.props.navigation.navigate('Index')
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
    marginTop: -40,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  CardLogo: {
    height: 130,
    borderRadius: 10,
    marginTop: -50,
  },
});
