import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

// IMPORTANT: 'localhost' won't work on a real phone or emulator.
// Use your computer's local IP address instead, e.g. http://192.168.1.10:5000/api/users
const API_URL = 'http://YOUR_LOCAL_IP:5000/api/users';

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const addUser = async () => {
    try {
      const res = await axios.post(API_URL, { name, email });
      setUsers([...users, res.data]);
      setName('');
      setEmail('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Users</Text>

      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Add User" onPress={addUser} />

      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name} — {item.email}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 6 },
  item: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
});
