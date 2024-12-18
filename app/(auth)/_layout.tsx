import { Loader } from '@/components'
import GlobalProvider, { useGlobalContext } from '@/providers/GlobalProvider'
import { Redirect, Stack } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
const AuthLayout = () => {
  const { loading, loggedInUser } = useGlobalContext();
    if (!loading && loggedInUser) return <Redirect href="/" />;
  return (

    <React.Fragment>
          <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{headerShown: false}} />  
          
      </Stack>
          {/* <Loader isLoading={loading}/> */}
  

      </React.Fragment>
  )
}
export default AuthLayout
const styles = StyleSheet.create({})