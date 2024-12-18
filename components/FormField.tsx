import { icons } from "@/constants"
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { ClassNameValue } from "tailwind-merge"

interface FormFieldProps{
    title: string,
    value: string,
    placeholder?: string,
    handleChangeText?: (e: any) => void,
    otherStyles: ClassNameValue,
    [ key: string ]: any;
    
}

const capitalize = (placeholder: string) => placeholder.charAt(0).toUpperCase() + placeholder.slice(1);


const FormField = ({ title, value, placeholder = "", handleChangeText = () => {}, otherStyles, ...props }: FormFieldProps) => {

    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium my-3">{title.toLocaleUpperCase()}</Text>
            <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secoundary flex flex-row items-center justify-between text-white">
                <TextInput value={value} style={styles.textInput} cursorColor={"#fff"} placeholder={capitalize(placeholder)} placeholderTextColor={'#7B7B8B'} className="w-full text-base font-pregular"  onChangeText={handleChangeText} secureTextEntry={title === "Password" && !showPassword} {...props}/>

                {title === "Password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image source={!showPassword ? icons.eye : icons.eyeHide}
                        className="w-6 h-6" resizeMode="contain" />
                    </TouchableOpacity>
                )}
                </View>
        </View>
    )
}

export default FormField;


const styles = StyleSheet.create({
 textInput: {
  color: 'green',
 },
});