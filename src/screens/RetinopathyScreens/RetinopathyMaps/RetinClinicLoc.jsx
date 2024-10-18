// OpenStreetMapComponent.js
import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
//import MapView, { Marker } from 'react-native-maps';
//import axios from 'axios';
import GetLocation from './GetLocation';  // Your component for getting location

const OpenStreetMapComponent = () => {
  const [hospitals, setHospitals] = useState([]);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const fetchEyeHospitals = (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=eye%20hospital&limit=10&lat=${latitude}&lon=${longitude}&countrycodes=lk&radius=10000`; // Searching for eye hospitals
    axios.get(url)
      .then(response => {
        console.log(response.data);  // Log response to see if data is coming
        if (response.data.length === 0) {
          console.log("No eye hospitals found.");
        } else {
          setHospitals(response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching eye hospitals: ", error);
      });
  };

  const handleLocationFound = (location) => {
    setRegion({
      ...region,
      latitude: location.latitude,
      longitude: location.longitude,
    });
    fetchEyeHospitals(location.latitude, location.longitude);
  };

  return (
    <View style={{ flex: 1 }}>
      <GetLocation onLocationFound={handleLocationFound} />
      <MapView
        style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        region={region}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        <Marker
          coordinate={{ latitude: region.latitude, longitude: region.longitude }}
          title="You are here"
        />
        {hospitals.map((hospital, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(hospital.lat),
              longitude: parseFloat(hospital.lon),
            }}
            title={hospital.display_name}
            description={hospital.address?.road || 'Eye Hospital'}
          />
        ))}
      </MapView>
    </View>
  );
};

export default OpenStreetMapComponent;
