import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react' 


type Props = {}

const HomeScreen = (props: Props) => {
  return (
    <ScrollView style={{height:3000, width:"100%"}}>
      <Text>HomeScreen</Text>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})