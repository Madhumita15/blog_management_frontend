import { axiosInstance } from "@/lib/axiosInstance";
import { getErrorMessage } from "../global.helper";
import { ENDPOINT } from "../endPoint";

export const createLikeUnlike = async(blogId:string)=>{
    try {
        const response = await axiosInstance.post(`${ENDPOINT.like.create}`, {blogId: blogId})
        return response.data
        
    } catch (error) {
        throw getErrorMessage(error);
        
    }

}

export const getMyLike= async()=>{
    try {
        const response = await axiosInstance.get(`${ENDPOINT.like.create}`)
        return response.data
        
    } catch (error) {
        throw getErrorMessage(error);
        
    }

}