import { VideoCard } from "@/components"
import useAppWrite from "@/hooks/useAppWrite"
import { getAllPosts, getLatestPosts } from "@/utils/appwrite"
import { useState } from "react"
import { FlatList, View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Home = () => {

    const { data: posts, refetch } = useAppWrite(getAllPosts);
    const { data: latestPosts } = useAppWrite(getLatestPosts);

    const [ refreshing, setRefreshing ] = useState<boolean>(false);
    
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

    return (
        <SafeAreaView className="bg-primary">
            {/* <FlatList data={posts} keyExtractor={(item) => item.$id} renderItem={({ item }) => (
                <VideoCard title={""} creator={""} avatar={""} thumbnail={""} video={""}  />
            )} /> */}
            {/* VideoCard */}
            <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
                <Text>Home</Text>
                </View>


            </SafeAreaView>
    )
}