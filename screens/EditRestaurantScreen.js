import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import images from '../components/images';

function EditRestaurantScreen({ route, navigation }) {
  const { restaurant, onSave, onAdd } = route.params;

  const [editedRestaurant, setEditedRestaurant] = useState({ ...restaurant });

  const handleSave = () => {
    onSave(editedRestaurant);
    navigation.goBack();
  };

  const handleAdd = () => {
    onAdd(editedRestaurant.name, editedRestaurant.description, editedRestaurant.image, editedRestaurant.location);
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
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={editedRestaurant.description}
        onChangeText={(text) => setEditedRestaurant({ ...editedRestaurant, description: text })}
      />
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={editedRestaurant.location}
        onChangeText={(text) => setEditedRestaurant({ ...editedRestaurant, location: text })}
      />
      <Button title="Save" onPress={handleSave} />
      <Button title="Add" onPress={handleAdd} />
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
