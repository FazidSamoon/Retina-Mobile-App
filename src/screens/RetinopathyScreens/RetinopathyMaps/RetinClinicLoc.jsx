import React, { useState, useEffect } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import GetLocation from "./GetLocation"; // Your component for getting location
import NearestRetinoClinicals from "../TopBar/NearestRetinoClinicals";

const OpenStreetMapComponent = () => {
  const [hospitals, setHospitals] = useState([]);
  const [region, setRegion] = useState({
    latitude: 37.78825, //map's initial view.
    longitude: -122.4324, //map's initial view.
    latitudeDelta: 0.015, //Smaller values zoom in, and larger values zoom out.
    longitudeDelta: 0.0121, //Smaller values zoom in, and larger values zoom out.
  });

  const fetchEyeHospitals = (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=10000&type=hospital&keyword=eye%20hospital&key=AIzaSyDS9tdMKzM6HGai6RPsqAjXOBGLPBCZe10`;

    axios
      .get(url)
      .then((response) => {
        if (response.data.results.length === 0) {
          console.log("No retinopathy hospitals found.");
        } else {
          setHospitals(response.data.results);
        }
      })
      .catch((error) => {
        console.error("Error fetching retinopathy hospitals: ", error);
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



  // container: {
  //   paddingHorizontal: 30,
  //   paddingVertical: 40,
  //   display: "flex",
  //   flexDirection: "column",
  //   height: "100%",
  //   backgroundColor: "white",
  // },
  return (
    <>

    <View style={styles.container}>
    <NearestRetinoClinicals />
    </View>
   
      <View style={{ flex: 1 }}>
        <GetLocation onLocationFound={handleLocationFound} />
        <MapView
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
          region={region}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="You are here"
          />
          {hospitals.map((hospital, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: hospital.geometry.location.lat,
                longitude: hospital.geometry.location.lng,
              }}
              title={hospital.name}
              description={hospital.vicinity}
            />
          ))}
        </MapView>
      </View>
    </>
  );
};

export default OpenStreetMapComponent;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: "flex",
    flexDirection: "column",
   
    backgroundColor: "white",
  },
});
