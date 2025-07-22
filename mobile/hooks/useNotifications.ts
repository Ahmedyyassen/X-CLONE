import { notificationApi, useApiClient } from "@/utils/api"
import { KEY } from "@/utils/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";


const useNotifications = () => {
    const api = useApiClient();
    const queryClient = useQueryClient();

    const { data: notificationsData, isLoading, error, refetch, isRefetching } = useQuery({
        queryKey: [KEY.NOTIFICATIONS],
        queryFn: async()=> await notificationApi.getNotifications(api),
        select: (response)=> response.data.notifications,
    });

    const { mutate: deleteNotificationMutation } = useMutation({
        mutationFn: async(notificationId: string)=> 
            await notificationApi.deleteNotification(api, notificationId),
        onSuccess:()=> queryClient.invalidateQueries({queryKey: [KEY.NOTIFICATIONS]}),
        onError: ()=>{
            Alert.alert("Error", "Failed to delete notification. Try again.")
        }
    })

    const deleteNotification = (notificationId: string)=> {
        Alert.alert("Delete Notification", "Are you sure you want to delete this notification?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: ()=> 
                deleteNotificationMutation(notificationId), }
        ])
    }
    
return{
    notifications: notificationsData || [],
    isLoading,
    error,
    refetch,
    isRefetching,
    deleteNotification,
}
}

export default useNotifications