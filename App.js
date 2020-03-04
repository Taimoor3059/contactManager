
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "./screens/HomeScreen";
import AddNewContactScreen from './screens/AddNewContactScreen';
import EditContactScreen from './screens/EditContactScreen';
import ViewContactScreen from './screens/ViewContactScreen';



const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#b83227"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "#fff"
          }
        }}
        
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{title: "Contact App"}} />
        <Stack.Screen name="Add" component={AddNewContactScreen} options={{title: "Contact App"}}  />
        <Stack.Screen name="Edit" component={EditContactScreen} />
        <Stack.Screen name="View" component={ViewContactScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;




