import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
const ExerciseRecommend = () => {
  return (
    <SafeAreaView style={styles.container}>

        <Text>Meals Recommend</Text>
      
    </SafeAreaView>
  )
}

export default ExerciseRecommend

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