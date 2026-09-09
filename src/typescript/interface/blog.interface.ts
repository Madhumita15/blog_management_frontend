import { Dispatch, SetStateAction } from "react";
import { BlogoutputType, CategoryOutputType } from "../type/blog.input";

export interface BlogDialogType {
  open: boolean;
  setOpen: (open: boolean) => void;
  isEdit: string | null;
  setIsEdit: Dispatch<SetStateAction<null | string>>;
  allBlogData: BlogoutputType[];
  categoryData: CategoryOutputType[];
}

export interface BlogTableInterface {
  setIsEdit: Dispatch<SetStateAction<string | null>>;
  setOpen: (open: boolean)=> void;
  allBlogData: BlogoutputType[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null

}