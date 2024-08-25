import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LeaderboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text>LeaderboardScreen</Text>
    </View>
  )
}

export default LeaderboardScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 40,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "white",
      },
})