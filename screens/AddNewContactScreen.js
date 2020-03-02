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
            <Label>First Name</Label>
            <Input 
            autoCorrect={false}
            autoCapitalize="none"
            KeyboardType="default"
            placeholder="please write your first name here"
            onChangeText={ firstName => this.setState({firstName}) }
            />
          </Item>

          <Item style={styles.inputItem}>
            <Label>Last Name</Label>
            <Input 
            autoCorrect={false}
            autoCapitalize="none"
            KeyboardType="default"
            placeholder="please write your Last name here"
            onChangeText={ lastName => this.setState({lastName}) }
            />
          </Item>

          <Item style={styles.inputItem}>
            <Label>Phone Number</Label>
            <Input 
            autoCorrect={false}
            autoCapitalize="none"
            KeyboardType="number-pad"
            placeholder="please write your Phone Number here"
            onChangeText={ phoneNumber => this.setState({phoneNumber}) }
            />
          </Item>

          <Item style={styles.inputItem}>
            <Label>Email</Label>
            <Input 
            autoCorrect={false}
            autoCapitalize="none"
            KeyboardType="email-address"
            placeholder="please write your Email Address here"
            onChangeText={ email => this.setState({email}) }
            />
          </Item>

          <Item style={styles.inputItem}>
            <Label>Address</Label>
            <Input 
            autoCorrect={false}
            autoCapitalize="none"
            KeyboardType="default"
            placeholder="please write your Home Address here"
            onChangeText={ address => this.setState({address}) }
            />
          </Item>

        </Form>
        <Button
          style={styles.button}
          full
          onPress = { () => {
            this.saveContact();
          } }
        >
          <Text style={styles.buttonText}>Save</Text>
        </Button>
        <View style={styles.empty}></View>
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
