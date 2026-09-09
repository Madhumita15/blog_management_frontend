import { categorySchema } from "@/app/services/validation/category.validation";
import { categoryType } from "@/typescript/type/category.input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DynamicInput from "../DynamicInput";
import { categoryInput } from "@/app/services/json/inputData/category.input";
import {
  useCreateCategory,
  useGetAllCategory,
  useUpdateCategory,
} from "@/hooks/useCategory";
import { Spinner } from "../ui/spinner";
import { useEffect } from "react";
import { CategoryDialogInterface } from "@/typescript/interface/category.interface";
import { CategoryOutputType } from "@/typescript/type/blog.input";



const CategoryDialog:React.FC<CategoryDialogInterface> = ({ open, setOpen, isEdit, setIsEdit }) => {
  const { mutateAsync: createMutate, isPending } = useCreateCategory();
  const { mutateAsync: updateMutate, isPending: updateIsPending } =
    useUpdateCategory();
  const { data } = useGetAllCategory();
  const {
    reset,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<categoryType>({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async(data: categoryType) => {
    try {
      if (isEdit) {
     await updateMutate({ data: data, id: isEdit });
      setIsEdit(null);
      reset({
        name: "",
      });
      setOpen(false);
    } else {
     await createMutate(data);
      reset({
        name: "",
      });
      setOpen(false);
    }
      
    } catch (error) {
      console.log(error)
      
    }
    
  };

  useEffect(() => {
    if (isEdit && data) {
      const findCategory = data?.data?.find((item:CategoryOutputType) => item._id === isEdit);
      console.log("findCategory", findCategory);
      reset({
        name: findCategory.name ?? "",
      });
    }
  }, [isEdit, reset, data]);
  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(value) => {
          setIsEdit(null);
          reset({
            name: ""
          })
          setOpen(value);
        }}
      >
        <DialogContent className="sm:max-w-sm bg-slate-800 border border-slate-800 text-slate-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
            </DialogHeader>
            {categoryInput.map((input) => (
              <DynamicInput
                key={input.name}
                label={input.label}
                required={input.required}
                type={input.type}
                name={input.name}
                error={errors[input.name]?.message}
                placeholder={input.placeholder}
                register={register}
                loading={isPending || updateIsPending}
              />
            ))}

            <DialogFooter className="bg-transparent">
              <Button
                disabled={isPending || updateIsPending}
                className={"cursor-pointer border-2 border-gray-500"}
                variant={"destructive"}
                onClick={() => {
                  reset({
                    name: "",
                  });
                  setOpen(false);
                  setIsEdit(null);
                }}
              >
                cancel
              </Button>

              <Button
                disabled={isPending || updateIsPending}
                type="submit"
                className={"cursor-pointer  bg-pink-700 text-white hover:bg-slate-900 hover:text-pink-200 hover:border-2 hover:border-black border-2 border-white  px-3 py-1 font-bold rounded-md"}
              >
                {isPending || updateIsPending ? (
                  <Spinner />
                ) : isEdit ? (
                  "Update"
                ) : (
                  "Add"
                )}{" "}
                Category
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategoryDialog;
