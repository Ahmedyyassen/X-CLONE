import { useApiClient, userApi } from "@/utils/api";
import { useAuth } from "@clerk/clerk-expo"
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";

const useUserSync = () => {
    const { isSignedIn } = useAuth();
    const api = useApiClient();

    const {mutate, data, isPending} = useMutation({
      mutationFn: async()=> await userApi.syncUser(api),
      onSuccess:(response: AxiosResponse)=> console.log("User synced successfully", response.data.message),
      onError:(error:AxiosError)=> console.error("User sync failed ", error.response?.data),
    })
    useEffect(()=>{
      if (isSignedIn && !data && !isPending) {
        mutate();
      }
    },[data,isSignedIn,mutate, isPending])

  return null
}

export default useUserSync