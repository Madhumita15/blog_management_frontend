"use client";

import {
  useGetPendingRequest,
  useManagePendingRequest,
} from "@/hooks/useWriterRequest";
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
import { UserOutPutType } from "@/typescript/type/auth.type";




const UserRequest = () => {
  const { data, isLoading, isError, error } = useGetPendingRequest();
  const { mutate: manageRequest, isPending: manageIsPending } =
    useManagePendingRequest();
  const [isPendingId, setIsPendingId] = useState<string | null>(null);

  const handleRequest = ({id, action}: {id: string , action: string}) => {
    setIsPendingId(id);
    manageRequest({ id: id, action: action });
  };
  return (
    <>
      <div className="p-10 text-white">
        <h1 className="mb-15 text-2xl font-bold bg-linear-to-r bg-clip-text text-transparent from-pink-500 to-fuchsia-600">
          All Pending Request
        </h1>
        <Table>
          <TableCaption>A list of your recent pending request.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead className="text-white font-bold text-xl">
                Name
              </TableHead>
              <TableHead className="text-white font-bold text-xl">
                Email
              </TableHead>
              <TableHead className="text-white font-bold text-xl">
                Role
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
                  No pending Request
                </TableCell>
              </TableRow>
            ) : (
              <>
                {data?.data?.map((user: UserOutPutType) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">
                      <Image
                        className="border-white border-2 rounded-full"
                        src={user.profile_image}
                        alt="blog"
                        width={50}
                        height={50}
                      />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell className="flex flex-row gap-1 mt-2">
                      <Button
                        disabled={isPendingId === user._id && manageIsPending}
                        onClick={() => handleRequest({id: user._id, action: "approved"})}
                        variant={"secondary"}
                        className={"cursor-pointer font-bold  text-blue-800"}
                      >
                        {isPendingId === user._id && manageIsPending ? (
                          <Spinner />
                        ) : (
                          "approved"
                        )}
                      </Button>
                      <Button
                        disabled={isPendingId === user._id && manageIsPending}
                        onClick={() => handleRequest({id: user._id, action: "rejected"})}
                        variant={"secondary"}
                        className={"cursor-pointer font-bold  text-red-600"}
                      >
                        {isPendingId === user._id && manageIsPending ? (
                          <Spinner />
                        ) : (
                          "rejected"
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
    </>
  );
};

export default UserRequest;
