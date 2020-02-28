
//import screens
import HomeScreen from "./screens/HomeScreen";
import EditContactScreen from "./screens/EditContactScreen";
import AddNewContactScreen from "./screens/AddNewContactScreen";
import ViewContactScreen from "./screens/ViewContactScreen";

//import react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const stack = createStackNavigator();


export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" Component={HomeScreen} />
          <Stack.Screen name="AddNewContactScreen" Component={AddNewContactScreen} />
          <Stack.Screen name="EditContactScreen" component={EditContactScreen} />
          <Stack.Screen name="ViewContactScreen" component={ViewContactScreen} />
        </Stack.Navigator>
      </NavigationContainer>  
    );
  }
  
}


