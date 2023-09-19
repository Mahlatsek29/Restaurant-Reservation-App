import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { firebase } from './config';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import AdminLoginScreen from './screens/AdminLoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import HomeScreen from './screens/HomeScreen';
import ReservationListScreen from './screens/ReservationListScreen';
import ReservationsScreen from './screens/ReservationsScreen'
import MakeReservationScreen from './screens/MakeReservationScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import AdminScreen from './screens/AdminScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import BookingScreen from './screens/BookingScreen';
import MonthlyStatsScreen from './screens/MonthlyStatsScreen';
import ArrivalsScreen from './screens/ArrivalsScreen';

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
        name="AdminLogin"
        component={AdminLoginScreen}
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
           <Stack.Screen 
          name="MakeReservation" 
          component={MakeReservationScreen} 
          options={{headerShown: false}}
          />
           <Stack.Screen 
          name="ConfirmationScreen" 
          component={ConfirmationScreen} 
          options={{headerShown: false}}
          />
           <Stack.Screen 
          name="Admin" 
          component={AdminScreen} 
          options={{headerShown: false}}
          />
           <Stack.Screen 
          name="Restaurant" 
          component={RestaurantScreen} 
          options={{headerShown: false}}
          />
           <Stack.Screen 
          name="Bookings" 
          component={BookingScreen} 
          options={{headerShown: false}}
          />
           <Stack.Screen 
          name="MonthlyStats" 
          component={ MonthlyStatsScreen} 
          options={{headerShown: false}}
          />
           <Stack.Screen 
          name="Arrivals" 
          component={ArrivalsScreen} 
          options={{headerShown: false}}
          />
          </Stack.Navigator>
    
    
    </NavigationContainer>
  );
}

export default App
    
  