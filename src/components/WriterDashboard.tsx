import { useGetAllBlogByAdmin } from "@/hooks/useBlog";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleEllipsis, Rss } from "lucide-react";
import { BlogoutputType } from "@/typescript/type/blog.input";

const WriterDashboard = () => {
  const { data: allBlogData, isLoading, isError } = useGetAllBlogByAdmin();

  const blogs = allBlogData?.data ?? [];

  const totalBlogs = blogs.length;

  const pendingBlog = blogs.filter((blog:BlogoutputType) => blog.status === "pending").length;

  if (isError) {
    return (
      <div className="w-full rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-red-400">
        Failed to load dashboard statistics.
      </div>
    );
  }

  return (
    <div className="w-full p-10 space-y-5">
      {/* Total Blogs */}
      <div className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 p-7 shadow-lg">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-5 w-32 bg-slate-700" />
            <Skeleton className="h-12 w-24 bg-slate-700" />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-slate-400">
                  Total Blogs
                </p>

                <h2 className="mt-2 text-4xl font-bold text-white">
                  {totalBlogs}
                </h2>

                <div className="mt-4 h-1 w-16 rounded-full bg-pink-500" />
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-pink-700/30 bg-pink-700/10">
                <Rss className="h-6 w-6 text-pink-500" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Pending Blogs */}
      <div className="w-full rounded-2xl border border-pink-500/30 bg-slate-900/80 p-7 shadow-lg">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-5 w-40 bg-slate-700" />
            <Skeleton className="h-12 w-24 bg-slate-700" />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-slate-400">
                  Pending Blogs
                </p>

                <h2 className="mt-2 text-4xl font-bold text-pink-400">
                  {pendingBlog}
                </h2>

                <div className="mt-4 h-1 w-16 rounded-full bg-pink-500" />
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-pink-700/30 bg-pink-700/10">
                <CircleEllipsis className="h-6 w-6 text-pink-500" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WriterDashboard;
