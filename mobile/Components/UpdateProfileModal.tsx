import { View, Text, Modal, TouchableOpacity, ActivityIndicator, ScrollView, TextInput } from 'react-native'

type EditProfileProps={
    isVisible:boolean
    onClose:()=> void
    formData:{
        firstName:string,
        lastName: string,
        bio:string,
        location: string,
    };
    saveProfile:()=> void
    updateFormFiled:(filed: string, value: string) => void;
    isUpdating: boolean;
}
const UpdateProfileModal = ({formData,isUpdating,isVisible,onClose,saveProfile,updateFormFiled}:EditProfileProps) => {
    
    const handleSave = () => {
        saveProfile();
        onClose();
    }
  return (
    <Modal visible={isVisible} animationType='slide' presentationStyle='pageSheet'>
        <View className='flex-row justify-between items-center px-4 py-3 border-b border-gray-100'>
            <TouchableOpacity onPress={onClose}>
                <Text className='text-lg text-blue-500'>Close</Text>
            </TouchableOpacity>
            <Text className='text-lg font-semibold text-gray-900'>Edit Profile</Text>
               <TouchableOpacity onPress={handleSave}
                disabled={isUpdating}
                className={`${isUpdating ? "opacity-50" : ""}`}
                >
                { isUpdating ? (
                    <ActivityIndicator size={"small"} color={"#1DA1F2"} />
                ) : (
                    <Text className='text-lg text-blue-500 font-semibold'>Save</Text>
                ) }
            </TouchableOpacity>
        </View>

        <ScrollView className='flex-1 px-4 py-6'>
            <View className='space-y-4'>

                <View>
                    <Text className='text-gray-500 text-sm mb-2'>First Name</Text>
                    <TextInput 
                    className='border border-gray-200 rounded-lg p-3 text-base'
                    value={formData.firstName}
                    onChangeText={(text)=> updateFormFiled("firstName", text)}
                    placeholder='Your first name'
                    placeholderTextColor={"#657786"}
                    />
                    </View>
                <View>
                    <Text className='text-gray-500 text-sm mb-2'>Last Name</Text>
                    <TextInput 
                    className='border border-gray-200 rounded-lg p-3 text-base'
                    value={formData.lastName}
                    onChangeText={(text)=> updateFormFiled("lastName", text)}
                    placeholder='Your last name'
                    placeholderTextColor={"#657786"}
                    />
                    </View>
                <View>
                    <Text className='text-gray-500 text-sm mb-2'>Bio</Text>
                    <TextInput 
                    className='border border-gray-200 rounded-lg p-3 text-base'
                    value={formData.bio}
                    onChangeText={(text)=> updateFormFiled("bio", text)}
                    placeholder='Tell us about yourself'
                    placeholderTextColor={"#657786"}
                    multiline
                    numberOfLines={3}
                    textAlignVertical='top'
                    />
                    </View>
                <View>
                    <Text className='text-gray-500 text-sm mb-2'>Location</Text>
                    <TextInput 
                    className='border border-gray-200 rounded-lg p-3 text-base'
                    value={formData.location}
                    onChangeText={(text)=> updateFormFiled("location", text)}
                    placeholder='Where are you located?'
                    placeholderTextColor={"#657786"}
                    />
                </View>
            </View>
        </ScrollView>

      <Text>UpdateProfileModal</Text>
    </Modal>
  )
}

export default UpdateProfileModal