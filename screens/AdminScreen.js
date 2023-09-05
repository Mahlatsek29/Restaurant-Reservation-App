// AdminScreen.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';

const AdminScreen = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');

  const addItem = () => {
    if (itemName.trim() === '') {
      return;
    }

    // Create a new item with a unique ID
    const newItem = {
      id: Math.random().toString(),
      name: itemName,
    };

    // Update the items list with the new item
    setItems((prevItems) => [...prevItems, newItem]);

    // Clear the input field
    setItemName('');
  };

  const deleteItem = (itemId) => {
    // Filter out the item with the provided ID
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter item name"
        value={itemName}
        onChangeText={(text) => setItemName(text)}
      />
      <Button title="Add Item" onPress={addItem} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Button title="Delete" onPress={() => deleteItem(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default AdminScreen;
