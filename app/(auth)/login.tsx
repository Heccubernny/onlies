import { CustomButton, FormField } from '@/components'
import { images } from '@/constants'
import { useGlobalContext } from '@/providers/GlobalProvider'
import { getCurrentUser, login } from '@/utils/appwrite'
import { screenHeight } from '@/utils/helpers'
import { Link } from 'expo-router'
import { setStatusBarBackgroundColor } from 'expo-status-bar'
import { FormEventHandler, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface LoginProps{
    email: string,
    password: string,
}
   interface HandleChangeTextEvent {
      (e: string): void;
    }
const Login = () => {

    const { setLoggedInUser } = useGlobalContext();

    const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
    const [ form, setForm ] = useState<LoginProps>({
        email: "",
        password: "",
    })

 

  const handleEmailChangeText: HandleChangeTextEvent = (text: string) => setForm({ ...form, email: text });
  const handlePasswordChangeText: HandleChangeTextEvent = (text: string) => setForm({ ...form, password: text });
    
    const submit = async () => {
        if (form.email === "" || form.password === "") {
            Alert.alert("Error", "Please fill in all fields");
        }

        setIsSubmitting(true);

        try {
            await login(form.email, form.password);
            const user = await getCurrentUser();
            setLoggedInUser(user);

            Alert.alert("Success", "User signed in successfully");
        } catch (error: any) {
            Alert.alert("Login failed", error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

  const placeholder = {
      email: "Enter your email address here ...",
      password: "Enter your password here ..."
  }
  
    return (  
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView>
            <View className="w-full flex justify-center h-full px-4 my-6" style={{minHeight: screenHeight - 100}}>
            <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[34px]"/> 
                    
                    <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">Log in to Onlies</Text>

                    <FormField title="Email" value={form.email} placeholder={placeholder.email} handleChangeText={handleEmailChangeText} otherStyles="mt-7" />
                    <FormField title="Password" value={form.password} placeholder={placeholder.password} handleChangeText={handlePasswordChangeText} otherStyles="mt-7" />

                    <CustomButton title="Login" handlePress={submit} containerStyles='mt-7' isLoading={isSubmitting} />

                    <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/register"
              className="text-lg font-psemibold text-secondary"
            >
              Register
            </Link>
          </View>
            </View>
            </ScrollView>
      </SafeAreaView>

  )
}
export default Login
const styles = StyleSheet.create({})