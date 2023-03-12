import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // import the useNavigation hook
import UserContext from './UserContext';

const AccountScreen = ({ route }) => {
    const navigation = useNavigation(); // get the navigation object using the useNavigation hook
    const { userData } = useContext(UserContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (userData) {
        setUser(userData);
        }
    }, [userData]);

  return (
    <>
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mitt konto</Text>
      {user && (
        <View>
          <Text style={styles.label}>Användarnamn:</Text>
          <Text style={styles.value}>{user.username}</Text>
          <Text style={styles.label}>E-postadress:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
      )}
    </SafeAreaView>

    <View style={styles.footer}>
        <TouchableOpacity style={styles.footerLink} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.footerText}>Log in / Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerLink} onPress={() => navigation.navigate('Account')}>
        <Text style={styles.footerText}>Search events</Text>
        </TouchableOpacity>
    </View>
    </>
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#CA3433',
    paddingVertical: 30,
  },
  footerLink: {
    paddingHorizontal: 10,
  },
  footerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AccountScreen;
