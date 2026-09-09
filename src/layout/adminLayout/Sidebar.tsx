"use client";

import {
  ChartBarStacked,
  CircleEllipsis,
  LayoutDashboard,
  Rss,
  User,
} from "lucide-react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import useIsClinet from "@/components/UseIsClient";
import { useGetProfile } from "@/hooks/useUser";
import Image from "next/image";

const Sidebar = () => {
  const pathName = usePathname();
  const { loading, logout, role } = useAuthStore();
  const { data } = useGetProfile();
  const router = useRouter();

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

  const adminMenu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Blog Management", path: "/admin/blogManagement", icon: Rss },
    {
      name: "Category Management",
      path: "/admin/categoryManagement",
      icon: ChartBarStacked,
    },
    { name: "Pending Blogs", path: "/admin/pendingBlog", icon: CircleEllipsis },
    { name: "User Request", path: "/admin/userRequest", icon: User },
  ];

  const writerMenu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Blog Management", path: "/admin/writerBlogManagement", icon: Rss },
  ];

  const isClient = useIsClinet();
  if (!isClient) return null;

  return (
    <>
      <div className="relative">
        <h3 className=" font-bold  pt-3 pl-22 text-2xl text-pink-200">
          Blog<span className="font-bold text-3xl text-pink-400">S</span>tore
        </h3>
        <Collapsible defaultOpen className="pt-18">
          <CollapsibleContent className="text-white flex flex-col gap-3  ">
            {role === "admin" &&
              adminMenu.map((item) => {
                const isActive = pathName === item.path;

                return (
                  <Link
                    className={`${isActive ? "bg-slate-800 shadow-xl" : "bg-transparent"} rounded-md p-3 border border-gray-600 shadow-md flex flex-row gap-2 text-center`}
                    key={item.name}
                    href={item.path}
                  >
                    <item.icon /> {item.name}
                  </Link>
                );
              })}

            {role === "writer" &&
              writerMenu.map((item) => {
                const isActive = pathName === item.path;

                return (
                  <Link
                    className={`${isActive ? "bg-slate-800 shadow-xl" : "bg-transparent"} rounded-md p-3 border border-gray-600 shadow-md flex flex-row gap-2 text-center`}
                    key={item.name}
                    href={item.path}
                  >
                    <item.icon /> {item.name}
                  </Link>
                );
              })}
          </CollapsibleContent>
        </Collapsible>
        <div className="absolute top-154 w-full">
          <div className="flex flex-row text-white gap-4 items-center justify-center shadow-xl bg-slate-800 p-3 rounded-md m-1 border-2 border-gray-600">
            <Image src={data?.data?.profile_image || "https://plus.unsplash.com/premium_photo-1739786996022-5ed5b56834e2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FydG9vbiUyMGJveXxlbnwwfHwwfHx8MA%3D%3D" } width={30} height={20} alt="profile" className="rounded-full border-2 border-pink-200" />
            <div>
              <h1 className="font-bold text-gray-300">{data?.data?.name}</h1>
              <h1 className="text-sm text-gray-400">{data?.data?.email}</h1>
            </div>
          </div>
          <Button
            variant={"secondary"}
            disabled={loading}
            onClick={handleLogout}
            className={"  cursor-pointer p-2 w-full bg-linear-to-r text-white  from-pink-800 to-fuchsia-900"}
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
