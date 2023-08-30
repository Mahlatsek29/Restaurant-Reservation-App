import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { firebase } from './config';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import HomeScreen from './screens/HomeScreen';
import ReservationListScreen from './screens/ReservationListScreen';
import ReservationsScreen from './screens/ReservationsScreen';

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber(); 
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
    
    
       <Stack.Navigator>
       <Stack.Screen
           name="Welcome" 
           component={WelcomeScreen}
           options={{headerShown: false}}
           />
           <Stack.Screen 
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
        />
         <Stack.Screen
         name="Registration"
          component={RegistrationScreen} 
          options={{headerShown: false}}
          />
        <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{headerShown: false}}
        />
        
          <Stack.Screen 
          name="ReservationList"
           component={ReservationListScreen}
           options={{headerShown: false}}
           />
          <Stack.Screen 
          name="ReservationsScreen" 
          component={ReservationsScreen} 
          options={{headerShown: false}}
          />
          </Stack.Navigator>
    
    
    </NavigationContainer>
  );
}

export default App
    
  