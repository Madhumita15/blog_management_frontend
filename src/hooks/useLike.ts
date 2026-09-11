import { createLikeUnlike, getMyLike } from "@/app/services/helper/api-function/like.function"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useLike = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["likeunlike"],
        mutationFn: (blogId: string)=> createLikeUnlike(blogId),
        onSuccess: (res)=>{
            toast.success(res?.message)
            queryClient.invalidateQueries({queryKey: ["getAllBlogByUser"]})
            queryClient.invalidateQueries({queryKey: ["getAllBlogByUserById"]})
            queryClient.invalidateQueries({queryKey: ["getMyLike"]})
        },
        onError: (err: string)=>{
            toast.error(err)
        }
    })
}


export const useGetMyLike = () => {
  return useQuery({
    queryKey: ["getMyLike"],
    queryFn: getMyLike,
  });
};