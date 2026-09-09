"use client";

import {
  useGetAllPendingBlog,
  useUpdatePendingBlogByAdmin,
} from "@/hooks/useBlog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BlogoutputType } from "@/typescript/type/blog.input";

const PendingBlog = () => {
  const { data, isLoading, isError, error } = useGetAllPendingBlog({
    status: "pending",
  });
  const [isPendingId, setIsPendingId] = useState<string | null>(null);
  const { mutate: pendingMutateBlog, isPending } =
    useUpdatePendingBlogByAdmin();

  const handleBlogPending = ({ id, status }: {id: string, status: string}) => {
    setIsPendingId(id);
    pendingMutateBlog({ id, status });
  };

  return (
    <div className="p-10 text-white">
      <h1 className="mb-15 text-2xl font-bold bg-linear-to-r bg-clip-text text-transparent from-pink-500 to-fuchsia-600">
        All Pending Blogs
      </h1>
      <Table>
        <TableCaption>A list of your recent pending Blogs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="text-white font-bold text-xl">
              Title
            </TableHead>
            <TableHead className="text-white font-bold text-xl">
              Category
            </TableHead>
            <TableHead className="text-white font-bold text-xl">
              Status
            </TableHead>
            <TableHead className="text-white font-bold text-xl">
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
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-red-500">
                {error?.message || "Failed to load pending request"}
              </TableCell>
            </TableRow>
          ) : data?.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-red-500">
                No pending Blogs
              </TableCell>
            </TableRow>
          ) : (
            <>
              {data?.data?.map((blog:BlogoutputType) => (
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
                  <TableCell>
                    <Button
                      variant={"secondary"}
                      className={"bg-red-400 cursor-pointer"}
                    >
                      {blog.status}
                    </Button>
                  </TableCell>
                  <TableCell className="flex flex-row gap-1 mt-2">
                    <Button
                      disabled={isPendingId === blog._id && isPending}
                      onClick={() =>
                        handleBlogPending({ id: blog._id, status: "published" })
                      }
                      variant={"secondary"}
                      className={"cursor-pointer font-bold  text-blue-800"}
                    >
                      {isPendingId === blog._id && isPending ? (
                        <Spinner />
                      ) : (
                        "published"
                      )}
                    </Button>
                    <Button
                      disabled={isPendingId === blog._id && isPending}
                      onClick={() =>
                        handleBlogPending({
                          id: blog._id,
                          status: "unpublished",
                        })
                      }
                      variant={"secondary"}
                      className={"cursor-pointer font-bold  text-red-600"}
                    >
                      {isPendingId === blog._id && isPending ? (
                        <Spinner />
                      ) : (
                        "unpublished"
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PendingBlog;
