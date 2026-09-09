import { axiosInstance } from "@/lib/axiosInstance";
import { ENDPOINT } from "../endPoint";
import { getErrorMessage } from "../global.helper";

export const createWriterRequest = async () => {
  try {
    const response = await axiosInstance.post(
      `${ENDPOINT.user.postWriterRequest}`,
    );
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const getPendingRequest = async () => {
  try {
    const response = await axiosInstance.get(
      `${ENDPOINT.user.getWriterRequest}`,
    );
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const managePendingRequest = async ({ id, action }: {id: string, action: string}) => {
  try {
    const response = await axiosInstance.put(
      `${ENDPOINT.user.manageRequest}/${id}`,
      {action: action},
    );
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};
