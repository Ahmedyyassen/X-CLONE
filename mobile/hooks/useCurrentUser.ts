import { useApiClient, userApi } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"


const useCurrentUser = () => {
    const api = useApiClient();

    const { data: currentUser, error, isLoading, refetch } = useQuery({
        queryKey: ["authUser"],
        queryFn: async()=> await userApi.getCurrentUser(api),
        select: (response)=> response.data.user,
    })
  return { currentUser, isLoading, error, refetch }
}

export default useCurrentUser