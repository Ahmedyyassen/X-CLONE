import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { Feather } from "@expo/vector-icons";
import { ConversationType } from "@/data/conversations";
import { SafeAreaView } from "react-native-safe-area-context";
import MessageItem from "./MessageItem ";

type Props = {
  closeConversation: () => void;
  sendMessage: () => void;
  newMessage: string;
  setNewMessage: (message: string) => void; 
  selectedConversation: ConversationType;
};

const Chat = ({
  selectedConversation,
  closeConversation,
  newMessage,
  setNewMessage,
  sendMessage,
}: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const isActive = newMessage.trim().length > 0

  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100); // Short delay ensures proper scroll
    return () => clearTimeout(timeout);
  }, [selectedConversation.messages]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.select({ ios: 60, android: 0 })}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
          <TouchableOpacity
            accessibilityLabel="Go back button"
            className="mr-3"
            onPress={closeConversation}
          >
            <Feather name="arrow-left" size={24} color={"#1DA1F2"} />
          </TouchableOpacity>
          <Image
            source={{ uri: selectedConversation.user.avatar }}
            className="size-10 rounded-full mr-3"
          />
          <View className="flex-1">
            <View className="flex-row items-center">
              <Text className="font-semibold text-gray-900 mr-1">
                {selectedConversation.user.name}
              </Text>
              {selectedConversation.user.verified && (
                <Feather name="check-circle" size={16} color={"#1DA1F2"} />
              )}
            </View>
            <Text className="text-gray-500 text-sm">
              @{selectedConversation.user.username}
            </Text>
          </View>
        </View>

        <ScrollView
          className="flex-1 px-4 py-4"
          keyboardShouldPersistTaps="handled"
          ref={scrollRef}
        >
          <View className="mb-4">
            <Text className="text-center text-gray-400 text-sm mb-4">
              This is the beginning of your conversation with{" "}
              {selectedConversation.user.name}
            </Text>

            {selectedConversation.messages.map((message) => (
            <MessageItem key={`${message.id}-${message.time}`}
             avatar={selectedConversation.user.avatar} message={message} isFromUser={message.fromUser}/>
            ))}
          </View>
        </ScrollView>

        <View className="flex-row items-center px-4 py-3 border-t border-gray-100">
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-3 mr-3">
            <TextInput
              accessibilityLabel="Message input field"
              className="flex-1 text-base text-gray-900"
              placeholder="Start a message..."
              placeholderTextColor={"#657786"}
              value={newMessage}
              onChangeText={setNewMessage}
              onSubmitEditing={sendMessage}
              multiline
              style={{ maxHeight: 80 }}
              scrollEnabled={false}
              submitBehavior="blurAndSubmit"
            />
          </View>
          <TouchableOpacity
            onPress={sendMessage}
            className={`size-10 rounded-full items-center justify-center 
                ${isActive ? "bg-blue-500" : "bg-gray-500"}`}
            disabled={!isActive}
          >
            <Feather name="send" size={20} color={"white"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Chat;
