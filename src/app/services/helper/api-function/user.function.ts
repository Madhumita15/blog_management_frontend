import { axiosInstance } from "@/lib/axiosInstance"
import { getErrorMessage } from "../global.helper"
import { ENDPOINT } from "../endPoint"

export const getProfile = async()=>{
    try {
        const response = await axiosInstance.get(`${ENDPOINT.user.profile}`)
        return response.data
        
    } catch (error) {
        throw getErrorMessage(error)
        
    }
}