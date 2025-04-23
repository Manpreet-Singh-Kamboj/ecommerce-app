import { StyleSheet, Text, View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Colors } from '@/constants/colors'

type Props = {
  name: string;
  price: number;
  image: ImageSourcePropType;
  onPress?: () => void;
}

const ProductCard = ({ name, price, image, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          <AntDesign name="arrowright" size={16} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  container: {
    width: '48%',
    height: 250,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
  },
  imageContainer: {
    height: '75%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    transform: [{ scale: 1.2 }],
  },
  infoContainer: {
    padding: 10,
    height: '18%',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
  }
})