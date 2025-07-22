import { useApiClient } from "@/utils/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { KEY } from "@/utils/queryKeys";

type Post={
    content: string;
    imageUri?: string
}
const useCreatePost = () => {
    const [content, setContent] = useState("");
    const [selectedImage, setSelectedImage] = useState<string| null>(null);
    const api = useApiClient();
    const queryClient = useQueryClient();



    const { mutate, isPending } = useMutation({
        mutationFn: async({content,imageUri}: Post)=> {
        const formData = new FormData();
        if (content) formData.append("content", content);
        if (imageUri) {
            const uriParts = imageUri.split(".");
            const fileType = uriParts[uriParts.length - 1].toLowerCase();

            const mimTypeMap: Record<string, string> = {
                png: "image/png",
                gif: "image/gif",
                webp: "image/webp",
                jpg: "image/jpeg",
            };
            const mimType = mimTypeMap[fileType] || "image/jpeg";
            
            formData.append("image", {
                uri: imageUri,
                name: `image.${fileType}`,
                type: mimType
            } as any);
        }
        return await api.post("/posts", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        },
        onSuccess:()=>{
            setContent("");
            setSelectedImage(null);
            queryClient.invalidateQueries({queryKey: [KEY.POST]});
            Alert.alert("Success", "Post created successfully!");
        },
        onError:()=>{
            Alert.alert("Error", "Failed to create post. Please try again.")
        }
    });

    const handleImagePicker = async(useCamera: boolean = false)=>{
        const permissionResult = useCamera 
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.status !== "granted") {
            const source = useCamera ? "camera" : "photo library";
            Alert.alert("Permission needed", `Please grant permission to access your ${source}`);
            return;
        }

        const pickerOptions = {
            allowsEditing: true,
            aspect: [16, 9] as [number, number],
            quality: 0.8,
        };

        const result = useCamera
        ? await ImagePicker.launchCameraAsync(pickerOptions)
        : await ImagePicker.launchImageLibraryAsync({
            ...pickerOptions,
            mediaTypes: ["images"],
        });

        if (!result.canceled) setSelectedImage(result.assets[0].uri);
    };

    const createPost = useCallback(() => {
        if (!content.trim() && !selectedImage) {
        Alert.alert("Empty Post", "Please write something or add an image before posting!");
        return;
        }
        const postDate: Post={ content: content.trim() }
        if (selectedImage) postDate.imageUri = selectedImage;
        mutate(postDate);
    }, [content, selectedImage, mutate]);

    return {
    content,
    setContent,
    selectedImage,
    isCreating: isPending,
    pickImageFromGallery: () => handleImagePicker(false),
    takePhoto:  () => handleImagePicker(true),
    removeImage:()=> setSelectedImage(null),
    createPost
}
}

export default useCreatePost