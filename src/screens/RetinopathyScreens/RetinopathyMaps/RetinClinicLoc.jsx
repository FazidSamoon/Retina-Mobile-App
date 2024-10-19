// // OpenStreetMapComponent.js
// import React, { useState } from 'react';
// import { View, Dimensions } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import axios from 'axios';
// import GetLocation from './GetLocation';  // Your component for getting location

// const OpenStreetMapComponent = () => {
//   const [hospitals, setHospitals] = useState([]);
//   const [region, setRegion] = useState({
//     latitude: 37.78825,
//     longitude: -122.4324,
//     latitudeDelta: 0.015,
//     longitudeDelta: 0.0121,
//   });

//   const fetchEyeHospitals = (latitude, longitude) => {
//     const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=eye%20hospital&limit=10&lat=${latitude}&lon=${longitude}&countrycodes=lk&radius=10000`; // Searching for eye hospitals
//     axios.get(url)
//       .then(response => {
//         console.log(response.data);  // Log response to see if data is coming
//         if (response.data.length === 0) {
//           console.log("No eye hospitals found.");
//         } else {
//           setHospitals(response.data);
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching eye hospitals: ", error);
//       });
//   };

//   const handleLocationFound = (location) => {
//     setRegion({
//       ...region,
//       latitude: location.latitude,
//       longitude: location.longitude,
//     });
//     fetchEyeHospitals(location.latitude, location.longitude);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <GetLocation onLocationFound={handleLocationFound} />
//       <MapView
//         style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
//         region={region}
//         showsUserLocation={true}
//         followsUserLocation={true}
//       >
//         <Marker
//           coordinate={{ latitude: region.latitude, longitude: region.longitude }}
//           title="You are here"
//         />
//         {hospitals.map((hospital, index) => (
//           <Marker
//             key={index}
//             coordinate={{
//               latitude: parseFloat(hospital.lat),
//               longitude: parseFloat(hospital.lon),
//             }}
//             title={hospital.display_name}
//             description={hospital.address?.road || 'Eye Hospital'}
//           />
//         ))}
//       </MapView>
//     </View>
//   );
// };

// export default OpenStreetMapComponent;






import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";

const API_KEY = "AIzaSyDS9tdMKzM6HGai6RPsqAjXOBGLPBCZe10"; // Replace with your API key

export default function OpenStreetMapComponent({ navigation }) {
  const [pharmacyLocations, setPharmacyLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMessage("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);

        // Fetch pharmacy locations from Google Places API
        const pharmacies = await fetchPharmacyLocations(
          location.coords.latitude,
          location.coords.longitude
        );
        setPharmacyLocations(pharmacies);

        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        setErrorMessage("Error getting location: " + error.message);
      }
    }

    fetchData();
  }, []);

  const handleShowLiveLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);

      setMapRegion((prevRegion) => ({
        ...prevRegion,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }));

      // Find nearest pharmacy
      const nearestPharmacy = await findNearestPharmacy(location.coords);

      // Fetch and display route to the nearest pharmacy
      if (nearestPharmacy) {
        await fetchRoute(location.coords, nearestPharmacy);
      } else {
        setErrorMessage("No Retinopathy Clinicals found.");
      }
    } catch (error) {
      setErrorMessage("Error getting live location: " + error.message);
    }
  };

  const fetchPharmacyLocations = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=pharmacy&key=${API_KEY}`
      );
      const data = await response.json();

      const pharmacies = data.results.map((pharmacy) => ({
        id: pharmacy.place_id,
        name: pharmacy.name,
        latitude: pharmacy.geometry.location.lat,
        longitude: pharmacy.geometry.location.lng,
      }));

      return pharmacies;
    } catch (error) {
      setErrorMessage("Error fetching pharmacy locations: " + error.message);
      return [];
    }
  };

  const findNearestPharmacy = async (userLocation) => {
    let nearestPharmacy = null;
    let minDistance = Infinity;

    for (const pharmacy of pharmacyLocations) {
      const distance = await calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        pharmacy.latitude,
        pharmacy.longitude
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestPharmacy = pharmacy;
      }
    }

    return nearestPharmacy;
  };

  const handleOpenGoogleMaps = async () => {
    if (userLocation && pharmacyLocations.length > 0) {
      const { latitude, longitude } = userLocation;
      const nearestPharmacy = await findNearestPharmacy(userLocation); // Await here

      if (nearestPharmacy) {
        const { latitude: destLat, longitude: destLng } = nearestPharmacy;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destLat},${destLng}&travelmode=driving`;
        Linking.openURL(url);
      } else {
        setErrorMessage("No Retinopathy Clinical found.");
      }
    } else {
      setErrorMessage("User location or pharmacy locations not available.");
    }
  };

  const calculateDistance = async (lat1, lon1, lat2, lon2) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat1},${lon1}&destinations=${lat2},${lon2}&key=${API_KEY}`
      );
      const data = await response.json();

      const distance = data.rows[0].elements[0].distance.value / 1000; // Distance in km
      return distance;
    } catch (error) {
      setErrorMessage("Error calculating distance: " + error.message);
      return Infinity;
    }
  };

  const fetchRoute = async (origin, destination) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.routes.length > 0) {
        const route = data.routes[0].overview_polyline.points;
        const decodedRoute = decodePolyline(route);
        setRouteCoordinates(decodedRoute);
      } else {
        setErrorMessage("No route found.");
      }
    } catch (error) {
      setErrorMessage("Error fetching route: " + error.message);
    }
  };

  const decodePolyline = (encoded) => {
    const len = encoded.length;
    let index = 0;
    const array = [];
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      array.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return array;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Retinopathy Clinical Locations</Text>
      <MapView style={styles.map} initialRegion={mapRegion}>
        {pharmacyLocations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.name}
          />
        ))}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Your Location"
            pinColor="blue"
          />
        )}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={4}
            strokeColor="red"
          />
        )}
      </MapView>
      <TouchableOpacity style={styles.button} onPress={handleShowLiveLocation}>
        <Text style={styles.buttonText}>
          Navigate to Nearest Diabatic Retinopathy Clinic
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleOpenGoogleMaps}>
        <Text style={styles.buttonText}>Open Google Maps</Text>
      </TouchableOpacity>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  map: {
    width: "100%",
    height: "80%",
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});
