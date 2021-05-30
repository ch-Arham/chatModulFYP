import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "./screens/LoginScreen";
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import AddChatScreen from "./screens/AddChatScreen";
import ChatScreen from "./screens/ChatScreen";
import DialScreen from "./screens/DialScreen";
import ShowAllUsersScreen from "./screens/ShowAllUsersScreen";
import SendSMSScreen from "./screens/SendSMSScreen";

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);

//  import { LogBox } from 'react-native';

// LogBox.ignoreLogs(['Setting a timer for a long period of time']); 

/* const highestTimeoutId = setTimeout(() => ';');
 for (let i = 0; i < highestTimeoutId; i++) {
     clearTimeout(i); 
 } */

const Stack = createStackNavigator(); //create an initial stack that will hold all of the screens

const globalScreenOptions = {
  headerStyle: {backgroundColor: "#2C6BED"},
  headerTitleStyle: {color: "white"},
  headerTintColor: "white",
  headerTitleAlign: 'center',
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      //initialRouteName="Dial" 
      screenOptions={globalScreenOptions}> 
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='Register' component={RegisterScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="AddChat" component={AddChatScreen}/>
        <Stack.Screen name="Chat" component={ChatScreen}/>
        <Stack.Screen name="Dial" component={DialScreen}/>
        <Stack.Screen name="ShowAllUsers" component={ShowAllUsersScreen}/>
        <Stack.Screen name="SendSMS" component={SendSMSScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
