"use client";

import { useGetAllBlogByUser } from "@/hooks/useBlog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { BlogoutputType } from "@/typescript/type/blog.input";

const Blog = () => {
  const { data: allBlog, isLoading, isError, error } =
    useGetAllBlogByUser();

  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="px-6 pt-28 pb-16 text-center sm:px-10 lg:px-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
          SkillSwap Blog
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Learn Something{" "}
          <span className="bg-linear-to-r from-white via-slate-300 to-pink-500 bg-clip-text text-transparent">
            New
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
          Discover useful ideas, tutorials, experiences, and knowledge
          shared by our community of learners and creators.
        </p>

        <div className="mx-auto mt-6 h-px max-w-24 bg-linear-to-r from-transparent via-pink-600 to-transparent" />
      </div>

      {/* Blogs */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 px-6 pb-16 md:grid-cols-3 lg:px-2">
        {isLoading ? (
          <div className="col-span-full flex min-h-60 items-center justify-center">
            <Spinner className="h-8 w-8 text-pink-500" />
          </div>
        ) : isError ? (
          <div className="col-span-full rounded-xl border border-red-900/50 bg-slate-900 p-8 text-center">
            <p className="text-sm text-red-400">{error.message || "Failed to load blogs"}</p>
          </div>
        ) : (
          allBlog?.data?.map((blog:BlogoutputType) => (
            <Card
              key={blog._id}
              className="group relative mx-auto w-full max-w-md overflow-hidden border-slate-800 bg-slate-900/80 py-0 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-pink-700/60 hover:shadow-pink-950/30"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 z-10 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                <Image
                  src={blog.blog_image}
                  width={600}
                  height={350}
                  alt={blog.title}
                  className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Category */}
                <div className="absolute left-4 top-4 z-20">
                  <Badge className="border border-pink-500/30 bg-pink-600/90 px-3 py-1 text-white shadow-lg shadow-pink-950/30 backdrop-blur-sm hover:bg-pink-600">
                    {blog.category.name}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <CardHeader className="space-y-3 px-5 pt-5">
                <CardAction>
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Featured Article
                  </span>
                </CardAction>

                <CardTitle className="line-clamp-2 text-xl font-bold text-white transition-colors group-hover:text-pink-400">
                  {blog.title}
                </CardTitle>

                <CardDescription className="line-clamp-3 text-sm leading-6 text-slate-400">
                  {blog.content}
                </CardDescription>
              </CardHeader>

              {/* Button */}
              <CardFooter className="px-5 pb-5 pt-2">
                <Button
                  className="w-full cursor-pointer border border-pink-600/50 bg-pink-700 text-white transition-all duration-300 hover:border-pink-500 hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-900/30"
                  onClick={() => router.push(`/blog/${blog._id}`)}
                >
                  Read Article
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Blog;