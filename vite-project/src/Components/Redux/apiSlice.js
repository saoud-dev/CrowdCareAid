import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dev.api.crowdcareaid.com/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userData) => ({
        url: "/signUp",
        method: "POST",
        body: userData,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: "/verifyOtp",
        method: "POST",
        body: otpData,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    resendOtp: builder.mutation({
      query: (email) => ({
        url: "/resendOtp",
        method: "POST",
        body: { email },
        headers: { "Content-Type": "application/json" },
      }),
    }),

    login: builder.mutation({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/forgotPassword",
        method: "POST",
        body: { email },
        headers: { "Content-Type": "application/json" },
      }),
    }),

    resetPassword: builder.mutation({
      query: (passwordData) => ({
        url: "/resetPassword",
        method: "POST",
        body: passwordData,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/changePassword",
        method: "PATCH",
        body: passwordData,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    getallCampaigns: builder.query({
      query: () => "/getAllCampaigns",
    }),

    getCategories: builder.query({
      query: () => "/getCategories",
    }),

    createCampaign: builder.mutation({
      query: (campaignData) => ({
        url: "/createCampaign",
        method: "POST",
        body: campaignData,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Post"],
    }),

    getAuthUserCampaign: builder.query({
      query: () => "/getAuthUserCampaign",
      providesTags: ["Post"],
    }),

    getDonationHistory: builder.query({
      query: () => "/myDonationHistory",
    }),

    getCampaignDonators: builder.query({
      query: (id) => `/getCampaignDonators/${id}`,
    }),

    updateCampaign: builder.mutation({
      query: (id) => ({
        url: `/updateCampaign/${id}`,
        method: "PUT",
        body: updatedData,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
    }),

    deleteAccount: builder.mutation({
      query: () => ({
        url: "/deleteAccount",
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }),
    }),

    UserProfile: builder.query({
      query: () => "/getUserProfile",
      providesTags: ["Post"],
    }),

    editProfile: builder.mutation({
      query: ({ data }) => ({
        url: "/editProfile",
        method: "PATCH",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Post"],
    }),

    deleteCampaign: builder.mutation({
      query: (id) => ({
        url: `/deleteCampaign/${id}`,
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Post"],
    }),

    getUserNotifications: builder.query({
      query: () => "/getUserNotifications",
    }),

    donate: builder.mutation({
      query: (donationData) => ({
        url: "/donate",
        method: "POST",
        body: donationData,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Post"],
    }),

    createReport: builder.mutation({
      query: (reportData) => ({
        url: "/createReport",
        method: "POST",
        body: reportData,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Post"],
    }),

    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/uploadImage",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLoginMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetallCampaignsQuery,
  useGetCategoriesQuery,
  useCreateCampaignMutation,
  useGetAuthUserCampaignQuery,
  useGetDonationHistoryQuery,
  useGetCampaignDonatorsQuery,
  useUpdateCampaignMutation,
  useLogoutMutation,
  useDeleteAccountMutation,
  useUserProfileQuery,
  useEditProfileMutation,
  useDeleteCampaignMutation,
  useGetUserNotificationsQuery,
  useDonateMutation,
  useCreateReportMutation,
  useUploadImageMutation,
  useChangePasswordMutation,
} = apiSlice;
