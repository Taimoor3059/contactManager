import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import { Card } from "native-base";
import { Entypo } from '@expo/vector-icons';


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  static navigationOptions = {
    title: "Contact App"
  }

  componentWillMount() {
    const {navigation} = this.props;
    navigation.addListener("willFocus", () => {
      this.getAllContact();
    })
  }

  getAllContact = async () => {
    await AsyncStorage.getAllKeys()
      .then( keys => {
        //console.log(keys)
        return AsyncStorage.multiGet(keys)
          .then( result => {
            this.setState({
              data: result.sort(function(a, b) {
                if (JSON.parse(a[1]).firstName < JSON.parse(b[1]).firstName) {
                  return -1;
                }
                if (JSON.parse(a[1]).firstName > JSON.parse(b[1]).firstName) {
                  return 1;
                }
                return 0;
              })
            });
          })
          .catch(error => {
            console.log(error)
          });
      })
      .catch( () => {
        console.log(error);  
      });

      console.log(this.state.data)
      
  }



  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
        style={styles.floatButton}
          onPress={ () => {
            this.props.navigation.navigate("Add");
          } }
        >
          <Entypo
            name="plus"
            size={32}
            color="#fff" 
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  listItem: {
    flexDirection: "row",
    padding: 20
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B83227",
    borderRadius: 100
  },
  contactIcon: {
    fontSize: 28,
    color: "#fff"
  },
  infoContainer: {
    flexDirection: "column"
  },
  infoText: {
    fontSize: 16,
    fontWeight: "400",
    paddingLeft: 10,
    paddingTop: 2
  },
  floatButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 60,
    backgroundColor: "#B83227",
    borderRadius: 100
  }
});



