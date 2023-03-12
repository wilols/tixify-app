import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('https://tixify.se/api/events.php')
      .then(response => response.json())
      .then(data => setEvents(data.events))
      .catch(error => console.error(error));
  }, []);
  
  

  const renderItem = ({ item }) => (
    <View style={styles.gridItem}>
      <Image source={{ uri: item.main_image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.organizer}>{item.organizer}</Text>
        <Text style={styles.price}>{item.price_range}</Text>
      </View>
    </View>
  );

  return (
    <>
      <StatusBar style="light" backgroundColor="#000" />
      <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Välkommen till Tixify</Text>
        <FlatList
          data={events}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.grid}
        />
      </SafeAreaView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerLink} onPress={() => handleLogin()}>
          <Text style={styles.footerText}>Log in / Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerLink} onPress={() => handleSearch()}>
          <Text style={styles.footerText}>Search events</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}




const styles = StyleSheet.create({
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 100,
    paddingBottom: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#0E273C',
    paddingTop: 20,
  },
  grid: {
    padding: 16,
  },
  gridItem: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 8,
  },
  image: {
    height: 150,
    width: '100%',
  },
  details: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    marginBottom: 4,
  },
  organizer: {
    fontSize: 14,
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
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
