import { View, Text } from 'react-native'
import React from 'react'
import SignOutButton from '@/Components/SignOutButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import PostsList from '@/Components/PostsList'

const HomeScreen = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
        <View className='flex-row items-center justify-between py-3 px-4 border-b border-gray-100'>
          <Ionicons name='logo-twitter' color={"#1DA1F2"} size={24} />
          <Text className='text-gray-900 font-bold text-xl'>Home</Text>
          <SignOutButton />
      </View>

        <PostsList />

    </SafeAreaView>
  )
}

export default HomeScreen