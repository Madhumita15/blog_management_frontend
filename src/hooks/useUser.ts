import { getProfile } from "@/app/services/helper/api-function/user.function"
import { useQuery } from "@tanstack/react-query"

export const useGetProfile = (enabled: boolean)=>{
    return useQuery({
        queryKey: ["getProfile"],
        queryFn: getProfile,
        enabled
    })

}