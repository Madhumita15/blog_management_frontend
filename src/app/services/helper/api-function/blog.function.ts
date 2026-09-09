import { axiosInstance } from "@/lib/axiosInstance";
import { ENDPOINT } from "../endPoint";
import { getErrorMessage } from "../global.helper";


export const getAllBlogByAdmin = async () => {
  try {
    const response = await axiosInstance.get(`${ENDPOINT.blog.adminBlogs}`);
    return response.data;
  } catch (error) {
    throw getErrorMessage(error)
  }
};


export const getAllBlogByUser = async () => {
  try {
    const response = await axiosInstance.get(`${ENDPOINT.blog.getAllBlogByUser}`);
    return response.data;
  } catch (error) {
    throw getErrorMessage(error)
  }
};



export const getAllBlogByUserId = async (id: string) => {
  try {
    const response = await axiosInstance.get(`${ENDPOINT.blog.getAllBlogByUser}/${id}`);
    return response.data;
  } catch (error) {
    throw getErrorMessage(error)
  }
};

export const createBlog = async (data: FormData) => {
  try {
    const response = await axiosInstance.post(
      `${ENDPOINT.blog.adminBlogs}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
     throw getErrorMessage(error)
  }
};

export const updateBlog = async ({ data, id }: {data: FormData, id: string}) => {
  try {
    const response = await axiosInstance.put(
      `${ENDPOINT.blog.adminBlogs}/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
     throw getErrorMessage(error)
  }
};

export const deleteBlog = async (id:string) => {
  try {
    const response = await axiosInstance.delete(
      `${ENDPOINT.blog.adminBlogs}/${id}`,
    );
    return response.data;
  } catch (error) {
     throw getErrorMessage(error)
  }
};


export const getAllPendingBlogByAdmin = async(status: string)=>{
  try {
    const response = await axiosInstance.get(`${ENDPOINT.blog.adminBlogs}`, {params: {status: status}})
    return response.data
  } catch (error) {
    throw getErrorMessage(error)
    
  }
}


export const updatePendingBlogByAdmin = async ({status, id}: {status: string, id: string})=>{
  try {
    const response = await axiosInstance.patch(`${ENDPOINT.blog.adminBlogs}/${id}`,{status: status})
    return response.data
    
  } catch (error) {
      throw getErrorMessage(error)
    
  }
}