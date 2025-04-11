import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

type Props = {}

const HomeLayout = (props: Props) => {
  return (
    <Tabs screenOptions={{headerShown:false}}>
      <Tabs.Screen name="index" options={{title:"Home"}}/>
      <Tabs.Screen name="bag" options={{title:"Bag"}}/>
      <Tabs.Screen name="wishlist" options={{title:"Wishlist"}}/>
      <Tabs.Screen name="chat" options={{title:"Chat"}}/>
      <Tabs.Screen name="profile" options={{title:"Profile"}}/>
    </Tabs>
  )
}

export default HomeLayout

const styles = StyleSheet.create({})