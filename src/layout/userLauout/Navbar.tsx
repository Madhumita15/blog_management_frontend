"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useIsClinet from "@/components/UseIsClient";
import { useGetProfile } from "@/hooks/useUser";
import { useCreateWriterRequest } from "@/hooks/useWriterRequest";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const Navbar = () => {
  const { loading, logout, accessToken, role } = useAuthStore();
  const { mutate: createRequest, isPending: createIsPending } =
    useCreateWriterRequest();
    const {data} = useGetProfile(!!accessToken)
  const router = useRouter();
  const pathname = usePathname()
  const isActive = pathname 






  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status === true) {
        toast.success(response.message);
        router.push("/login");
      } else {
        toast.error(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isClient = useIsClinet();
  if (!isClient) return null;
  return (
    <>
      <div className="flex flex-row bg-slate-900 p-4  sticky top-0 z-50 justify-around  ">
        <h3 className="text-2xl  bg-linear-to-r from-pink-500 via-pink-300  to-pink-600  bg-clip-text text-transparent font-bold">
          Blog<span className="font-bold text-2xl">S</span>tore
        </h3>

        <div className="flex gap-4">
          <Link className={`${(isActive=== "/") ? " text-pink-400 text-lg border-b-2 border-pink-300" : "text-white font-bold text-lg"}  `} href={"/"}>
            Home
          </Link>
          <Link className={`${(isActive=== "/blog") ? " text-pink-400 text-lg border-b-2 border-pink-300" : "text-white font-bold text-lg"}  `} href={"/blog"}>
            Blog
          </Link>
        </div>

        <div className="flex gap-3 ">
          <div>
            {accessToken && role === "user" && (
              <Button
                className={"cursor-pointer px-4 py-2 bg-pink-600 text-white hover:bg-slate-900 hover:text-pink-200 hover:border-2 hover:border-white border-2 border-slate-800   font-bold rounded-md"}
                onClick={() => {
                  if (!accessToken) {
                    toast.error("Please Login first to become an writer");
                    return;
                  }
                  createRequest();
                }}
              >
                {createIsPending ? <Spinner /> : "Become an writer"}
              </Button>
            )}
          </div>

          <div className="flex gap-3 items-center">
            {accessToken ? (
              <div  className="flex gap-3.5">
                <Button
                className={
                  "cursor-pointer px-4 py-2 bg-pink-600 text-white hover:bg-slate-900 hover:text-pink-200 hover:border-2 hover:border-white border-2 border-slate-800   font-bold rounded-md"
                }
                disabled={loading}
                onClick={handleLogout}
              >
                Logout
              </Button>
              <div className="flex gap-2 pl-3">
                <Image src={data?.data.profile_image} alt="profile" width={30} height={20} className="rounded-full"/>
                <div>
                  <h1 className="text-gray-400 text-xs">{data?.data?.name}</h1>
                  <h1 className="text-gray-600 text-xs">{data?.data?.email}</h1>
                </div>

              </div>
              </div>
              
              
            ) : (
              <div className="flex gap-3.5">
                <Button
                  className={
                    " cursor-pointer px-4 py-2 bg-pink-600 text-white hover:bg-slate-900 hover:text-pink-200 hover:border-2 hover:border-white border-2 border-slate-800   font-bold rounded-md"
                  }
                  disabled={loading}
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>
                <Button
                  className={
                    " cursor-pointer px-4 py-2 bg-pink-600 text-white hover:bg-slate-900 hover:text-pink-200 hover:border-2 hover:border-white border-2 border-slate-800   font-bold rounded-md"
                  }
                  disabled={loading}
                  onClick={() => router.push("/register")}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
