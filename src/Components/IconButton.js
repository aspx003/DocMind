import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Pressable } from 'react-native';

export default function IconButton({onPress, name, size, color}) {
  return (
	<Pressable onPress={onPress}>
	  <MaterialIcons name={name} size={size} color={color} />
	</Pressable>
  )
}