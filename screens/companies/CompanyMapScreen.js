import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import MapView from 'react-native-maps';

const { width } = Dimensions.get('screen');

export default class CompanyMap extends React.Component {

  render() {
    return (
      <MapView style={{flex: 1}} showsUserLocation={true} region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
});
