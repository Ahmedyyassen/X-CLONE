import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert, Image, Modal } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { CONVERSATIONS, ConversationType } from '@/data/conversations'
import Chat from '@/Components/Chat'



const MessagesScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");
  const [conversationsList, setConversationsList] = useState(CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] = useState<ConversationType|null>(null);
  const [isChateOpen, setIsChateOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const newMsg ={
    id: Date.now(),
    text: newMessage.trim(),
    fromUser: true,
    time: String(Date.now()),
    timestamp: new Date()
  }

  const deleteConversation = (conversationId: number)=>{
      Alert.alert("Delete Conversation", "Are you sure you want to delete this conversation?", [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", 
                  onPress: ()=> {
                    setConversationsList((prev)=> prev.filter((conv)=> conv.id !== conversationId ))
                  } },
            ]);
  }
  const openConversation = (conversation: ConversationType)=>{
    setSelectedConversation(conversation);
    setIsChateOpen(true);
  }
  const sendMessage = () => {
    if (newMessage && selectedConversation) {
      // update last message in conversation
      setConversationsList((prev)=>
      prev.map((conv)=>
      conv.id === selectedConversation.id 
      ? {
        ...conv,
        lastMessage: newMessage.trim(),
        time: "now",
        timestamp: new Date(),
        messages: [...conv.messages, newMsg ]
      } 
        : conv
        )
      );

      setSelectedConversation((prev)=> 
      prev ? {...prev, messages: [...prev.messages , newMsg]} : null 
    )
      setNewMessage("");
      // Alert.alert("Message Sent!", `Your message sent to ${selectedConversation.user.name}`)
    }
  }
  const closeConversation = ()=>{
    setSelectedConversation(null);
    setIsChateOpen(false);
    setNewMessage("");
  }
  
  return (
    <SafeAreaView className='flex-1 bg-white' edges={["top"]}>
        <View className='flex-row justify-between items-center mb-4 px-4 py-3 border-b border-gray-100'>
          <Text className='text-xl font-bold text-gray-900'>Messages</Text>
          <TouchableOpacity>
            <Feather name='edit' color={"#1DA1F2"} size={24} />
          </TouchableOpacity>
        </View>

          <View className='px-4 py-3 border-b border-gray-100'>
            <View className='flex-row items-center bg-gray-100 rounded-full px-4 py-3'>
              <Feather name='search' size={20} color={"#657786"} />
              <TextInput placeholder='Search for people and groups'
              className='flex-1 ml-3 text-base'
              placeholderTextColor={"#657786"}
              value={searchText}
              onChangeText={setSearchText}
              />
            </View>
          </View>
    
          <ScrollView className='flex-1'
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}>
            {conversationsList.map((item)=>(
              <TouchableOpacity key={item.id} 
              className='flex-row items-center p-4 border-b border-gray-50 active:bg-gray-50'
              onPress={()=> openConversation(item)}
              onLongPress={()=> deleteConversation(item.id)} >

                  <Image resizeMode='contain' source={{uri: item.user.avatar}}
                    className='rounded-full size-12 mr-3'  />

                  <View className='flex-1'>
                    <View className='flex-row items-center justify-between mb-1'>
                      <View className='flex-row items-center gap-1'>
                        <Text className='font-semibold text-gray-900'>{item.user.name}</Text>
                        {item.user.verified && (
                          <Feather name='check-circle' size={16} color={"#1DA1F2"} className='ml-1' />
                        )}
                        <Text className='text-gray-500 text-sm ml-1'>@{item.user.username}</Text>
                      </View>
                      <Text className='text-gray-500 text-sm'>{item.time}</Text>
                    </View>

                    <Text className='text-gray-500 text-sm' numberOfLines={1}>{item.lastMessage}</Text>
                    
                  </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View className='px-4 py-2 border-t border-gray-100 bg-gray-50'>
            <Text className='text-xs text-gray-500 text-center'>
              Tap to open * Long press to delete
            </Text>
          </View>

          <Modal visible={isChateOpen} animationType='slide' presentationStyle='pageSheet'>
            {
              selectedConversation && (
                <Chat 
                closeConversation={closeConversation}
                selectedConversation={selectedConversation}
                setNewMessage={(message: string)=> setNewMessage(message)}
                newMessage={newMessage}
                sendMessage={sendMessage}/>
              )
            }
          </Modal>
        </SafeAreaView>
  )
}

export default MessagesScreen