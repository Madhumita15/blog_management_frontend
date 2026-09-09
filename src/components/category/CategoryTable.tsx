import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteCategory, useGetAllCategory } from "@/hooks/useCategory";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { CategoryTableInterface } from "@/typescript/interface/category.interface";
import { CategoryOutputType } from "@/typescript/type/blog.input";




const CategoryTable:React.FC<CategoryTableInterface> = ({setIsEdit, setOpen}) => {
     const [isPendingId, setIsPendingId] = useState<string | null>(null)
  const {
    data,
    isLoading,
    isError: getAllisError,
    error: getAllError,
  } = useGetAllCategory();
  const { isPending, mutateAsync: deleteMutate } = useDeleteCategory();


  const handleDeleteCategory =  async(id: string) => {
    setIsPendingId(id)
    const confirm = window.confirm(
      "Are you sure? you want to delete this category",
    );
    if (!confirm) {
      return;
    }
    await deleteMutate(id);
  };


  
  return (
    <>
      <Table>
        <TableCaption>A list of your recent Category</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white font-bold text-xl">ID</TableHead>
            <TableHead className="text-white font-bold text-xl">Name</TableHead>
            <TableHead className="text-white font-bold text-xl ">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
            <TableCell colSpan={4}>
              <div className="flex justify-center items-center py-5">
                <Spinner />
              </div>
            </TableCell>
          </TableRow>
          ) : getAllisError ? (
            <TableRow>
            <TableCell colSpan={4} className="text-center text-red-500">
              {getAllError?.message || "Failed to load category"}
            </TableCell>
          </TableRow>
          ) :  (data?.data.length === 0) ?  <TableRow>
                <TableCell colSpan={4} className="text-center text-red-500">
                 No category Found
                </TableCell>
              </TableRow> : (
            <>
              {data?.data?.map((category:CategoryOutputType) => (
                <TableRow key={category._id}>
                  <TableCell>{category._id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className="flex gap-5">
                    <Button
                     onClick={() => {
                      setIsEdit(category._id)
                      setOpen(true)
                     }}
                      variant={"secondary"}
                      className={"cursor-pointer  text-blue-800"}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      disabled={(isPendingId === category._id) && isPending}
                      variant={"secondary"}
                      className={"cursor-pointer  text-red-600"}
                      onClick={() => handleDeleteCategory(category._id)}
                    >
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default CategoryTable;
