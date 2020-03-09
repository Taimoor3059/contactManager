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
    navigation.addListener("willFocus", () => {
      var key = this.props.navigation.getParam("key", "");
      this.getContact(key);
    })
  }

  callAction = phone => {
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telpromt:${phone}`
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phone)
      .then( supported => {
        if (!supported) {
          Alert.alert("phone number is not available")
        } else {
          return Linking.openURL(phone)
        }
      } )
      .catch(error => {
        console.log(error)
      })
  };

  getContact = async key => {
    await AsyncStorage.getItem(key)
      .then(contactjsonString => {
        var contact = JSON.parse(contactjsonString);
        contact[key] = key;
        this.setState({contact: contact})
      })
      .catch(error => {
        console.log(error)
      })
  }

  smsAction = (phone) => {
    let phoneNumber = phone;
    phoneNumber = `sms: ${phone}` 
    Linking.canOpenURL(phone)
      .then( supported => {
        if (!supported) {
          Alert.alert("phone number is not available")
        } else {
          return Linking.openURL(phone)
        }
      } )
      .catch(error => {
        console.log(error)
      })
  }

  editContact = (key) => {
    this.props.navigation.navigate("Edit", {key:key});
  };
  
  render() {
    return (
      <ScrollView style={styles.container}>

        <View style={styles.contactIconContainer}>
          <Text style={styles.contactIcon}>
            {this.state.firstName[0].toUpperCase()}
          </Text>
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {this.state.firstName} {this.state.lastName}
          </Text>
        </View>

        <View>
          <Card>

            <CardItem bordered>
              <Text>Phone</Text>
            </CardItem>

            <CardItem bordered>
              <Text>{this.state.phone}</Text>
            </CardItem>
            
          </Card>
        </View>




      </ScrollView>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contactIconContainer: {
    height: 200,
    backgroundColor: "#B83227",
    alignItems: "center",
    justifyContent: "center"
  },
  contactIcon: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#fff"
  },
  nameContainer: {
    width: "100%",
    height: 70,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  },
  name: {
    fontSize: 24,
    color: "#000",
    fontWeight: "900"
  },
  infoText: {
    fontSize: 18,
    fontWeight: "300"
  },
  actionContainer: {
    flexDirection: "row"
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  actionText: {
    color: "#B83227",
    fontWeight: "900"
  }
});
