import React, { useRef } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const rotationValue = useRef(new Animated.Value(0)).current;

  const handleImagePress = () => {
    Animated.timing(rotationValue, {
      toValue: 1, 
      duration: 1000, 
      useNativeDriver: true,
    }).start(() => {
      
      navigation.navigate('Login');
    
      rotationValue.setValue(0);
    });
  };

  const interpolatedRotation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePress}>
        <Animated.Image
          source={require('../assets/logo2.png')}
          style={[styles.image, { transform: [{ rotate: interpolatedRotation }] }]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black', 
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    borderRadius: 150,
  },
});

export default WelcomeScreen;
