import 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createStackNavigator();
const globalSceenOptions = {
  headerStyle: { backgroundColor: "#2C6EBD" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white"
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalSceenOptions}>
        <Stack.Screen options={{headerTitleAlign: 'center'}} name='Login' component={LoginScreen}/>
        <Stack.Screen options={{headerTitleAlign: 'center' , headerBackTitleVisible:true}} name='Register' component={RegisterScreen}/>
        <Stack.Screen options={{headerTitleAlign: 'center'}} name='Home' component={HomeScreen}/>
        <Stack.Screen options={{headerTitleAlign: 'center'}} name='AddChat' component={AddChatScreen}/>
        <Stack.Screen options={{headerTitleAlign: 'center'}} name='Chat' component={ChatScreen}/>

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
