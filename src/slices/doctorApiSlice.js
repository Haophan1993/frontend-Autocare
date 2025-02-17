import { apiSlice } from './apiSlice';
const DOCTOR_URL = '/api/doctor';

export const doctorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    

    getDoctors: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}/top-doctor-home`,
        method: 'GET',
        body: data,
      }),
    }),

    saveDoctorInfor: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}/save-doctor-infor`,
        method: 'POST',
        body: data,
      }),
    }),

    createBulkSchedule: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}/create-bulk-schedule`,
        method: 'POST',
        body: data,
      }),
    }),

    

  }),
});

export const {
  
  useGetDoctorsMutation,
  useSaveDoctorInforMutation,
  useCreateBulkScheduleMutation,
  
} = doctorApiSlice;
