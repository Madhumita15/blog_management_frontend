import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "@/app/services/helper/api-function/category.function";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createCategory"],
    mutationFn: (data: { name: string  }) => createCategory(data),
    onSuccess: (res) => {
      console.log(res);
      if (res.status === true) {
        queryClient.invalidateQueries({ queryKey: ["getAllCategory"] });
        toast.success(res.message);
      }
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
};

export const useGetAllCategory = () => {
  return useQuery({
    queryKey: ["getAllCategory"],
    queryFn: getAllCategory,
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: (res) => {
      if (res.status === true) {
        queryClient.invalidateQueries({ queryKey: ["getAllCategory"] });
        toast.success(res.message);
      }
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateCategory"],
    mutationFn: ({ data, id }: { data: { name: string }; id: string }) =>
      updateCategory({ data: data, id: id }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["getAllCategory"] });
      toast.success(res.message);
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
};
