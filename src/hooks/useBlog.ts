import {
  createBlog,
  deleteBlog,
  getAllBlogByAdmin,
  getAllBlogByUser,
  getAllBlogByUserId,
  getAllPendingBlogByAdmin,
  updateBlog,
  updatePendingBlogByAdmin,
} from "@/app/services/helper/api-function/blog.function";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetAllBlogByAdmin = ({page, limit}: {page: number, limit: number}) => {
  return useQuery({
    queryKey: ["getAllBlog", page, limit],
    queryFn: ({signal})=> getAllBlogByAdmin({page, limit, signal}),
    placeholderData: keepPreviousData
    
  });
};

export const useGetAllBlogByUser = () => {
  return useQuery({
    queryKey: ["getAllBlogByUser"],
    queryFn: getAllBlogByUser,
  });
};


export const useGetAllBlogByUserById = (id:string) => {
  return useQuery({
    queryKey: ["getAllBlogByUserById", id],
    queryFn: ()=> getAllBlogByUserId(id),
    enabled: !!id
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createBlog"],
    mutationFn: ({ data }: {data: FormData}) => createBlog(data),
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["getAllBlog"] });
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateBlog"],
    mutationFn: ({ data, id }: {data: FormData, id: string}) => updateBlog({ data: data, id: id }),
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["getAllBlog"] });
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteBlog"],
    mutationFn: (id: string) => deleteBlog(id),
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["getAllBlog"] });
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
};


export const useGetAllPendingBlog = ({status, page, limit}: {status: string, page: number, limit: number}) =>{
  return useQuery({
    queryKey: ["getAllPendingBlog", status, page, limit],
    queryFn: ({signal})=> getAllPendingBlogByAdmin({status, page, limit, signal}),
    placeholderData: keepPreviousData

  })
}


export const useUpdatePendingBlogByAdmin = ()=>{
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["updatePendingBlogAdmin"],
    mutationFn: ({status, id}: {status: string, id: string})=> updatePendingBlogByAdmin({status, id}),
    onSuccess: (res)=>{
      queryClient.invalidateQueries({queryKey: ["getAllPendingBlog"]})
      queryClient.invalidateQueries({queryKey: ["getAllBlogByUser"]})
      toast.success(res.message)
    },
    onError: (err: string)=>{
      toast.error(err)
    }

  })
}



