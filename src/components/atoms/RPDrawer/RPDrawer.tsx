import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native';

interface Props {
    navigation: NavigationProp<any>;
}
const RPDrawer: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
   
      <Button
        title="Go to Diabatic"
        onPress={() => navigation.navigate('Diabatic')}
      />    
      
      
      <Button
        title="Go to Retinopathy"
        onPress={() => navigation.navigate('Retinopathy')}
      />   
      
      
      
         <Button
        title="Go to HealthTips"
        onPress={() => navigation.navigate('HealthTips')}
      />

      
       <Button
        title="Go to RetinClinicLoc"
        onPress={() => navigation.navigate('RetinClinicLoc')}
      />







    </View>
  )
}

export default RPDrawer

const styles = StyleSheet.create({})