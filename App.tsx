import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as SQLite from "expo-sqlite/legacy";

export default function App() {
  const [books, setBooks] = useState([]);
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const db = SQLite.openDatabase('db.db');

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, genre TEXT)');
    });
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM books', null,
        (txObj, resultSet) => setBooks(resultSet.rows._array),
        (txObj, error) => console.log(error)
        );
    });
  }, []);

  const addItems = () => {
    if (name && genre) {
      db.transaction((tx) => {
        tx.executeSql('INSERT INTO books (name, genre) VALUES (?, ?)', [name, genre],
          (txObj, resultSet) => {
            let newItem = { id: resultSet.insertId, name, genre };
            setBooks((prevItems) => [...prevItems, newItem]);
            setName('');
            setGenre('');
          },
          //(txObj, error) => console.log(error)
        );
      });
    } else {
      Alert.alert('Please enter both name and genre');
    }
  };

  const deleteItems = (id) => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM books WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            setBooks((prevItems) => prevItems.filter(item => item.id !== id));
          }
        },
        //(txObj, error) => console.log(error)
      );
    });
  };
  const updateItems = (id) => {
    if (name && genre) {
      db.transaction((tx) => {
        tx.executeSql('UPDATE books SET name = ?, genre = ? WHERE id = ?', [name, genre, id],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              setBooks((prevItems) => prevItems.map((item) =>
                item.id === id ? { id, name, genre } : item
              ));
              setName('');
              setGenre('');
              setSelectedItem(null);
            }
          },
          //(txObj, error) => console.log(error)
        );
      });
    } else {
      Alert.alert('Please enter both name and genre');
    }
  };

  const archiveItems = (item) => {
    // Populate input fields with the selected item's data
    setSelectedItem(item);
    setName(item.name);
    setGenre(item.genre);
  };

  const showDeleteConfirmation = (item) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Update", onPress: () => archiveItems(item) },
        { text: "OK", onPress: () => deleteItems(item.id) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.textTitle}>Welcome to the Book App</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder='Name' value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder='Genre' value={genre} onChangeText={setGenre} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={selectedItem ? () => updateItems(selectedItem.id) : addItems}>
          <Text style={styles.buttonText}>{selectedItem ? "Update" : "Add"}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.textTitleContainer}>
          <Text style={styles.textTitle}>Book List</Text>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>No.</Text>
            <Text style={styles.tableHeaderText}>Name</Text>
            <Text style={styles.tableHeaderText}>Genre</Text>
          </View>
          <FlatList
            data={books.map((item, index) => ({ ...item, orderNumber: index + 1 }))}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onLongPress={() => showDeleteConfirmation(item)} onPress={() => archiveItems(item)}>
                <View style={styles.tableRow}>
                  <Text style={styles.text}>{item.orderNumber}</Text>
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.text}>{item.genre}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 10,
    marginTop: 70,
    alignContent: "center",
  },
  textTitleContainer: {
    alignItems: "center",
    margin: 20,
    padding: 10,
  },
  headerContainer: {
    alignItems: "center",
    margin: 20,
    padding: 10,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textContainer: {
    padding: 10,
  },
  text: {
    fontSize: 14,
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    padding: 10,
    fontWeight: "bold",
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  input: {
    borderColor: "blue",
    borderRadius: 4,
    borderWidth: 1,
    height: 40,
    width: "100%",
    margin: 16,
    padding: 8,
    fontSize: 14,
  },
  listArea: {
    paddingTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  button: {
    width: 110,
    height: 40,
    backgroundColor: "blue",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#a1a2a3a4',
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#b1b1b1b1',
  },
  tableRowText: {
    fontSize: 16,
  },
});
