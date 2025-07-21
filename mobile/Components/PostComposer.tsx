import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useUser } from '@clerk/clerk-expo';
import useCreatePost from '@/hooks/useCreatePost';
import { Feather } from '@expo/vector-icons';

const PostComposer = () => {
    const {content,createPost,isCreating,pickImageFromGallery,removeImage,
        selectedImage,setContent,takePhoto} = useCreatePost();
        const { user } = useUser();

    return (
    <View className='p-4 border-b border-gray-100 bg-white'>
        <View className='flex-row'>
            <Image source={{uri: user?.imageUrl}} className='size-12 rounded-full mr-3' />
            <View className='flex-1'>
                <TextInput
                className='text-gray-900 text-lg'
                placeholder="What's happening?"
                placeholderTextColor={"#657786"}
                multiline
                value={content}
                onChangeText={setContent}
                maxLength={280}
                />
                </View>
            </View>
        
        {selectedImage && (
            <View className='mt-3 ml-4'>
                <View className='relative'>
                    <Image
                    source={{uri: selectedImage}}
                    className='w-full h-48 rounded-2xl'
                    resizeMode='cover'
                    />
                    <TouchableOpacity
                    className='absolute top-2 right-2 size-8 bg-black opacity-60 rounded-full
                    items-center justify-center'
                    onPress={removeImage}
                    >
                        <Feather name='x' size={16} color={"white"} />
                    </TouchableOpacity>
                </View>
            </View>
        )}


        <View className='flex-row justify-between items-center mt-3'>
            <View className='flex-row'>
                
                <TouchableOpacity
                accessibilityLabel='Pick image from gallery'
                className='mr-4' onPress={pickImageFromGallery}>
                    <Feather name='image' color={"#1DA1F2"} size={20} />
                </TouchableOpacity>

                <TouchableOpacity
                accessibilityLabel='Take photo'
                onPress={takePhoto}>
                    <Feather name='camera' color={"#1DA1F2"} size={20}/>
                </TouchableOpacity>
            </View>

            <View className='flex-row items-center'>
                {content.length > 0 && (
                <Text 
                    className={`text-sm mr-3 ${content.length > 260 ? "text-red-500" : "text-gray-500"}`}>{280 - content.length}</Text>
                )}
                <TouchableOpacity
                accessibilityLabel='Create post' 
                className={`px-6 py-2 ${content.trim() || selectedImage ? "bg-blue-500" : "bg-gray-300" } rounded-full`}
                onPress={createPost}
                disabled={!(selectedImage || content.trim()) || isCreating}
                >
                    {isCreating ? (
                        <ActivityIndicator size={"small"} color={"white"} />
                    ) : (
                        <Text 
                        className={`font-semibold ${
                            content.trim() || selectedImage ?"text-white": "text-gray-500"}`}>Post</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>

    </View>
)
}

export default PostComposer