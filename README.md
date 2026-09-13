# 📝 Single Blog API Management System — Frontend

A modern **Blog Management System frontend** built with **Next.js, TypeScript, TanStack Query, Zustand, Tailwind CSS, and shadcn/ui**.

The application provides separate experiences for **Admin, Writer, and User** with role-based access control, blog management, writer request management, category management, authentication, image uploads, and more.

---

## 🚀 Live Demo

🌐 **Frontend:** [View Live Frontend](https://blog-management-frontend.vercel.app/)

⚙️ **Backend API:** [View Backend API](https://blog-management-backend.vercel.app/)

---

## 📌 Project Overview

The Single Blog API Management System is a full-stack blog platform where different users have different permissions.

There are three main roles:

* 👑 **Admin**
* ✍️ **Writer**
* 👤 **User**

The Admin manages the overall platform, Writers can create and manage their own blogs after approval, and Users can browse published blogs and request to become Writers.

The frontend communicates with a separate REST API backend.

---

# 🛠️ Tech Stack

## Frontend

* **Next.js**
* **TypeScript**
* **TanStack Query**
* **Zustand**
* **Tailwind CSS**
* **shadcn/ui**
* **React Hook Form**
* **Yup**
* **Axios**
* **Sonner**
* **Lucide React**
* **Next Image**

## Backend

The frontend consumes APIs built using:

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Nodemailer
* Cloudinary

---


## 📁 Project Structure

```text


────────────────────────────────────────────────────────────────────────────────

├── 📁 public/
│   ├── 🖼️ file.svg
│   ├── 🖼️ globe.svg
│   ├── 🖼️ next.svg
│   ├── 🖼️ vercel.svg
│   └── 🖼️ window.svg
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 (auth)/
│   │   │   ├── 📁 account/
│   │   │   │   └── 📁 forgotPassword/
│   │   │   │       └── 📁 [id]/
│   │   │   │           └── 📁 [token]/
│   │   │   │               └── 📄 page.tsx
│   │   │   ├── 📁 checkMail/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 forgotPasswordLink/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 login/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 register/
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📁 verifyEmail/
│   │   │       └── 📄 page.tsx
│   │   ├── 📁 (user)/
│   │   │   ├── 📁 blog/
│   │   │   │   ├── 📁 [id]/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📄 layout.tsx
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 admin/
│   │   │   ├── 📁 blogManagement/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 categoryManagement/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 dashboard/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 pendingBlog/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 userRequest/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 writerBlogManagement/
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📄 layout.tsx
│   │   ├── 📁 services/
│   │   │   ├── 📁 helper/
│   │   │   │   ├── 📁 api-function/
│   │   │   │   │   ├── 📄 blog.function.ts
│   │   │   │   │   ├── 📄 category.function.ts
│   │   │   │   │   ├── 📄 like.function.ts
│   │   │   │   │   ├── 📄 user.function.ts
│   │   │   │   │   └── 📄 writerRequest.function.ts
│   │   │   │   ├── 📁 provider/
│   │   │   │   │   └── 📄 QueryProvider.tsx
│   │   │   │   ├── 📄 endPoint.ts
│   │   │   │   └── 📄 global.helper.ts
│   │   │   ├── 📁 json/
│   │   │   │   └── 📁 inputData/
│   │   │   │       ├── 📄 blog.input.ts
│   │   │   │       ├── 📄 category.input.ts
│   │   │   │       ├── 📄 forgotPassword.input.ts
│   │   │   │       ├── 📄 forgotPasswordLink.ts
│   │   │   │       ├── 📄 login.input.ts
│   │   │   │       ├── 📄 register.input.ts
│   │   │   │       └── 📄 verifyEmail.ts
│   │   │   └── 📁 validation/
│   │   │       ├── 📄 blog.validation.ts
│   │   │       ├── 📄 category.validation.ts
│   │   │       ├── 📄 forgotPassword.validation.ts
│   │   │       ├── 📄 forgotPasswordLink.validation.ts
│   │   │       ├── 📄 login.validation.ts
│   │   │       ├── 📄 register.validation.ts
│   │   │       └── 📄 verifyEmail.validation.ts
│   │   ├── 📄 favicon.ico
│   │   ├── 🎨 globals.css
│   │   ├── 📄 layout.tsx
│   │   └── 📄 not-found.tsx
│   ├── 📁 components/
│   │   ├── 📁 blog/
│   │   │   ├── 📄 BlogDialog.tsx
│   │   │   ├── 📄 BlogPagination.tsx
│   │   │   └── 📄 BlogTable.tsx
│   │   ├── 📁 category/
│   │   │   ├── 📄 CategoryDialog.tsx
│   │   │   └── 📄 CategoryTable.tsx
│   │   ├── 📁 ui/
│   │   │   ├── 📄 alert-dialog.tsx
│   │   │   ├── 📄 badge.tsx
│   │   │   ├── 📄 button.tsx
│   │   │   ├── 📄 card.tsx
│   │   │   ├── 📄 collapsible.tsx
│   │   │   ├── 📄 dialog.tsx
│   │   │   ├── 📄 input.tsx
│   │   │   ├── 📄 label.tsx
│   │   │   ├── 📄 skeleton.tsx
│   │   │   ├── 📄 spinner.tsx
│   │   │   ├── 📄 table.tsx
│   │   │   └── 📄 textarea.tsx
│   │   ├── 📄 AdminDashboard.tsx
│   │   ├── 📄 DynamicInput.tsx
│   │   ├── 📄 UseIsClient.tsx
│   │   └── 📄 WriterDashboard.tsx
│   ├── 📁 hooks/
│   │   ├── 📄 useBlog.ts
│   │   ├── 📄 useCategory.ts
│   │   ├── 📄 useLike.ts
│   │   ├── 📄 useUser.ts
│   │   └── 📄 useWriterRequest.ts
│   ├── 📁 layout/
│   │   ├── 📁 adminLayout/
│   │   │   ├── 📄 Navbar.tsx
│   │   │   └── 📄 Sidebar.tsx
│   │   └── 📁 userLauout/
│   │       ├── 📄 Footer.tsx
│   │       └── 📄 Navbar.tsx
│   ├── 📁 lib/
│   │   ├── 📄 axiosInstance.ts
│   │   └── 📄 utils.ts
│   ├── 📁 store/
│   │   └── 📄 useAuthStore.ts
│   ├── 📁 typescript/
│   │   ├── 📁 interface/
│   │   │   ├── 📄 auth.interface.ts
│   │   │   ├── 📄 blog.interface.ts
│   │   │   ├── 📄 category.interface.ts
│   │   │   └── 📄 pagination.interface.ts
│   │   └── 📁 type/
│   │       ├── 📄 auth.type.ts
│   │       ├── 📄 blog.input.ts
│   │       ├── 📄 category.input.ts
│   │       ├── 📄 input.type.ts
│   │       └── 📄 like.type.ts
│   └── 📄 proxy.ts
├── ⚙️ .gitignore
├── 📝 AGENTS.md
├── 📝 CLAUDE.md
├── 📝 README.md
├── ⚙️ components.json
├── 📄 eslint.config.mjs
├── 📄 next.config.ts
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📄 postcss.config.mjs
└── ⚙️ tsconfig.json

────────────────────────────────────────────────────────────────────────────────

```

Each role gets access to different parts of the application.

---

# 👑 2. Admin Dashboard

The Admin has complete control over the blog management system.

The Admin dashboard provides access to:

* Blog management
* Pending blog management
* Category management
* Writer request management
* User management
* Profile management
* Dashboard statistics

---

## 📊 Admin Blog Management

The Admin can view and manage blogs submitted by Writers.

### Admin can:

* View all blogs
* Search/filter blogs
* Create blogs
* Update blogs
* Delete blogs
* Review blog status
* Manage blog categories
* View blog authors

The blog management interface uses reusable UI components such as tables, dialogs, forms, buttons, and dropdowns.

---

# ✍️ 3. Writer Dashboard

Approved Writers have access to their own Writer dashboard.

Writers can:

* Create blogs
* View their blogs
* Update their blogs
* Delete their blogs
* Upload blog images
* Select blog categories
* Track their blog status

### Writer Blog Flow

```text
User
 ↓
Requests Writer Role
 ↓
Admin Reviews Request
 ↓
Admin Approves
 ↓
User Becomes Writer
 ↓
Writer Creates Blog
 ↓
Blog Submitted
 ↓
Admin Reviews Blog
 ↓
Approved Blog
 ↓
Published
```

This creates a controlled blog publishing workflow.

---

# 📝 4. Blog Creation

The frontend provides a reusable blog form for creating blogs.

The form contains fields such as:

* Blog title
* Blog content
* Category
* Blog image

### Creation Flow

```text
Writer/Admin
      ↓
Open Create Blog Dialog
      ↓
Fill Blog Form
      ↓
Validate Form
      ↓
Create FormData
      ↓
Upload Image + Blog Data
      ↓
Send API Request
      ↓
Backend Processes Request
      ↓
Blog Created
      ↓
Show Success Toast
      ↓
Refresh Blog List
```

The frontend uses `FormData` because the blog request can contain both normal form fields and an image file.

---

# 🖼️ 5. Blog Image Upload

Blog images are uploaded using a file input.

The frontend:

1. Allows the user to select an image.
2. Shows the selected image preview.
3. Adds the image to `FormData`.
4. Sends the request to the backend.
5. Backend uploads the image to Cloudinary.
6. Cloudinary URL is stored with the blog.

### Important Edit Behavior

When editing an existing blog, the existing image is not required again.

The user can update only:

* Title
* Content
* Category

or optionally replace the existing image.

```text
Create Blog
→ Image required

Edit Blog
→ Existing image remains
→ New image optional
```

This prevents unnecessary image uploads during editing.

---

# 🗂️ 6. Category Management

Categories are managed through the Admin dashboard.

Admin can:

* Create categories
* View categories
* Update categories
* Delete categories

The blog form retrieves available categories from the backend and displays them in a select/dropdown field.

### Blog Category Flow

```text
Admin creates category
        ↓
Category stored in database
        ↓
Frontend fetches categories
        ↓
Writer/Admin selects category
        ↓
Category ID sent with blog
        ↓
Blog associated with category
```

---

# ⏳ 7. Pending Blog Management

Blogs submitted by Writers can go through an approval process.

The Admin can view blogs based on their status.

Example statuses:

```text
pending
approved
rejected
```

### Approval Flow

```text
Writer creates blog
       ↓
Blog status = pending
       ↓
Admin reviews blog
       ↓
     ┌───────────────┐
     ↓               ↓
  Approve          Reject
     ↓               ↓
approved          rejected
     ↓
Published
```

This prevents Writers from directly publishing content without Admin approval.

---

# 👤 8. User Dashboard

Normal Users have access to publicly available blog content and user-related features.

Users can:

* View published blogs
* Browse blog categories
* Read blog content
* Request Writer access
* Manage their profile

---

# ✍️ 9. Writer Request System

A normal User can request permission to become a Writer.

### Request Flow

```text
User
 ↓
Request Writer Role
 ↓
Request submitted
 ↓
Admin receives request
 ↓
Admin reviews request
 ↓
 ┌───────────────┐
 ↓               ↓
Approve        Reject
 ↓               ↓
Writer Role     Request
Assigned        Rejected
```

After approval, the user can access Writer features.

The backend also sends email notifications through Nodemailer for relevant request actions.

---

# 🔎 10. Blog Listing

The frontend displays blogs using reusable components.

Depending on the user's role and API endpoint, different blog lists can be displayed.

Examples:

* All blogs for Admin
* Writer's own blogs
* Pending blogs
* Published blogs for Users

The UI updates automatically after mutations such as:

* Create
* Update
* Delete
* Approve
* Reject

---

# 🔄 11. TanStack Query

**TanStack Query** is used for server-state management.

It handles:

* API requests
* Loading states
* Error states
* Caching
* Refetching
* Mutations
* Query invalidation

### Example Flow

```text
Component
   ↓
Custom Query Hook
   ↓
API Request
   ↓
Backend
   ↓
Response
   ↓
TanStack Query
   ↓
Component UI
```

For example:

```text
useGetAllBlogByAdmin()
        ↓
GET /blogs
        ↓
Backend
        ↓
Blog Data
        ↓
Admin Blog Table
```

After creating or updating a blog, related queries can be invalidated so the latest data is displayed.

---

# 🔑 12. Zustand Authentication

**Zustand** is used for client-side authentication/state management.

It helps maintain information such as:

* Logged-in user
* User role
* Authentication state

The application can use this information to determine which dashboard and UI elements should be displayed.

### Role-Based UI

```text
Login
  ↓
Get User Role
  ↓
 ┌────────┬────────┬────────┐
 ↓        ↓        ↓
Admin   Writer    User
 ↓        ↓        ↓
Admin   Writer   User
Panel   Panel    Panel
```

---

# 🛡️ 13. Role-Based Access Control

The frontend provides different navigation and dashboard experiences according to the authenticated user's role.

### Admin

```text
Dashboard
Blogs
Pending Blogs
Categories
Writer Requests
Users
Profile
```

### Writer

```text
Dashboard
My Blogs
Create Blog
Profile
```

### User

```text
Home
Blogs
Categories
Profile
Writer Request
```

The backend also validates permissions, so frontend restrictions are not treated as the primary security mechanism.

---

# 📡 14. Axios API Integration

Axios is used for communication between the Next.js frontend and Node.js/Express backend.

API requests are organized through reusable API functions/hooks.

Example structure:

```text
Frontend
   ↓
Custom Hook
   ↓
Axios API Function
   ↓
Express API
   ↓
Controller
   ↓
MongoDB
```

This keeps API logic separate from UI components and makes the application easier to maintain.

---

# 🚨 15. Error Handling

The frontend handles API errors and displays appropriate messages using toast notifications.

Examples:

```text
Login failed
Unauthorized request
Forbidden access
Validation error
Blog creation failed
Blog update failed
Blog deleted successfully
```

The UI also handles loading and error states for API requests.

---

# 🔔 16. Toast Notifications

**Sonner** is used for user feedback.

Examples:

* Blog created successfully
* Blog updated successfully
* Blog deleted successfully
* Category created successfully
* Request submitted successfully
* Login failed
* Unauthorized action

This provides immediate feedback after user actions.

---

# 📋 17. Form Validation

Forms are handled using:

* React Hook Form
* Yup

Validation is performed before sending data to the backend.

Example blog validation:

```text
Title
 ↓
Required
 ↓
Content
 ↓
Required
 ↓
Category
 ↓
Required
 ↓
Image
 ↓
Required only during creation
```

This improves the user experience by catching common input errors before making an API request.

---

# 📱 18. Responsive UI

The application is designed using Tailwind CSS and reusable UI components.

The interface is responsive across:

* Desktop
* Laptop
* Tablet
* Mobile

The dashboard uses reusable components such as:

* Tables
* Dialogs
* Buttons
* Forms
* Dropdowns
* Cards
* Sidebar
* Navigation
* Loading states

---

# 🎨 19. shadcn/ui

The project uses **shadcn/ui** components for building a consistent interface.

Used components include:

* Button
* Dialog
* Table
* Select
* Input
* Dropdown Menu
* Form
* Badge
* Skeleton

These components are customized using Tailwind CSS according to the application's requirements.

---

# ⚡ 20. Loading States

The frontend provides loading states while API requests are in progress.

For example:

```text
Fetching Blogs
      ↓
Loading/Skeleton UI
      ↓
API Response
      ↓
Display Blog Data
```

This improves the overall user experience and prevents the interface from appearing unresponsive.

---

# 🔒 21. Protected Routes

Dashboard pages are protected based on authentication and user roles.

The application checks authentication before allowing access to protected sections.

Example:

```text
User visits Admin Dashboard
          ↓
Is user authenticated?
      ↙        ↘
    No          Yes
    ↓            ↓
Login        Check Role
                 ↓
          Is role Admin?
             ↙     ↘
           No       Yes
           ↓         ↓
        Denied    Dashboard
```

The backend independently validates authentication and authorization.

---

# 🌐 22. Public Blog Access

Published blogs can be accessed by normal users without requiring Admin or Writer permissions.

The application distinguishes between:

```text
Public APIs
     ↓
Published Blog Content
```

and:

```text
Protected APIs
     ↓
Admin / Writer / User Operations
```

This allows public users to consume published content while sensitive management operations remain protected.

---

# 📧 23. Email Notification Integration

The backend uses **Nodemailer** to send emails for specific actions.

Examples include:

* Writer request approval
* Writer request rejection
* Other account-related notifications

The frontend triggers these actions through API requests and displays the appropriate result to the user.

---

# ☁️ 24. Deployment

The frontend is deployed using **Vercel**.

Deployment flow:

```text
GitHub Repository
       ↓
Vercel
       ↓
Build Next.js Application
       ↓
Deploy
       ↓
Live Application
```

Environment variables are configured through the deployment platform instead of exposing sensitive configuration inside the source code.

---

# 📁 Project Structure

A simplified frontend structure:

```text
src/
│
├── app/
│   ├── admin/
│   │   ├── dashboard/
│   │   ├── blogManagement/
│   │   ├── categoryManagement/
│   │   └── writerRequestManagement/
│   │
│   ├── writer/
│   │   ├── dashboard/
│   │   └── blogManagement/
│   │
│   ├── user/
│   │
│   ├── login/
│   └── ...
│
├── components/
│   ├── ui/
│   ├── blog/
│   ├── auth/
│   └── ...
│
├── hooks/
│   ├── blog/
│   ├── category/
│   ├── auth/
│   └── ...
│
├── lib/
│   ├── axios/
│   └── ...
│
├── store/
│   └── authStore.ts
│
├── schemas/
│   └── ...
│
└── types/
    └── ...
```

---

# 🔄 Complete Application Workflow

The overall application works approximately like this:

```text
                    ┌─────────────┐
                    │    User     │
                    └──────┬──────┘
                           │
                     Registration/Login
                           │
                           ▼
                    ┌─────────────┐
                    │    User     │
                    └──────┬──────┘
                           │
                    Writer Request
                           │
                           ▼
                    ┌─────────────┐
                    │    Admin    │
                    └──────┬──────┘
                           │
                     Approve Request
                           │
                           ▼
                    ┌─────────────┐
                    │    Writer   │
                    └──────┬──────┘
                           │
                      Create Blog
                           │
                           ▼
                    ┌─────────────┐
                    │   Pending   │
                    │     Blog    │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │    Admin    │
                    │    Review   │
                    └──────┬──────┘
                           │
                  ┌────────┴────────┐
                  │                 │
               Approve            Reject
                  │                 │
                  ▼                 ▼
             Published           Rejected
                  │
                  ▼
              Public Users
```

---

# 🧠 What I Learned From This Project

While developing this project, I strengthened my understanding of:

* Next.js application development
* TypeScript
* REST API integration
* TanStack Query
* Server-state management
* Zustand
* Authentication
* Authorization
* Role-Based Access Control
* Axios
* FormData
* File uploads
* Form validation
* React Hook Form
* Yup
* MongoDB API integration
* Error handling
* Loading states
* Query invalidation
* Reusable components
* Protected routes
* Deployment with Vercel

Most importantly, this project helped me understand how a **frontend communicates with a real backend API and handles different user roles and workflows**.

---

# 🔮 Future Improvements

Some features that can be added in the future:

* Rich text editor for blog content
* Blog comments
* bookmark functionality
* Advanced blog search
* Pagination and filtering
* Blog analytics
* User notifications
* Dark/light theme customization
* SEO optimization
* Improved accessibility
* Automated testing

---

# 👩‍💻 Developer

**Madhumita Das**

B.Tech — Computer Science & Engineering

Aspiring **MERN Stack / Full Stack Developer**

Interested in building real-world applications using:

```text
React
Next.js
Node.js
Express.js
MongoDB
TypeScript
```

---

## ⭐ Support

If you find this project useful or interesting, feel free to ⭐ the repository.

Thank you for checking out my project! 🙌
