import { Post } from "@/types";
import { postApi, useApiClient } from "@/utils/api";
import { KEY } from "@/utils/queryKeys";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosInstance, AxiosResponse } from "axios";
import { useCallback } from "react";

type PaginatedPostsResponse = {
  posts: Post[];
  currentPage: number;
  nextPage: number | null;
  hasMore: boolean;
  totalPosts: number;
};

const usePosts = (username?: string) => {
  const api: AxiosInstance = useApiClient();
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useInfiniteQuery<
    AxiosResponse<PaginatedPostsResponse>, // TQueryFnData
    Error, // TError
    Post[], // TData (select output)
    (string | undefined)[], // TQueryKey
    number
  >({
    queryKey: username ? ["userPosts",username] : ["posts"],
    queryFn: ({ pageParam = 1 }) => (username? postApi.getUserPosts(api, username, pageParam, 4) : postApi.getPosts(api, pageParam, 4)),
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasMore ? lastPage.data.nextPage : undefined;
    },
    select: (data) => data.pages.flatMap((page) => page.data.posts),
    initialPageParam: 1,
  });

  const { mutate: likePostMutation } = useMutation({
      mutationFn: (postId: string)=> postApi.likePost(api, postId),
      onSuccess:()=> {
        queryClient.invalidateQueries({queryKey: [KEY.POST]})
        if (username) {
        queryClient.invalidateQueries({ queryKey: ["userPosts",username] });
      }
      },
      onError: (err) => {
          console.error("Failed to like post", err);
      }
  })


const { mutate: deletePostMutation } = useMutation({
    mutationFn: (postId: string) => postApi.deletePost(api, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY.POST] });
      if (username) {
        queryClient.invalidateQueries({ queryKey: ["userPosts",username] });
      }
    },
  });

  const checkIsLiked = useCallback((postLikes: string[], currentUser: any) => {
    return currentUser && postLikes.includes(currentUser._id);
  }, []);

  return {
    posts: data ?? [],
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    refetch,
    toggleLike: (postId: string) => likePostMutation(postId),
    deletePost: (postId: string) => deletePostMutation(postId),
    checkIsLiked,
  };
};

export default usePosts;
