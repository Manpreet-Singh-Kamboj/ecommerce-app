import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BrandItems from './brant-items'
import { brands } from '@/constants/brands'

type Props = {}

const Brands = (props: Props) => {
  return (
    <View>
        <View style={{justifyContent:"space-between", flexDirection:'row', alignItems: 'center'}}>
      <Text>Brands</Text>
      <Pressable> <Text>See All</Text></Pressable>
      </View>
      <View style={{flexDirection:"row", justifyContent:'space-between', marginTop:10}}>
        {brands.map((item, index) => {
          return <BrandItems key={index} brandName={item.brandName} imgPath={item.imgPath}/>
        })}
      </View>
    </View>
  )
}

export default Brands

const styles = StyleSheet.create({})
