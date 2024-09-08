import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RecommendHomeContainer from '../../../components/organisms/RecommendHomeContainer/RecommendHomeContainer'

const RecommendHome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <RecommendHomeContainer />
    </SafeAreaView>
  )
}

export default RecommendHome

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