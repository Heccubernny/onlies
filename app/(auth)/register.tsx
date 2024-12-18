import { CustomButton, FormField } from '@/components'
import { images } from '@/constants'
import { useGlobalContext } from '@/providers/GlobalProvider'
import { createUser } from '@/utils/appwrite'
import { windowHeight } from '@/utils/helpers'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const Register = () => {
  const placeholder = {
    username: "Enter your username",
    email: "Enter your email address",
    password: "Enter your password"
  }

  const {setLoggedInUser, loggedInUser} = useGlobalContext();

    const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);

  interface RegisterProps{
    email: string,
    username: string,
    password: string
  }

  const [ form, setForm ] = useState<RegisterProps>({
          email: "",
          username: "",
          password: "",
      })
  
      interface HandleChangeTextEvent {
        (e: string): void;
      }
  
    const handleEmailChangeText: HandleChangeTextEvent = (e) => setForm({ ...form, email: e });
    const handleUsernameChangeText: HandleChangeTextEvent = (e) => setForm({ ...form, username: e });
    const handlePasswordChangeText: HandleChangeTextEvent = (e) => setForm({ ...form, password: e });
      
      const submit = async () => {
          if (form.email === "" || form.username === "" || form.password === "") {
              Alert.alert("Error", "Please fill in all fields");
          }
  
          setIsSubmitting(true);
  
          try {
              const result = await createUser(form.email, form.password, form.username);
              setLoggedInUser(result);
            router.replace("/");
  
              Alert.alert("Success", "User account created successfully");
          } catch (error: any) {
              Alert.alert("Error", error.message);
          } finally {
              setIsSubmitting(false);
          }
      }
  
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center h-full px-4 my-6" style={{ minHeight: windowHeight - 100 }}>
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[34px]" />
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Register to Onlies
          </Text>
          <FormField title="Username" placeholder={ placeholder.username} value={form.username} otherStyles="mt-7" handleChangeText={handleUsernameChangeText}  />
         <FormField title="Email" placeholder={ placeholder.email} value={form.email} otherStyles="mt-7" keyboardType="email-address" handleChangeText={handleEmailChangeText}  />
          <FormField title="Password" placeholder={placeholder.password} value={form.password} otherStyles="mt-7" handleChangeText={handlePasswordChangeText} />
          <CustomButton title="Register" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting} />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/login"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default Register
const styles = StyleSheet.create({})