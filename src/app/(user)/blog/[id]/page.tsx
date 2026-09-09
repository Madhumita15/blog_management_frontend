"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import { useGetAllBlogByUserById } from "@/hooks/useBlog";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ArrowLeft, BookOpen } from "lucide-react";

const BlogById = () => {
  const { id } = useParams();
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetAllBlogByUserById(id as string);

  console.log("data", data);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-6 pt-10 sm:px-10 lg:px-12">
        {/* Back Button */}
        <Button
          variant="outline"
          className="mb-8 cursor-pointer border-slate-700 bg-slate-900 text-slate-300 transition-all duration-300 hover:border-pink-600 hover:bg-pink-600/10 hover:text-pink-400"
          onClick={() => router.push("/blog")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blogs
        </Button>

        {/* Page Heading */}
        <div className="mb-10 max-w-3xl">
          <div className="mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-pink-500" />

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-500">
              SkillSwap Blog
            </p>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Explore{" "}
            <span className="bg-linear-to-r from-white via-slate-300 to-pink-500 bg-clip-text text-transparent">
              Ideas & Knowledge
            </span>
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
            Take a deeper look into the experiences, tutorials, and
            knowledge shared by our SkillSwap community.
          </p>
        </div>
      </div>

      {/* Blog */}
      <div className="mx-auto max-w-6xl px-6 pb-16 sm:px-10 lg:px-12">
        {isLoading ? (
          <div className="flex min-h-80 items-center justify-center">
            <Spinner className="h-8 w-8 text-pink-500" />
          </div>
        ) : isError ? (
          <div className="rounded-xl border border-red-900/50 bg-slate-900 p-8 text-center">
            <p className="text-sm text-red-400">
              {error.message || "Failed to load blog by id"}
            </p>
          </div>
        ) : (
          <Card
            key={data?.data?._id}
            className="group mx-auto w-full overflow-hidden border-slate-800 bg-slate-900/90 py-0 shadow-2xl shadow-black/30"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 z-10 bg-linear-to-t from-slate-950/90 via-slate-950/10 to-transparent" />

              <Image
                src={data?.data?.blog_image}
                width={1200}
                height={600}
                alt={data?.data?.title || "Blog image"}
                className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Category */}
              <div className="absolute bottom-5 left-6 z-20">
                <Badge className="border border-pink-500/40 bg-pink-600 px-4 py-1.5 text-sm font-semibold text-white shadow-lg shadow-pink-950/40 hover:bg-pink-600">
                  {data?.data?.category.name}
                </Badge>
              </div>
            </div>

            {/* Blog Content */}
            <CardHeader className="space-y-5 px-6 py-8 sm:px-10 sm:py-10 lg:px-14">
              <CardAction>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                  SkillSwap Article
                </p>
              </CardAction>

              <CardTitle className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {data?.data?.title}
              </CardTitle>

              <div className="h-px w-full bg-linear-to-r from-pink-600/70 via-slate-700 to-transparent" />

              <CardDescription className="whitespace-pre-line text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
                {data?.data?.content}
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BlogById;