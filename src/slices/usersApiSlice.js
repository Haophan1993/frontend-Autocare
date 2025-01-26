import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),

    getAlluser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/get-all-user`,
        method: 'GET',
        body: data,
      }),
    }),

    deleteUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/delete-user`,
        method: 'DELETE',
        body: data,
      }),
    }),

    editUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/edit-user`,
        method: 'PUT',
        body: data,
      }),
    }),

    getAllCodes: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/allcodes`,
        method: 'POST',
        body: data,
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetAlluserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetAllCodesMutation,
} = userApiSlice;
