import { axiosInstance } from "@/lib/axiosInstance";
import { ENDPOINT } from "../endPoint";
import { getErrorMessage } from "../global.helper";




export const createCategory = async (data: { name: string }) => {
  try {
    const response = await axiosInstance.post(
      `${ENDPOINT.category.create}`,
      data,
    );
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};




export const getAllCategory = async () => {
  try {
    const response = await axiosInstance.get(`${ENDPOINT.category.get}`);
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      `${ENDPOINT.category.create}/${id}`,
    );
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const updateCategory = async ({
  data,
  id,
}: {
  data: { name: string };
  id: string;
}) => {
  try {
    const response = await axiosInstance.put(
      `${ENDPOINT.category.create}/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};
