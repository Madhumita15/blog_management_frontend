"use client";

import CategoryDialog from "@/components/category/CategoryDialog";
import CategoryTable from "@/components/category/CategoryTable";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CategoryManagement = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<string | null>(null);
  
  return (
    <>
      <div className="p-10 text-white">
        <div className="flex flex-row justify-between  text-white">
          <h1 className="text-2xl font-bold bg-linear-to-r bg-clip-text text-transparent from-pink-500 to-fuchsia-600">
            All Category
          </h1>
          <div>
            <Button
              onClick={() => setOpen(true)}
              className={
                "cursor-pointer bg-pink-700 text-white hover:bg-slate-900 hover:text-pink-200 hover:border-2 hover:border-white border-2 border-black  px-3 py-2 font-bold rounded-md"
              }
            >
              + Add Category
            </Button>
            <CategoryDialog
              open={open}
              setOpen={setOpen}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
          </div>
        </div>
        <div className="pt-10">
          <CategoryTable setIsEdit={setIsEdit} setOpen={setOpen} />
        </div>
      </div>
    </>
  );
};

export default CategoryManagement;
