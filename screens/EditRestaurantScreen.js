import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

function EditRestaurantScreen({ route, navigation }) {
  const { restaurant, onSave } = route.params;
  const [editedRestaurant, setEditedRestaurant] = useState(restaurant);

  const handleSave = () => {
    onSave(editedRestaurant); 
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={images[editedRestaurant.image]} />
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={editedRestaurant.name}
        onChangeText={(text) => setEditedRestaurant({ ...editedRestaurant, name: text })}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 16,
    marginTop: 8,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default EditRestaurantScreen;
