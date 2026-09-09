import {
  createWriterRequest,
  getPendingRequest,
  managePendingRequest,
} from "@/app/services/helper/api-function/writerRequest.function";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateWriterRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createwriterRequest"],
    mutationFn: () => createWriterRequest(),
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["getPendingRequest"] });
      toast.success(res?.message);
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
};

export const useGetPendingRequest = () => {
  return useQuery({
    queryKey: ["getPendingRequest"],
    queryFn: getPendingRequest,
  });
};

export const useManagePendingRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["managePendingRequest"],
    mutationFn: ({ id, action }: { id: string; action: string }) =>
      managePendingRequest({ id: id, action: action }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["getPendingRequest"] });
      toast.success(res?.message);
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
};
