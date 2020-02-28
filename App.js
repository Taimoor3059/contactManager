
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "./screens/HomeScreen";
import AddNewContactScreen from './screens/AddNewContactScreen';
import EditContactScreen from './screens/EditContactScreen';
import ViewContactScreen from './screens/ViewContactScreen';

//class HomeScreen extends React.Component {
  //render() {
   // return (
    //  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     //   <Text>Home Screen</Text>
     // </View>
 //   );
//  }
//}



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add" component={AddNewContactScreen} />
        <Stack.Screen name="Edit" component={EditContactScreen} />
        <Stack.Screen name="View" component={ViewContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;




