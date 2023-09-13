// In App.js in a new project -|- have to add the import 'react-native-gesture-handler'; 

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import 'react-native-reanimated'

import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import themeReducer from './stores/themeReducer';

import {
  MainLayout
} from "./screens";

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const store = createStore(themeReducer, applyMiddleware(thunk))

function App() {
  return (
    <Provider store={store} >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName={'Dashboard'}
        >
          <Stack.Screen name="Dashboard" component={MainLayout} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

export default App;