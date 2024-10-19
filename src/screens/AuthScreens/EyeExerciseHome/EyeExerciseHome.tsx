import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EyeExerciseContainer from '../../../components/organisms/EyeExerciseContainer/EyeExerciseContainer'

const EyeExerciseHome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <EyeExerciseContainer />
    </SafeAreaView>
  )
}

export default EyeExerciseHome

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