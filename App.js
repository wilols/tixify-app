import React, { useState } from 'react';
import { NavigationContainer,  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserContext from './UserContext';
import UserLoader from './UserLoader';
import HomeScreen from './HomeScreen';
import EventScreen from './EventScreen';
import LoginScreen from './LoginScreen';
import AccountScreen from './AccountScreen';
import RegisterScreen from './RegisterScreen';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  const [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'none'
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen // add the new screen to the stack
            name="Event"
            component={EventScreen}
          />
          <Stack.Screen // add the new screen to the stack
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen // add the new screen to the stack
            name="Account"
            component={AccountScreen}
          />
          <Stack.Screen // add the new screen to the stack
            name="Register"
            component={RegisterScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );

};

export default MyStack;