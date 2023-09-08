// AdminScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';

const AdminScreen = ({ navigation }) => {
  // Implement admin functionality here

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Admin Screen!</Text>
      <Button
        title="Go to Dashboard"
        onPress={() => navigation.navigate('Dashboard')}
      />
    </View>
  );
};

export default AdminScreen;
