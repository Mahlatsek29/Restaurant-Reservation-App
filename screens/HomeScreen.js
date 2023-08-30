import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import ReservationListScreen from './ReservationListScreen';
import Dashboard from '../components/Dashboard';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation}) => {
  return (
<Tab.Navigator
  screenOptions={{
    tabBarShowLabel: false,
  }}
>
      <Tab.Screen
        name="Home"
        component={HomeContent}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={30} color={focused ? '#000' : '#888'} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={30} color={focused ? '#000' : '#888'} />
          ),
        }}
      />
      <Tab.Screen
        name="Reservations"
        component={ReservationListScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'book' : 'book-outline'} size={30} color={focused ? '#000' : '#888'} />
          ),
        }}
      />
    </Tab.Navigator>
    
  );
};

const HomeContent = ({ navigation }) => {
  const handleBookTable = () => {
    navigation.navigate('ReservationListScreen');
  };

  return (
    
    <ImageBackground source={require('../assets/background.jpg')} style={styles.backgroundImage}>
      
      <View style={styles.container}>
      <View ><Dashboard/></View>
        <Image source={require('../assets/logo1.png')} style={styles.logo} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search?"
          placeholderTextColor="#FFFFFF"
          textAlign="center"
          textAlignVertical="center"
        />
        <TouchableOpacity style={styles.button} onPress={handleBookTable}>
          <Text style={styles.buttonText}>Reserve-Table</Text>
        </TouchableOpacity>
    
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  searchBar: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: 'black',
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 75,
  },
});

export default HomeScreen;
