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

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener("focus", () => {
      console.log('entered navigation.listener');
      let keys = this.props.route.params.key;
      //console.log(keys)
      this.getContact(keys);
    })  
  }

  callAction = phone => {
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telpromt:${phone}`
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then( supported => {
        if (!supported) {
          Alert.alert("phone number is not available")
        } else {
          return Linking.openURL(phoneNumber)
        }
      } )
      .catch(error => {
        console.log(error)
      })
  };

  getContact = async keys => {
    //console.log('helloItem');
    await AsyncStorage.getItem(keys)
      .then(contactjsonString => {
        var contact = JSON.parse(contactjsonString)
        contact[keys] = keys;
        this.setState(contact)
        console.log('new')
        console.log(this.state.contact)
      })
      .catch(error => {
        console.log(error)
      })  
  }
  
  smsAction = (phone) => {
    let phoneNumber = phone;
    phoneNumber = `sms: ${phone}` 
    Linking.canOpenURL(phoneNumber)
      .then( supported => {
        if (!supported) {
          Alert.alert("phone number is not available")
        } else {
          return Linking.openURL(phoneNumber);
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
          <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {this.state.firstName} {this.state.lastName}
          </Text>
        </View>
        </View>

        

        <View style={styles.infoContainer}>
          <Card>

            <CardItem bordered>
              <Text style={styles.infoText}>Phone</Text>
            </CardItem>

            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.phoneNumber}</Text>
            </CardItem>

          </Card>

          <Card>

            <CardItem bordered>
              <Text style={styles.infoText}>Email</Text>
            </CardItem>

            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.email}</Text>
            </CardItem>

          </Card>

          <Card>

            <CardItem bordered>
              <Text style={styles.infoText}>Address</Text>
            </CardItem>

            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.address}</Text>
            </CardItem>

          </Card>

        </View>

        <Card style={styles.actionContainer}>
          <CardItem style={styles.actionButton} bordered>
            <TouchableOpacity
            onPress ={ () => {
              this.callAction(this.state.phoneNumber)
            }} 
            >
              <Entypo
              name="phone"
              size={50}
              color="#B83227"
              />
            </TouchableOpacity>
            <Text style={styles.actionText}>Call</Text>
          </CardItem>

          <CardItem style={styles.actionButton} bordered>
            <TouchableOpacity
            onPress ={ () => {
              this.smsAction(this.state.phoneNumber)
            }} 
            >
              <Entypo
              name="message"
              size={50}
              color="#B83227"
              />
            </TouchableOpacity>
            <Text style={styles.actionText}>Message</Text>
          </CardItem>


          
        </Card>


        <Card style={styles.actionContainer}>
          <CardItem style={styles.actionButton} bordered>
            <TouchableOpacity
            onPress ={ () => {
              this.deleteContact(this.state.key)
            }} 
            >
              <Entypo
              name="trash"
              size={50}
              color="#B83227"
              />
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
          </CardItem>

          <CardItem style={styles.actionButton} bordered>
            <TouchableOpacity
            onPress ={ () => {
              this.editContact(this.state.key)
            }} 
            >
              <Entypo
              name="edit"
              size={50}
              color="#B83227"
              />
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>
          </CardItem>


          
        </Card>

        


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
  },
  infoContainer: {
    flexDirection: "column"
  }
});
