import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MealsRecommendContainer from '../../../components/organisms/MealsRecommendContainer/MealsRecommendContainer'
const MealsRecommend = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MealsRecommendContainer />
    </SafeAreaView>
  )
}

export default MealsRecommend

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