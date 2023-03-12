import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView, View, Text, TouchableOpacity, Image, StatusBar, StyleSheet } from 'react-native';

const EventScreen = () => {
  const [event, setEvent] = useState({});
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const eventId = route.params.eventId;
    fetch(`https://tixify.se/api/event-info.php?id=${eventId}`)
      .then(response => response.json())
      .then(data => setEvent(data.event))
      .catch(error => console.error(error));
  }, [route.params.eventId]);

  const handleBuyTicket = () => {
    // code to handle buying ticket
  };

  return (
    <>
      <StatusBar style="light" backgroundColor="#000" />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Tillbaka</Text>
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <Image source={{ uri: event.main_image }} style={styles.eventImage} />
          <View style={styles.eventDetails}>
            <Text style={styles.eventTitle}>{event.name}</Text>
            <Text style={styles.eventDate}>{event.date}</Text>
            <Text style={styles.eventOrganizer}>{event.organizer}</Text>
            <Text style={styles.eventPrice}>{event.price_range}</Text>
            <View style={styles.ticketTypesContainer}>
              <Text style={styles.ticketTypesTitle}>Biljetter:</Text>
              {event.ticket_types && event.ticket_types.map((ticketType) => (
                <View key={ticketType.id} style={styles.ticketType}>
                  <Text style={styles.ticketTypeName}>{ticketType.name}</Text>
                  <Text style={styles.ticketTypeDescription}>{ticketType.description}</Text>
                  <Text style={styles.ticketTypePrice}>{ticketType.price}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.buyButton} onPress={handleBuyTicket}>
              <Text style={styles.buyButtonText}>Köp biljett</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerLink} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.footerText}>Log in / Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerLink} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.footerText}>Search events</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E273C',
  },
  backButton: {
    fontSize: 18,
    color: 'white',
    margin: 10,
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  eventImage: {
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 10,
  },
  eventDetails: {
    padding: 30,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventDate: {
    fontSize: 18,
    marginBottom: 5,
  },
  eventOrganizer: {
    fontSize: 18,
    marginBottom: 5,
  },
  eventPrice: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  ticketTypesContainer: {
    marginTop: 10,
  },
  ticketTypesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ticketType: {
    marginBottom: 10,
  },
  ticketTypeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ticketTypeDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  ticketTypePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  buyButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buyButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
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

export default EventScreen;

