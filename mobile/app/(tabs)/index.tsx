import { View, Text } from 'react-native'
import React from 'react'
import SignOutButton from '@/Components/SignOutButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import useUserSync from '@/hooks/useUserSync'

const HomeScreen = () => {
  useUserSync()
  return (
    <SafeAreaView className='flex-1'>
        <View>
          <Text>HomeScreen</Text>
          <SignOutButton />
      </View>

    </SafeAreaView>
  )
}

export default HomeScreen