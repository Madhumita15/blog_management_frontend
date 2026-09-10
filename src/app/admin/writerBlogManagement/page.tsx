"use client";

import BlogDialog from "@/components/blog/BlogDialog";
import BlogTable from "@/components/blog/BlogTable";
import { useGetAllBlogByAdmin } from "@/hooks/useBlog";
import { useGetAllCategory } from "@/hooks/useCategory";
import { Button } from "@base-ui/react";
import { useState } from "react";

const WriterBlogManagement = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<string | null>(null);
  const {
    data: allBlogData,
    isLoading,
    isError,
    error,
  } = useGetAllBlogByAdmin();
  const { data: categoryData } = useGetAllCategory();

  return (
    <>
      <div className="p-10 text-white">
        <div className="flex flex-row justify-between  text-white">
          <h1 className="text-2xl font-bold bg-linear-to-r bg-clip-text text-transparent from-pink-500 to-fuchsia-600">All Blogs</h1>
          <div>
            <Button onClick={() => setOpen(true)} className={"cursor-pointer bg-pink-700 text-white hover:bg-slate-900 hover:text-pink-200 hover:border-2 hover:border-white border-2 border-black  px-3 py-1 font-bold rounded-md"}>
              + Add Blog
            </Button>
            <BlogDialog
              categoryData={categoryData?.data || []}
              open={open}
              allBlogData={allBlogData?.data || []}
              setOpen={setOpen}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
          </div>
        </div>
        <BlogTable
          allBlogData={allBlogData?.data || []}
          isLoading={isLoading}
          isError={isError}
          error={error}
          setIsEdit={setIsEdit}
          setOpen={setOpen}
        />
      </div>
    </>
  );
};

export default WriterBlogManagement;
