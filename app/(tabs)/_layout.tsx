import { useGlobalContext } from '@/providers/GlobalProvider'
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, Tabs } from 'expo-router';
import { icons } from '@/constants';
import { Loader } from '@/components';
const TabIcon = ({ icon, color, name, focused }: { icon: any, color: string, name: string, focused: boolean }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image source={icon} style={{ tintColor: focused ? "white" : "gray" }} tintColor={color} resizeMode='contain' className="w-6 h-6" />
      <Text className={`text-xs ${focused ? "text-white font-psemibold" : "text-gray-100 font-pregular"}`} style={{ color: color }}>{name}</Text>
    </View>
  );
};


const TabsLayout = () => {
  const {loading, loggedInUser, setLoggedInUser} = useGlobalContext();
  if (!loading && !loggedInUser) return <Redirect href="/login" />;

  const screenOptions = {
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor: "#161622",
      borderTopWidth: 1,
      height: 84,
      borderTopColor: "#232533"
    },
    tabBarActiveTintColor: "#FFA001",
    tabBarInactiveTintColor: "#CDCDE0"
  }

 
const tabOptions = ({ title, icon, color, focused }: { title: string, icon: any, color: string, focused: boolean }) => {
  return {
    title: title,
    headerShown: false,
    tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
      <TabIcon icon={icon} color={color} name={title} focused={focused} />
    ),
  };
};
  
  return (
    <React.Fragment>
      <Tabs screenOptions={screenOptions}>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Bookmark"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
      {/* <Loader isLoading={loading}/> */}
    </React.Fragment>
    )
}
export default TabsLayout
const styles = StyleSheet.create({})