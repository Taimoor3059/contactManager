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


  componentWillMount() {  
    const {navigation} = this.props;
    //console.log(contact);
    navigation.addListener("focus", () => {
      this.getAllContact();
    })
  }
  

  getAllContact = async () => {
    await AsyncStorage.getAllKeys()
      .then( async keys => {
        console.log(keys);
        return AsyncStorage.multiGet(keys)
          .then(result => {
            this.setState = {
              data: result
            }
            //console.log(this.state.data.result.firstName);
          })
          .catch(error => {
            console.log('multiget block', error)
          })
      })
      .catch(error => {
        console.log("load keys error", error)
      });
  };
        

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem= { ({item}) => {
            contact = JSON.parse(item[1]);
              return (
                <TouchableOpacity>
                  <Card style={styles.listItem}>
                    <View style={styles.iconContainer}>
                      <Text style={styles.contactIcon}>
                        {contact.firstName[0].toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.infoContainer}>
                      <Text style={styles.infoText}>
                        {contact.firstName} {contact.lastName}
                      </Text>
                      <Text style={styles.infoText}>
                        {contact.phoneNumber}
                      </Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              )
          }}
          keyExtractor={ (item, index) => item[0].toString() } 
        />
        <TouchableOpacity
          style={styles.floatButton}
          onPress={ () => {
            this.props.navigation.navigate("Add");
          } }
        >
          <Entypo
            name="plus"
            size={30}
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



