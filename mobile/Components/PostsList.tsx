import usePosts from '@/hooks/usePosts'
import { Post } from '@/types';
import { View, Text, ActivityIndicator, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, ScrollView, RefreshControl } from 'react-native'
import PostCard from './PostCard';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useCallback, useRef, useState } from 'react';
import CommentModal from './CommentModal';
import PostComposer from './PostComposer';

const PostsList = () => {

  const { currentUser } = useCurrentUser();
  
  const {
      posts,
      isLoading,
      isFetchingNextPage,
      hasNextPage,
      error,
      refetch,
      checkIsLiked,
      toggleLike,
      deletePost,
      fetchNextPage,
  } = usePosts();

  const [isRefetching, setIsRefetching] = useState(false);

  const handlePullToRefresh = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  }

    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    
    const selectedPost = selectedPostId ? posts.find((p:Post)=> p._id === selectedPostId ) : null;

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

    if (isLoading) {
      return (
        <View className='flex-1 p-8 items-center'>
          <ActivityIndicator size={"large"} color={"#1DA1F2"} />
          <Text className='text-gray-500 mt-2'>Loading posts...</Text>
        </View>
      )}
    if (error) {
      return(
        <View className='flex- p-8 items-center'>
          <Text className='text-gray-500 mb-4'>Failed to load posts</Text>
          <TouchableOpacity className='bg-blue-500 px-4 py-2 rounded-lg'
            onPress={()=> refetch()}>
            <Text className='text-white font-semibold'>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
    if (posts.length === 0) {
      return(
        <View className='p-8 items-center'>
          <Text className='text-gray-500'>No posts yet</Text>
        </View>
      )
    }

  return (
    <>
      <ScrollView className='flex-1'
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}
          onScroll={handleScroll} scrollEventThrottle={16}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={handlePullToRefresh} tintColor={"#1DA1F2"}/>
          }
        >
          <PostComposer image={currentUser?.profilePicture!} />
          
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
    </>
  )
}

export default PostsList;