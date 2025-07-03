// features/borrow/borrowApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface BorrowSummaryItem {
  book: { title: string; isbn: string };
  totalQuantity: number;
}

interface BorrowSummaryResponse {
  success: boolean;
  data: BorrowSummaryItem[];
}

export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({
    //baseUrl: 'https://library-management-ten-beta.vercel.app/api',
    baseUrl: 'http://localhost:5000',
  }),
  tagTypes: ['Borrow'],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<void, { book: string; quantity: number; dueDate: string }>({
      query: (body) => ({
        url: '/api/borrow',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Borrow'],
    }),
    getBorrowSummary: builder.query<BorrowSummaryItem[], void>({
      query: () => '/api/borrow',
      transformResponse: (response: BorrowSummaryResponse) => response.data,
      providesTags: ['Borrow'],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;