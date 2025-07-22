import { View, Text, ActivityIndicator, ScrollView, RefreshControl, Image, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useCurrentUser from '@/hooks/useCurrentUser'
import SignOutButton from '@/Components/SignOutButton'
import { Feather } from '@expo/vector-icons'
import PostCard from '@/Components/PostCard'
import usePosts from '@/hooks/usePosts'
import { Post } from '@/types'
import CommentModal from '@/Components/CommentModal'
import useProfile from '@/hooks/useProfile'
import UpdateProfileModal from '@/Components/UpdateProfileModal'

const ProfileScreen = () => {
  const { currentUser } = useCurrentUser();

  const {
      posts,
      isLoading,
      isFetchingNextPage,
      hasNextPage,
      refetch,
      checkIsLiked,
      toggleLike,
      deletePost,
      fetchNextPage,
  } = usePosts(currentUser?.username);

      const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
      const selectedPost = selectedPostId ? posts.find((p:Post)=> p._id === selectedPostId ) : null;
        
      const [isRefetching, setIsRefetching] = useState(false);

      const isThrottled = useRef(false);
      const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const distanceFromBottom = contentSize.height - (layoutMeasurement.height + contentOffset.y);

        if (distanceFromBottom < 100 && hasNextPage && !isFetchingNextPage && !isThrottled.current) {
          isThrottled.current = true;
          fetchNextPage().finally(() => {
            setTimeout(() => {
              isThrottled.current = false;
            }, 500); // Prevent spamming
          });
        }
      }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

      const { formData,openEditModal,closeEditModal,isEditModalVisible,
        isUpdateing,refetch:refrechProfile,saveProfile,updateFormFiled } = useProfile();

      const handlePullToRefresh = async () => {
          setIsRefetching(true);
          await refrechProfile();
          await refetch();
          setIsRefetching(false);
        }

      if (isLoading) {
        return (
          <View className='flex-1 p-8 items-center justify-center'>
            <ActivityIndicator size={"large"} color={"#1DA1F2"} />
          </View>
        )}
  return (
    <SafeAreaView className='flex-1 bg-white'>
      {/* PROFILE HEADER */}
      <View className='flex-row justify-between items-center py-3 px-4 border-b border-gray-100'>
        <View>
          <Text className='font-bold text-xl text-gray-900'>
            {currentUser?.firstName} {currentUser?.lastName}
            </Text>
          <Text className='text-gray-500 text-sm'>{posts.length} Posts</Text>
        </View>
        <SignOutButton />
      </View>

      <ScrollView className='flex-1'
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10 }}
          onScroll={handleScroll} scrollEventThrottle={16}
          refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={handlePullToRefresh}
            colors={["#1DA1F2"]} tintColor={"#1DA1F2"}/>
          }
      >
        {/* BANNER IMAGE */}
      {currentUser?.bannerImage ? (
              <Image source={{uri: currentUser?.bannerImage}}
              className='w-full h-48'
              resizeMode='cover' />
        ) : (
          <View className='w-full h-48 bg-gray-300'/>
        )}
        {/* USER INFORAMTION */}
        <View className='px-4 pb-4 border-b border-gray-100'>
          <View className='flex-row justify-between items-end -mt-16 mb-4'>
            <Image
              source={{uri: currentUser?.profilePicture}}
              className='size-32 rounded-full border-4 border-white'
              resizeMode='cover'
              />
              <TouchableOpacity
              onPress={openEditModal} 
              className='border border-gray-300 px-6 py-2 rounded-full'>
                <Text className='font-semibold text-gray-900'>Edit profile</Text>
              </TouchableOpacity>
          </View>

            <View className='mb-4'>
              <View className='flex-row items-center mb-1'>
                <Text className='font-bold text-xl text-gray-900 mr-1'>
                  {currentUser?.firstName} {currentUser?.lastName}
                </Text>
                  <Feather name='check-circle' size={16} color={"#1DA1F2"} className='ml-1' />
              </View>
              <Text className='text-gray-500 mb-2'>@{currentUser?.email}</Text>
                <Text className='text-gray-500 mb-3'>{currentUser?.bio || "No bio available"}</Text>
                <View className='flex-row items-center mb-2'>
                  <Feather name='map-pin' size={16} color={"#657786"} />
                    <Text className='text-gray-500 ml-2'>{currentUser?.location || "Location not specified"}</Text>
                </View>

              <View className='flex-row items-center mb-3'>
                <Feather name='calendar' size={16} color={"#657786"} />
                  <Text className='text-gray-500 ml-2'>Joined { new Date(currentUser?.createdAt!).toDateString() }</Text>
              </View>

              <View className='flex-row'>
                <TouchableOpacity className='mr-6'>
                  <Text className='text-gray-900'>
                    <Text className='font-bold'>{currentUser?.following?.length}</Text>
                    <Text className='text-gray-500'>Following</Text>
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className='mr-6'>
                  <Text className='text-gray-900'>
                    <Text className='font-bold '>{currentUser?.followers?.length}</Text>
                    <Text className='text-gray-500'>Followers</Text>
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
        </View>
          
          {/* USER POSTS */}

            {posts.map((post:Post)=>(
            <PostCard key={post._id}
            post={post}
            onLike={toggleLike}
            onDelete={deletePost}
            currentUser={currentUser!}
            isLiked={checkIsLiked(post.likes, currentUser)}
            onComment={(post: Post)=> setSelectedPostId(post._id)}
              />
          ))}

          {isFetchingNextPage && (
              <View className='mt-4 items-center'>
                <ActivityIndicator size="small" color="#1DA1F2" />
              </View>
            )}
      </ScrollView>
          <CommentModal selectedPost={selectedPost}  onClose={()=> setSelectedPostId(null) } />
            <UpdateProfileModal 
            isVisible={isEditModalVisible}
            onClose={closeEditModal}
            formData={formData}
            saveProfile={saveProfile}
            updateFormFiled={updateFormFiled}
            isUpdating={isUpdateing}
            />
    </SafeAreaView>
  )
}

export default ProfileScreen