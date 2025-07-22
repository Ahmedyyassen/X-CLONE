import { Feather } from "@expo/vector-icons"
import { Text, View } from "react-native"

const NoNotificationFound = () => {
  return (
    <View className="flex-1 items-center justify-center px-8" style={{ minHeight: 400 }}>
      <View className="items-center">
        <Feather name="bell" color={"#E1E8ED"} size={80}/>
        <Text className="text-2xl font-semibold text-gray-500 mt-6 mb-3">No notifications yet</Text>
        <Text className="text-gray-400 text-center text-base leading-6 max-w-xs">
          When people like, or follow you, you&apos;all see it here.
          </Text>
      </View>
    </View>
  );
}

export default NoNotificationFound