import { CurrentUser } from "@/types";
import { useApiClient, userApi } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"


const useCurrentUser = () => {
    const api = useApiClient();

    const { data: currentUser, error, isLoading, refetch } = useQuery<CurrentUser>({
        queryKey: ["authUser"],
        queryFn: async()=> {
          const res= await userApi.getCurrentUser(api);
          return res.data.user;
        },
    })
  return { currentUser, isLoading, error, refetch }
}

export default useCurrentUser