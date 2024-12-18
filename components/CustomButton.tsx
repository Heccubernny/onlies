import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native'
interface CustomButtonProps {
    title: string;
    handlePress: () => void;
    containerStyles?: string;
    textStyles?: string;
    isLoading?: boolean;
}
const CustomButton: React.FC<CustomButtonProps> = ({ title, handlePress, containerStyles = '', textStyles = '', isLoading = false }) => {
  return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.7} className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}>
          <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
              {title.toLocaleUpperCase()}
          </Text>
          {isLoading && (
              <ActivityIndicator animating={isLoading} color="#fff" size="small" className="ml-2"/>
          )}
          </TouchableOpacity>
  )
}
export default CustomButton
const styles = StyleSheet.create({})