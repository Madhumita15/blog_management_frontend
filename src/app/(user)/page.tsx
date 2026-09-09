"use client";

import { Button } from "@/components/ui/button";
import { ShieldCheck, BookOpen, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center pt-28 pb-16 px-6 py-16">
        <div className="w-full text-center">

          {/* Small Heading */}
          <div className="mb-5 flex items-center justify-center gap-2">
            <BookOpen className="h-5 w-5 text-pink-500" />
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-500">
              Blog Management Platform
            </p>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            A Secure{" "}
            <span className="bg-linear-to-r from-white via-slate-300 to-pink-500 bg-clip-text text-transparent">
              Role-Based Blog
            </span>{" "}
            Platform
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
            This application is a role-based blog management platform where
            Admins, Writers, and Users have different levels of access.
            Writers can create and manage their blogs, Admins can manage and
            approve content, while Users can explore and read published blogs.
          </p>

          {/* Security Section */}
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-left shadow-xl shadow-black/20">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-600/10">
                <ShieldCheck className="h-6 w-6 text-pink-500" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Secure Blog API Access
                </h2>

                <p className="mt-2 text-sm leading-7 text-slate-400">
                  Blog operations are protected using JWT authentication,
                  role-based authorization, and a secret key. The same blog
                  API can handle different operations depending on the
                  authenticated users role and permissions.
                </p>
              </div>
            </div>
          </div>

          {/* Roles */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <Users className="mx-auto mb-3 h-6 w-6 text-pink-500" />
              <h3 className="font-semibold text-white">Admin</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Manages users, categories, blogs, and platform activities.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <BookOpen className="mx-auto mb-3 h-6 w-6 text-pink-500" />
              <h3 className="font-semibold text-white">Writer</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Creates and manages blog content according to permissions.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <Users className="mx-auto mb-3 h-6 w-6 text-pink-500" />
              <h3 className="font-semibold text-white">User</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Explores and reads blogs published on the platform.
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="mt-10">
            <Button
              onClick={() => router.push("/blog")}
              className="cursor-pointer border border-pink-500 bg-pink-700 px-8 py-6 text-base font-semibold text-white transition-all duration-300 hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-900/30"
            >
              Explore Blogs
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}