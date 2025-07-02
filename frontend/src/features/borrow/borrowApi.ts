import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface BorrowPayload {
  bookId: string;
  quantity: number;
  dueDate: string;
}

interface BorrowSummary {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['Borrow'],
  endpoints: (builder) => ({
    borrowBook: builder.mutation({
      query: (payload: BorrowPayload) => ({
        url: '/borrow',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Borrow'],
    }),
    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => '/borrow',
      providesTags: ['Borrow'],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
