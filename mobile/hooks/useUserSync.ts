import { useApiClient, userApi } from "@/utils/api";
import { useAuth } from "@clerk/clerk-expo"
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect } from "react";

const useUserSync = () => {
    const { isSignedIn } = useAuth();
    const api = useApiClient();

    const {mutate, data} = useMutation({
      mutationFn: ()=> userApi.syncUser(api),
      onSuccess:(response: AxiosResponse)=> console.log("User synced successfully", response.data.user),
      onError:(error)=> console.error("User sync failed ", error),
    })
    useEffect(()=>{
      if (isSignedIn && !data ) {
        mutate();
      }
    },[data,isSignedIn,mutate])

  return null
}

export default useUserSync