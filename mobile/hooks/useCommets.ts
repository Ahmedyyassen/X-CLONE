import { commentApi, useApiClient } from "@/utils/api"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Alert } from "react-native";

type Props={
    postId: string;
    content: string;
}
const useCommets = () => {
    
    const [commentText, setCommentText] = useState("")
    const api = useApiClient();
    const queryClient = useQueryClient();    

    const { mutate:createCommentMutation, isPending} = useMutation({
        mutationFn: async({postId, content}:Props)=> {
            const res = await commentApi.createComment(api, postId, content)
            return res.data;
        },
        onSuccess:()=>{
            setCommentText("");
            queryClient.invalidateQueries({queryKey: ["posts"]})
        },
        onError:()=>{
            Alert.alert("Error", "Failed to post comment. Try again.")
        }
    })

    const createComment = (postId: string) => {
        if (!commentText.trim()) {
            Alert.alert("Empty Comment", "Please write something before posting!");
            return;
        }
        createCommentMutation({ postId, content:commentText.trim() })
    }
  return{
    commentText,
    setCommentText,
    createComment,
    isCreateingComment: isPending,
  }
}

export default useCommets