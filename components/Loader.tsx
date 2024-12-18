import { screenHeight } from "@/utils/helpers";
import { ActivityIndicator, Platform, View } from "react-native"

const Loader = (isLoading : any) => {
    const osName = Platform.OS;


    if (!isLoading) return null;

    return (
        <View className="absolute flex justify-center items-center w-full h-full bg-primary/60 z-10" style={{height: screenHeight}}>
            <ActivityIndicator animating={isLoading} color="#fff" size={osName === "ios" ? "large" : 50} />
            
        </View>
    )
}

export default Loader;