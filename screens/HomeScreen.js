import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import { Card } from "native-base";
//import { Entypo } from " @expo/vector-icons";
//import { getSupportedVideoFormats } from 'expo/build/AR';

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to HomeScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


