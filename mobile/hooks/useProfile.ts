import { useApiClient, userApi } from "@/utils/api"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCurrentUser from "./useCurrentUser";
import { useState } from "react";
import { KEY } from "@/utils/queryKeys";
import { Alert } from "react-native";


const useProfile = () => {
    const api = useApiClient();
    const queryClient = useQueryClient();
    const { currentUser } = useCurrentUser();
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        bio: "",
        location: "",
    });

    const { mutate: updateProfileMutation, isPending } = useMutation({
        mutationFn:(profileDate: any)=> userApi.updateProfile(api, profileDate),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey: [KEY.AUTHUSER]});
            setIsEditModalVisible(false);
            Alert.alert("Success", "Profile updated successfully");
        },
        onError:()=>{
            Alert.alert("Failed", "Failed to updated profile")
        }
    });

    const openEditModal = () => {
        if (currentUser) {
            setFormData({
                firstName: currentUser.firstName || "",
                lastName: currentUser.lastName || "",
                bio: currentUser.bio || "",
                location: currentUser.location || "",
            });
        }
        setIsEditModalVisible(true);
    }
    const updateFormFiled = (filed: string, value: string)=> {
        setFormData((prev)=> ({...prev, [filed]: value}))
    }
return {
    isEditModalVisible,
    formData,
    openEditModal,
    closeEditModal: ()=> setIsEditModalVisible(false),
    saveProfile: ()=> updateProfileMutation(formData),
    updateFormFiled,
    isUpdateing: isPending,
    refetch: ()=> queryClient.invalidateQueries({queryKey:[KEY.AUTHUSER]})
  }
}

export default useProfile