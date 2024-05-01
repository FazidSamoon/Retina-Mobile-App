import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LongDistanceVisionTestContainer from '../../../components/organisms/LongDistanceVisionTestContainer/LongDistanceVisionTestContainer'

const LongDistanceVisionTestScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LongDistanceVisionTestContainer />
    </SafeAreaView>
  )
}

export default LongDistanceVisionTestScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 40,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "white",
    }
})