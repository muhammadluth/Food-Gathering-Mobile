import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Header, Button} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Headers extends Component {
  render() {
    return (
      <Header style={styles.header}>
        <View style={styles.viewIcon}>
          <Button transparent style={{width: 30}}>
            <Icon
              size={25}
              name="ios-arrow-back"
              onPress={() => this.props.navigation.goBack()}
            />
          </Button>
        </View>
        <View>
          <Text style={styles.title}>FOOD GATHERING</Text>
        </View>
      </Header>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginTop: 12,
    fontFamily: 'GothamRounded-Bold',
    fontWeight: 'bold',
    color: '#ff4757',
  },

  viewIcon: {
    position: 'absolute',
    left: 0,
    marginTop: 7,
    marginLeft: 25,
  },
});
