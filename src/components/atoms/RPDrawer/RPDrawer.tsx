import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native';

interface Props {
    navigation: NavigationProp<any>;
}
const RPDrawer: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>RPDrawer</Text>
<Pressable onPress={() => {
  navigation.navigate("test")
}}>
      <Text >RPDrawerq</Text>
</Pressable>

    </View>
  )
}

export default RPDrawer

const styles = StyleSheet.create({})