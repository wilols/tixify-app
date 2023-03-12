import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from './UserContext';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUserData } = useContext(UserContext);

  const handleLogin = () => {
    fetch('https://tixify.se/api/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `action=login&username=${username}&password=${password}`
    })
    .then(response => response.json())
    .then(async (data) => {
      if (data.success) {
        setUserData(data.data);
        await AsyncStorage.setItem('userData', JSON.stringify(data.data));
        navigation.navigate('Home');
      } else {
        alert(data.message);
      }
    })
    .catch(error => {
      console.error(error);
      alert('An error occurred, please try again later');
    });
  };
        
  const handleRegister = () => {
    navigation.navigate('Register');
  };
        
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logga in</Text>
      <TextInput
        style={styles.input}
        placeholder="Användarnamn"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Lösenord"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Logga in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerLink}>Har du inget konto? Registrera dig här.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  registerLink: {
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LoginScreen;
