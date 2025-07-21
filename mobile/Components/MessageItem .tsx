import { MessageType } from "@/data/conversations";
import React, { memo } from "react";
import { Image, Text, View } from "react-native";

type Props = { 
  message: MessageType;
  isFromUser: boolean;
  avatar: string;
};

const MessageItem = memo(({ message, isFromUser, avatar }: Props) => {
  const parsedTime = Number(message.time);
  const displayTime = isNaN(parsedTime)
    ? message.time
    : new Date(parsedTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      
  return (
    <View className={`flex-row mb-3 ${isFromUser ? "justify-end" : ""}`}>
      {!isFromUser && (
        <Image source={{ uri: avatar }} className="size-8 rounded-full mr-2" />
      )}
      <View className={`flex-1 ${isFromUser ? "items-end" : ""}`}>
        <View
          className={`rounded-2xl px-4 py-3 max-w-xs ${
            isFromUser ? "bg-blue-500" : "bg-gray-100"
          }`}
        >
          <Text className={`${isFromUser ? "text-white" : "text-gray-900"}`}>
            {message.text}
          </Text>
        </View>
        <Text className="text-xs text-gray-400 mt-1">{displayTime}</Text>
      </View>
    </View>
  );
});

MessageItem.displayName = "MessageItem";

export default MessageItem;
