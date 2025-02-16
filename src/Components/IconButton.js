import { StyleSheet, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react'

export default function IconButton({onPress, name, size}) {
  return (
	<Pressable onPress={onPress}>
	  <MaterialIcons name={name} size={size} color="black" />
	</Pressable>
  )
}

const styles = StyleSheet.create({})