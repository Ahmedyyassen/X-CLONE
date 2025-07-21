import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import useSocialAuth from "@/hooks/useSocialAuth";

export default function AuthPage() {
  const { isLoading, handleSocialAuth } = useSocialAuth();
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 px-8 justify-between">
        <View className="flex-1 justify-center">
          {/* DEMO IMAGE */}
          <View className="items-center">
            <Image
              source={require("@/assets/images/auth2.png")}
              className="size-96"
              resizeMode="contain"
            />
          </View>

            <View className="flex-col gap-2 ">
                <TouchableOpacity className="flex-row rounded-full py-3 px-6 items-center justify-center border border-gray-300 bg-white"
                onPress={()=> handleSocialAuth("oauth_google")}
                disabled={isLoading}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2,
                }}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#000" />
                  ): (
                  <View className="flex-row items-center justify-center">
                      <Image className="size-10 mr-3" source={require("@/assets/images/google.png")}
                      resizeMode="contain"  />
                      <Text className="text-black font-medium text-base">Continue with Google</Text>
                  </View>
                  )}
                </TouchableOpacity>

                <TouchableOpacity className="flex-row rounded-full py-3 px-6 items-center justify-center border border-gray-300 bg-white"
                onPress={()=> handleSocialAuth("oauth_apple")}
                disabled={isLoading}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2,
                }}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#000" />
                  ): (
                  <View className="flex-row items-center justify-center">
                      <Image className="size-8 mr-3" source={require("@/assets/images/apple.png")}
                      resizeMode="contain"  />
                      <Text className="text-black font-medium text-base">Continue with Apple</Text>
                  </View>
                  )}
                </TouchableOpacity>
            </View>

              <Text className="text-center text-gray-500 text-xs leading-4 mt-6 px-2">
                By signing uo, you agree to our <Text className="text-blue-500">Terms</Text>
                {", "}
                <Text className="text-blue-500">Privacy Policy</Text>
                {", and "}
                <Text className="text-blue-500">Cookie Use</Text>
              </Text>
        </View>
      </View>
    </View>
  );
}
