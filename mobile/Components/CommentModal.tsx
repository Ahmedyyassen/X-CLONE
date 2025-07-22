import { View, Text, Modal, TouchableOpacity, ScrollView, Image, TextInput, ActivityIndicator, Alert } from 'react-native'
import { Post } from '@/types'
import useCommets from '@/hooks/useCommets'
import { Feather } from '@expo/vector-icons'
import useCurrentUser from '@/hooks/useCurrentUser'

type Props={
    selectedPost: Post | null | undefined
    onClose: ()=> void
}
const CommentModal = ({selectedPost, onClose}: Props) => {
    const {commentText,setCommentText,createComment,isCreateingComment, deleteComment} = useCommets();
    const { currentUser } = useCurrentUser();

    const handleClose = () => {
        onClose();
        setCommentText("");
    }

  return (
    <Modal visible={!!selectedPost} animationType='slide' presentationStyle='pageSheet'>
        <View className='flex-row justify-between items-center px-4 py-3 border-b border-gray-100'>
            <TouchableOpacity onPress={handleClose}>
                <Text className='text-lg text-blue-500'>Close</Text>
            </TouchableOpacity>
            <Text className='text-lg font-semibold text-gray-900'>Comments</Text>
            <Text className='w-12' />
        </View>

        {selectedPost && (
            <ScrollView className='flex-1'>
                <View className='border-b border-gray-100 bg-white p-4'>
                <View className='flex-row'>
                        <Image source={{uri: selectedPost.user.profilePicture || ""}} resizeMode='cover'
                        className='size-12 rounded-full mr-3' />
                        <View className='flex-1'>
                            <View className='flex-row items-center mb-1'>
                                <View className='flex-row items-center'>
                                    <Text className='font-bold text-gray-900 mr-1'>
                                        {selectedPost.user.firstName} {selectedPost.user.lastName}
                                    </Text>
                                    <Text className='text-gray-500 text-sm ml-1'>
                                        @{selectedPost.user.username}
                                    </Text>
                                </View>
                            </View>
                            
                            {selectedPost.content && (
                                <Text className='text-gray-900 text-base leading-5 mb-3'>{selectedPost.content}</Text>
                            )}
                
                            {selectedPost.image && (
                                <Image source={{uri: selectedPost.image}}
                                className='w-full h-48 rounded-2xl mb-3'
                                resizeMode='cover'/>
                            )}
                        </View>
                    </View>
            </View>

            {/* Comment LIST */}
            {selectedPost.comments?.map((comment)=>(
                <View key={comment._id} className='border-b border-gray-100 bg-white p-4'>
                    <View className='flex-row'>
                        <Image source={{uri: comment.user.profilePicture || ""}} resizeMode='cover'
                        className='size-10 rounded-full mr-3' />
                        <View className='flex-1'>
                            <View className='flex-row items-center justify-between mb-1' >
                                <View className='flex-row items-center '>
                                        <Text className='font-bold text-gray-900 mr-1'>
                                            {selectedPost.user.firstName} {selectedPost.user.lastName}
                                        </Text>
                                        <Text className='text-gray-500 text-sm ml-1'>
                                            @{selectedPost.user.username}
                                        </Text>
                                </View>
                                {comment.user._id === currentUser._id && (
                                    <TouchableOpacity onPress={()=> deleteComment(comment._id) }>
                                        <Feather name='trash' size={20} color={"#657786"} />
                                    </TouchableOpacity>
                                )}
                            </View>
                                    <Text className='text-gray-900 text-base leading-5 mb-2'>{comment.content}</Text>
                        </View>
                    </View>
                </View>
            ))}

            {/* ADD COMMENT INPUT */}

            <View className='border-b border-gray-100 bg-white p-4'>
                <View className='flex-row'>
                        <Image source={{uri: currentUser?.profilePicture || ""}} resizeMode='cover'
                        className='size-10 rounded-full mr-3' />

                        <View className='flex-1'>
                            <TextInput
                            className='border border-gray-200 rounded-lg p-3 mb-3 text-base'
                            value={commentText}
                            placeholder="Write a comment..."
                            placeholderTextColor={"#657786"}
                            onChangeText={setCommentText}
                            multiline
                            numberOfLines={3}
                            textAlignVertical='top'
                            />

                            <TouchableOpacity className={`px-4 py-2 rounded-lg self-start ${
                                commentText.trim() ? "bg-blue-500" : "bg-gray-300"}`}
                                onPress={()=> createComment(selectedPost._id)}
                                disabled={isCreateingComment || !commentText.trim()}
                                >
                                    {isCreateingComment ? (
                                        <ActivityIndicator size={"small"} color={"white"} />
                                    ) : (
                                        <Text className={`font-semibold ${
                                            commentText.trim() ? "text-white" : "text-gray-500"}`}>
                                                Reply
                                            </Text>
                                    )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )}
    </Modal>
  )
}

export default CommentModal