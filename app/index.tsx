import { CustomButton } from '@/components'
import { images } from '@/constants'
import { Link, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {useQuery} from '@tanstack/react-query';

const App = () => {
  const height = Platform.OS === "windows" ? "10%" : "100%";
    const osName = Platform.OS;

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* <StatusBar backgroundColor='#161622' style="light"/> */}
      <ScrollView contentContainerStyle={{ height: osName === "android" || "ios" ? "10%" : "100%" }}>
        
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image source={images.logo2} className="w-[130px] h-[840px]" resizeMode="contain" />
          <Image source={images.cards} className="max-w-[380px] w-full h-[298px]" resizeMode="contain" />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">

              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className='text-secondary-200'>Onlies</Text>
            </Text>
          </View>
          

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration With Onlies 
          </Text>

          <CustomButton title="Continue with Email" handlePress={() => router.push('/login')} containerStyles='w-full mt-7'/>      
        </View>
      </ScrollView>
      </SafeAreaView>
  )
}
export default App
const styles = StyleSheet.create({})