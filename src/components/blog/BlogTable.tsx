import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteBlog } from "@/hooks/useBlog";
import Image from "next/image";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import { BlogTableInterface } from "@/typescript/interface/blog.interface";



const BlogTable:React.FC<BlogTableInterface>=({ setIsEdit, setOpen, allBlogData, isLoading, isError, error })=>{
   const [isPendingId, setIsPendingId] = useState<string | null>(null)
  const { mutateAsync: deleteMutate, isPending } = useDeleteBlog();
 

  const handleDeleteBlog = async(id: string) => {
    setIsPendingId(id)
    const confirm = window.confirm(
      "Are you sure? you want to delete this blog",
    );
    if (!confirm) {
      return;
    }
   await deleteMutate(id);
  };

  return (
    <Table className="mt-14">
      <TableCaption>A list of your recent blogs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="text-white font-bold text-xl">Title</TableHead>
          <TableHead className="text-white font-bold text-xl">
            category
          </TableHead>
          <TableHead className="text-white font-bold text-xl">
            Status
          </TableHead>
          <TableHead className="text-white font-bold text-xl">Action</TableHead>
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
        ) : isError ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-red-500">
              {error?.message || "Failed to load blogs"}
            </TableCell>
          </TableRow>
        ) :  (allBlogData?.length === 0) ?  <TableRow>
                <TableCell colSpan={4} className="text-center text-red-500">
                 No Blog Found
                </TableCell>
              </TableRow> : (
          <>
            {allBlogData.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell className="font-medium">
                  <Image
                    className="border-white border-2 rounded-full"
                    src={blog.blog_image}
                    alt="blog"
                    width={50}
                    height={50}
                  />
                </TableCell>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.category.name}</TableCell>
                <TableCell><Button variant={"destructive"}>{blog.status}</Button></TableCell>
                <TableCell className="flex flex-row gap-1 mt-2">
                  <Button
                    onClick={() => {
                      setOpen(true);
                      setIsEdit(blog._id);
                    }}
                    variant={"secondary"}
                    className={"cursor-pointer  text-blue-800"}
                  >
                    <Pencil />
                  </Button>
                  <Button
                  disabled={(isPendingId === blog._id) && isPending}
                    onClick={() => handleDeleteBlog(blog._id)}
                    variant={"secondary"}
                    className={"cursor-pointer  text-red-600"}
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
  );
}

export default BlogTable
