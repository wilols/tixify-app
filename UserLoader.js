import React, { useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from './UserContext';

const UserLoader = () => {
  const { setUserData } = useContext(UserContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataJSON = await AsyncStorage.getItem('userData');
        if (userDataJSON !== null) {
          const userData = JSON.parse(userDataJSON);
          setUserData(userData);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchUserData();
  }, []);

  return null;
};

export default UserLoader;
