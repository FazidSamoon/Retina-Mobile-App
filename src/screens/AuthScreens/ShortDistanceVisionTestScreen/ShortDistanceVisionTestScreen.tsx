import { SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import ShortDistanceVIsionTestContainer from '../../../components/organisms/ShortDistanceVisionTestContainer/ShortDistanceVIsionTestContainer'

const ShortDistanceVisionTestScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ShortDistanceVIsionTestContainer />
    </SafeAreaView>
  )
}

export default ShortDistanceVisionTestScreen

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