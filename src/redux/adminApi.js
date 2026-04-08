import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}`,
  }),
  tagTypes: ["admin", "blogs"],
  endpoints: (builder) => {
    return {
      getProject: builder.query({
        query: () => {
          return {
            url: "/",
            method: "GET",
          };
        },
        transformResponse: (data) => data.result,
        providesTags: ["admin"],
      }),
      getAbout: builder.query({
        query: () => {
          return {
            url: "/about",
            method: "GET",
          };
        },
        transformResponse: (data) => data.result,
        providesTags: ["admin"],
      }),
      addProject: builder.mutation({
        query: (projectData) => {
          return {
            url: "/create-project",
            method: "POST",
            body: projectData,
          };
        },
        transformResponse: (data) => data.result,
        invalidatesTags: ["admin"],
      }),
      updateProject: builder.mutation({
        query: (projectData) => {
          return {
            url: `/modify-project/${projectData._id}`,
            method: "PUT",
            body: projectData,
          };
        },
        transformResponse: (data) => data.result,
        invalidatesTags: ["admin"],
      }),
      deleteProject: builder.mutation({
        query: (id) => {
          return {
            url: `/remove-project/${id}`,
            method: "DELETE",
          };
        },
        transformResponse: (data) => data.result,
        invalidatesTags: ["admin"],
      }),
      login: builder.mutation({
        query: (adminData) => {
          return {
            url: "/login",
            method: "POST",
            body: adminData,
          };
        },
        transformResponse: (data) => data.result,
        invalidatesTags: ["admin"],
      }),
      contactUs: builder.mutation({
        query: (contactUsData) => {
          return {
            url: "/contactUs",
            method: "POST",
            body: contactUsData,
          };
        },
        transformResponse: (data) => data.result,
        invalidatesTags: ["admin"],
      }),
      getContactUs: builder.query({
        query: () => {
          return {
            url: "/getContactUs",
            method: "GET",
          };
        },
        transformResponse: (data) => data.result,
        invalidatesTags: ["admin"],
      }),
      addBlog: builder.mutation({
        query: (projectData) => {
          return {
            url: "/create-blog",
            method: "POST",
            body: projectData,
          };
        },
        transformResponse: (data) => data.result,
        invalidatesTags: ["blogs"],
      }),
      getAllBlogs: builder.query({
        query: () => {
          return {
            url: "/getAllBlogs",
            method: "GET",
          };
        },
        transformResponse: (data) => data.result,
        providesTags: ["admin"],
      }),
    };
  },
});

export const {
  useGetProjectQuery,
  useGetAboutQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useLoginMutation,
  useContactUsMutation,
  useGetContactUsQuery,
  useAddBlogMutation,
  useGetAllBlogsQuery,
} = adminApi;
