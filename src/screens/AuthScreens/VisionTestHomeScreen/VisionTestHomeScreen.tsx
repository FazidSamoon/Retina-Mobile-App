import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import VisionHomeScreenContainer from '../../../components/organisms/VisionHomeScreenContainer/VisionHomeScreenContainer'

const VisionTestHomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <VisionHomeScreenContainer />
    </SafeAreaView>
  )
}

export default VisionTestHomeScreen

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