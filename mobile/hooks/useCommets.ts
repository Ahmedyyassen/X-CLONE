import { commentApi, useApiClient } from "@/utils/api"
import { KEY } from "@/utils/queryKeys";
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
            queryClient.invalidateQueries({queryKey: [KEY.POST]})
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

    const { mutate: deleteCommentMutation } = useMutation({
        mutationFn: async(commentId: string)=> await commentApi.deleteComment(api, commentId),
        onSuccess:()=> {
            queryClient.invalidateQueries({queryKey: [KEY.POST]})
        },
        onError:()=>{
            Alert.alert("Error", "Failed to delete comment. Try again.")
        }
    })

    const deleteComment = (commentId: string)=> {
        Alert.alert("Delete Comment", "Are you sure you want to delete this comment?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: ()=> deleteCommentMutation(commentId) , }
        ])
    }
  return{
    commentText,
    setCommentText,
    createComment,
    isCreateingComment: isPending,
    deleteComment
  }
}

export default useCommets