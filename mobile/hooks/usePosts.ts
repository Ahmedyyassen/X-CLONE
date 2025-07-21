import { postApi, useApiClient } from "@/utils/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react";


const usePosts = () => {
    const api = useApiClient();
    const queryClient = useQueryClient();

    const { data:postsData, isLoading, error, refetch  } = useQuery({
        queryKey: ["posts"],
        queryFn: ()=> postApi.getPosts(api),
        select: (response)=> response.data.posts,
    })

    const { mutate: likePostMutation } = useMutation({
        mutationFn: (postId: string)=> postApi.likePost(api, postId),
        onSuccess:()=> queryClient.invalidateQueries({queryKey: ["posts"]}),
        onError: (err) => {
            console.error("Failed to like post", err);
        }
    })

    const { mutate: deletePostMutation } = useMutation({
        mutationFn: (postId: string)=> postApi.deletePost(api, postId),
        onSuccess:()=> {
            queryClient.invalidateQueries({queryKey: ["posts"]})
            queryClient.invalidateQueries({queryKey: ["userPosts"]})
        }
    })
    const checkIsLiked = useCallback((postLikes: string[], currentUser: any) => {
    return currentUser && postLikes.includes(currentUser.id);
    }, []);


    return {
    posts: postsData || [],
    isLoading,
    error,
    refetch,
    toggleLike: (postId: string)=> likePostMutation (postId),
    deletePost: (postId: string)=> deletePostMutation (postId),
    checkIsLiked,
}
}

export default usePosts