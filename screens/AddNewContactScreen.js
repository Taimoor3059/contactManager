import React from 'react';
import { StyleSheet, Text, View, Keyboard, AsyncStorage, Alert, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base'; 

export default class AddNewContactScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      address: ""
    }
  }

  static navigationOptions = {
    title: "Contact App"
  }

  saveContact = async () => {
    if (
      this.state.firstName !== "empty" &&
      this.state.lastName !== "empty" &&
      this.state.phoneNumber !== "empty" &&
      this.state.email !== "empty" &&
      this.state.address !== "empty"
    ) {
       var contact = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        address: this.state.address
       }

       await AsyncStorage.setItem( Date.now().toString(),
       JSON.stringify(contact)
       )
       .then( () => {
         this.props.navigation.goBack();
       })
       .catch( error => {
         console.log(error)
       })
    } else {
      Alert.alert("All fields are required!")
    }
  }


  render() {
    return (
      <TouchableWithoutFeedback
        onPress = { () => {
          Keyboard.dismiss
        }}
      
      >
      <ScrollView style={styles.container}>
        <Form>
          <Item style={styles.inputItem}>
            <label>First Name</label>
            <input 
            autoCorrect={false}
            autoCapitalize="none"
            KeyboardType="decimal-pad"
            onChangeText={ firstName => this.setState({firstName}) }
            />
          </Item>
        </Form>
      </ScrollView>

      </TouchableWithoutFeedback>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    height: 500
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#B83227",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  empty: {
    height: 500,
    backgroundColor: "#FFF"
  }
});
