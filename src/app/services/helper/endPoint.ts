export const ENDPOINT = {
  user:{
    signup: "/auth/register",
    login: "/auth/login",
    forgotpasswordlink: "/auth/forgot-password/link",
    forgotPassword: "/auth/forgot-password",
    emailVerify: "/auth/verify-email",
    getWriterRequest: "/admin/writer-request",
    postWriterRequest: "/user/writer-request",
    manageRequest: "/admin/manageRequest",
    logout: "/auth/logout",
    profile: "/user/profile"
  },
  blog: {
    adminBlogs: "/blogs",
    getAllBlogByUser: "/blog",
  },
  category: {
    create: "/categories",
    get: "/category"
  },
  like: {
    create: "/like"
  }
};
