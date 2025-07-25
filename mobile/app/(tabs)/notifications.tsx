import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'
import useNotifications from '@/hooks/useNotifications'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import NoNotificationFound from '@/Components/NoNotificationFound';
import NotificationCard from '@/Components/NotificationCard';
import { Notification } from '@/types';

const NotificationsScreen = () => {
  const { notifications,deleteNotification,isLoading,
    error,refetch,isRefetching,
  } = useNotifications();

  const insets = useSafeAreaInsets();

  if (error) {
        return(
          <View className='flex-1 justify-center p-8 items-center'>
            <Text className='text-gray-500 mb-4'>Failed to load notification</Text>
            <TouchableOpacity className='bg-blue-500 px-4 py-2 rounded-lg'
            onPress={()=> refetch()}>
              <Text className='text-white font-semibold'>Retry</Text>
            </TouchableOpacity>
          </View>
        )}


  return (
    <SafeAreaView className='flex-1 bg-white' edges={["top"]}
      >
        <View className='flex-row items-center justify-between py-3 px-4 border-b border-gray-100'>
          <Text className='text-gray-900 font-bold text-xl'>Notifications</Text>
          <TouchableOpacity>
            <Feather name='settings' size={24} color={"#657786"} />
          </TouchableOpacity>
      </View>

        {/*  CONTENT  */}
        <ScrollView className='flex-1' 
        contentContainerStyle={{paddingBottom: 100 + insets.bottom }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={"#1DA1F2"} />
        }
        >
        
          { isLoading ? (
          <View className='flex-1 justify-center p-8 items-center'>
            <ActivityIndicator size={"large"} color={"#1DA1F2"} />
            <Text className='text-gray-500 mt-4'>Loading Notifications...</Text>
          </View>
        ) : notifications.length === 0 ? (
          <NoNotificationFound />
        ) : (
          notifications?.map((notification: Notification)=> (
            <NotificationCard 
            key={notification._id}
            notification={notification}
            onDelete={deleteNotification}
            />
          ))
        )}
        </ScrollView>
    </SafeAreaView>
  )
}

export default NotificationsScreen