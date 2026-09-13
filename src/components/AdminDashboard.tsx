import { useGetAllBlogByAdmin, useGetAllPendingBlog } from "@/hooks/useBlog";
import { useGetAllCategory } from "@/hooks/useCategory";
import { useGetPendingRequest } from "@/hooks/useWriterRequest";
import {
  ChartBarStacked,
  CircleEllipsis,
  Rss,
  User,
} from "lucide-react";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardPagination } from "@/typescript/interface/pagination.interface";

const AdminDashboard:React.FC<DashboardPagination> = ({page, limit}) => {
 
  const {
    data: totalBlogData,
    isLoading: isPendingBlogData,
  } = useGetAllBlogByAdmin({page, limit});

  const {
    data: totalPendingBlogData,
    isLoading: isLoadingPendingBlogData,
  } = useGetAllPendingBlog({ status: "pending", page, limit });

  const {
    data: totalCategoryData,
    isLoading: isPendingCategoryData,
  } = useGetAllCategory();

  const {
    data: totalPendingRequestData,
    isLoading: isPendingRequestData,
  } = useGetPendingRequest();


  const stats = [
    {
      name: "Total Blogs",
      count: totalBlogData?.totalBlogs,
      icon: Rss,
      loading: isPendingBlogData,
    },
    {
      name: "Total Pending Blogs",
      count: totalPendingBlogData?.totalBlogs || 0,
      icon: CircleEllipsis,
      loading: isLoadingPendingBlogData,
    },
    {
      name: "Total Category",
      count: totalCategoryData?.totalCategory || 0,
      icon: ChartBarStacked,
      loading: isPendingCategoryData,
    },
    {
      name: "Total Pending Request",
      count: totalPendingRequestData?.data?.length || 0,
      icon: User,
      loading: isPendingRequestData,
    },
  ];

  return (
    <div className="w-full p-10">
      <div className="grid gap-3 grid-cols-1">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.name}
              className="rounded-xl border border-slate-800 bg-slate-950 p-5 shadow-lg transition-all duration-300 hover:border-pink-700/60 hover:shadow-pink-900/10"
            >
              <div className="flex items-center justify-between">
                {/* Left Content */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-400">
                    {stat.name}
                  </p>

                  {stat.loading ? (
                    <Skeleton className="h-9 w-16 bg-slate-800" />
                  ) : (
                    <h2 className="text-3xl font-bold text-white">
                      {stat.count}
                    </h2>
                  )}
                </div>

                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-pink-700/30 bg-pink-700/10">
                  <Icon className="h-6 w-6 text-pink-500" />
                </div>
              </div>

              {/* Bottom accent */}
              <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-1/3 rounded-full bg-pink-700" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;