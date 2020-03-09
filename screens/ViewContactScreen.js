import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, Platform, Alert, AsyncStorage } from 'react-native';
import { Card, CardItem } from "native-base";
import { Entypo } from "@expo/vector-icons"

export default class ViewContactScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "DummyText",
      lastName: "DummyText",
      phoneNumber: "DummyText",
      email: "DummyText",
      address: "DummyText",
      key:"DummyText"
    }
  }

  static navigationOptions = {
    title: "View Contact"
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("WillFocus", () => {
      var key = this.props.navigation.getParam("key", "");
    })
  }

  getContact = async key => {
    await AsyncStorage.getItem(key)
  }
  






  render() {
    return (
      <View style={styles.container}>
        <Text>ViewContactScreen</Text>
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
