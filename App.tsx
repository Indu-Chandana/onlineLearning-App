// In App.js in a new project -|- have to add the import 'react-native-gesture-handler'; 

import * as React from 'react';
import { View, Text, Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import 'react-native-reanimated'
import { createSharedElementStackNavigator } from "react-navigation-shared-element"

import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import themeReducer from './stores/themeReducer';

import {
  MainLayout,
  CourseListing
} from "./screens";

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

// const Stack = createNativeStackNavigator();
const Stack = createSharedElementStackNavigator(); // now we use this, after create CourseListing.

const options = { // use for navigation animations of CourseListiing
  gestureEnabled: false,
  transitionSpec: {
    open: { // when ever I navigate to the new screen (couseListing screen), user can see this trancition.
      animation: 'timing',
      config: { duration: 400, easing: Easing.inOut(Easing.ease) }
    },
    close: {
      nimation: 'timing',
      config: { duration: 400, easing: Easing.inOut(Easing.ease) }
    }
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress
      }
    }
  }

}

const store = createStore(themeReducer, applyMiddleware(thunk))

function App() {
  return (
    <Provider store={store} >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            useNativeDriver: true, // use for navigation animations of CourseListiing
            headerShown: false
          }}
          initialRouteName={'Dashboard'}
          detachInactiveScreens={false} // use for navigation animations of CourseListiing
        >
          <Stack.Screen name="Dashboard" component={MainLayout} />

          <Stack.Screen
            name='CourseListing'
            component={CourseListing}
            options={() => options} // use for navigation animations of CourseListiing
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

export default App;