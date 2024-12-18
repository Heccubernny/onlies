import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useGlobalContext } from "@/providers/GlobalProvider";
import useAppWrite from "@/hooks/useAppWrite";
import { getCreatorPosts, logout } from "@/utils/appwrite";
// import { EmptyState, InfoBox, VideoCard } from "@/components";
// import { icons } from "@/constants";

 interface PostItem {
      $id: string;
      title: string;
      thumbnail: string;
      video: string;
      creator: {
          username: string;
          avatar: string;
      };
  }

const Profile = () => {
  const { loading, loggedInUser, setLoggedInUser } = useGlobalContext();
  
  if (!loggedInUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>User not logged in</Text>
      </View>
    );
  }

  const { data } = useAppWrite(() => getCreatorPosts(loggedInUser.$id));

  
  const signout = async () => {
    await logout();
    setLoggedInUser(null);

    router.replace("/login");
  };

 
  

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* <FlatList
        data={data}
        keyExtractor={(item) => item.$id.toString()}
        // renderItem={({ item }) => (
        //   <VideoCard
        //     title={item.title}
        //     thumbnail={item.thumbnail}
        //     video={item.video}
        //     creator={item.creator.username}
        //     avatar={item.creator.avatar}
        //   />
        // )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={data.length.toString() || "0"}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
      /> */}
    </SafeAreaView>
  );
};

export default Profile;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  message: {
    fontSize: 18,
    color: 'red',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});