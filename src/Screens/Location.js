import React, {Component} from 'react';
import {Container, View, Text, Picker, Icon} from 'native-base';
import {StyleSheet, AsyncStorage, TouchableOpacity} from 'react-native';
import MapView, {Polyline, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

class Maps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      user: '',
      email: '',
    };
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('user');
      const email = await AsyncStorage.getItem('email');
      if (value !== null) {
        this.setState({user: value, email: email});
        console.log(value);
      }
      console.log(value);
    } catch (error) {
      console.log(error);
    }
    Geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => this.setState({error: error.message}),
    );
    return () => Geolocation.clearWatch(watchId);
  }

  render() {
    var ZoomIn;
    return (
      <Container>
        <MapView
          ref={ref => (ZoomIn = ref)}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: this.state.latitude || -6.17476,
            longitude: this.state.longitude || 106.827072,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}>
          <Marker
            description="Jl. Tebet Utara III B No.10, RT.6/RW.8, Tebet Tim., Kec. Tebet, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12820"
            coordinate={{
              latitude: -6.226396,
              longitude: 106.854257,
            }}
            title="Food Gathering"
            onPress={() => {
              ZoomIn.fitToCoordinates(
                [{latitude: -6.226396, longitude: 106.854257}],
                {
                  animated: true,
                },
              );
            }}
          />
          {this.state.latitude !== null && this.state.longitude !== null ? (
            <Marker
              description="Your Location"
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              }}
              title={this.state.user}
              onPress={() => {
                ZoomIn.fitToCoordinates(
                  [
                    {
                      latitude: this.state.latitude,
                      longitude: this.state.longitude,
                    },
                  ],
                  {
                    animated: true,
                  },
                );
              }}
            />
          ) : (
            <Marker
              description="Your Location"
              coordinate={{
                latitude: -6.17476,
                longitude: 106.827072,
              }}
              title={this.state.user}
              onPress={() => {
                ZoomIn.fitToCoordinates(
                  [
                    {
                      latitude: -6.17476,
                      longitude: 106.827072,
                    },
                  ],
                  {
                    animated: true,
                  },
                );
              }}
            />
          )}
        </MapView>
        <View style={styles.ViewButton}>
          {this.state.latitude === null && this.state.longitude === null ? (
            <TouchableOpacity
              onPress={alert('Please,Check Your Connection')}
              style={{
                alignItems: 'center',
                paddingVertical: 10,
                borderRadius: 20,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  type="Ionicons"
                  name="ios-contact"
                  style={{paddingHorizontal: 5}}
                />
                <Text style={{paddingVertical: 5}}>{this.state.user}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                ZoomIn.fitToCoordinates(
                  [
                    {
                      latitude: this.state.latitude,
                      longitude: this.state.longitude,
                    },
                  ],
                  {
                    animated: true,
                  },
                );
              }}
              style={{
                alignItems: 'center',
                paddingVertical: 10,
                borderRadius: 20,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  type="Ionicons"
                  name="ios-contact"
                  style={{paddingHorizontal: 5}}
                />
                <Text style={{paddingVertical: 5}}>{this.state.user}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  ViewButton: {
    backgroundColor: '#fff',
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
  },
});

export default Maps;
