import { apiSlice } from './apiSlice';
const PATIENT_URL = '/api/patient';

export const patientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    

    bookAppointment: builder.mutation({
      query: (data) => ({
        url: `${PATIENT_URL}/book-appointment`,
        method: 'POST',
        body: data,
      }),
    }),

    sendConfirmEmail: builder.mutation({
        query: (data) => ({
          url: `${PATIENT_URL}/send-confirm-email`,
          method: 'POST',
          body: data,
        }),
      }),

      verifyEmail: builder.mutation({
        query: (data) => ({
          url: `${PATIENT_URL}/verify`,
          method: 'POST',
          body: data,
        }),
      }),

    

  }),
});

export const {
  
  useBookAppointmentMutation,
  useSendConfirmEmailMutation,
  useVerifyEmailMutation,
  
} = patientApiSlice;
