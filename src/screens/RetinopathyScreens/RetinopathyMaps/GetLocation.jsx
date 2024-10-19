import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';

const GetLocation = ({ onLocationFound }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    onLocationFound(location.coords);
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View>
      {location ? (
        <Text>Location: {location.latitude}, {location.longitude}</Text>
      ) : errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : (
        <Text>Getting Location...</Text>
      )}
    </View>
  );
};

export default GetLocation;
