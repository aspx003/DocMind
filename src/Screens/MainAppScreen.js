import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { jwtDecode } from 'jwt-decode';
import { checkTokenValidity } from '../Utils/general/tokenUtility';
import { removeAuth } from '../state/authSlice';

export default function MainAppScreen({navigation}) {

	const dispatch = useDispatch();

	const user = useSelector(state => state.auth.user);
	const decoded = jwtDecode(JSON.parse(user._j).access_token);

  return (
	<View>
	  <Text>{user.email}</Text>
	  <Button title='Logout' onPress={() => dispatch(removeAuth())} />
	</View>
  )
}

const styles = StyleSheet.create({})