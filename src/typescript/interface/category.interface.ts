import { Dispatch, SetStateAction } from "react";

export interface CategoryDialogInterface {
  open: boolean;
  setOpen: (open: boolean)=> void
  isEdit: string | null
  setIsEdit: Dispatch<SetStateAction<null | string>>
}

export interface CategoryTableInterface{
  setIsEdit: Dispatch<SetStateAction<null | string>>
  setOpen: (open: boolean) => void
}