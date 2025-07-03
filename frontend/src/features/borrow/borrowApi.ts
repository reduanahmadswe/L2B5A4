import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { booksApi } from '../books/booksApi'; // ✅ Import booksApi to access its cache

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
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Borrow', 'Books'],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<
      void,
      { book: string; quantity: number; dueDate: string }
    >({
      query: (body) => ({
        url: '/api/borrow',
        method: 'POST',
        body,
      }),
      // Update book caches after successful borrow
      async onQueryStarted({ book, quantity }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          
          dispatch(
            booksApi.util.updateQueryData('getBook', book, (draft) => {
              draft.copies -= quantity;
              draft.available = draft.copies > 0;
            })
          );

          
          dispatch(
            booksApi.util.updateQueryData('getBooks', { page: 1, limit: 10 }, (books) => {
              const bookToUpdate = books.find((b) => b._id === book);
              if (bookToUpdate) {
                bookToUpdate.copies -= quantity;
                bookToUpdate.available = bookToUpdate.copies > 0;
              }
            })
          );
        } catch (error) {
          console.error('Failed to update cache after borrowing:', error);
        }
      },
    }),

    getBorrowSummary: builder.query<BorrowSummaryItem[], void>({
      query: () => '/api/borrow',
      transformResponse: (response: BorrowSummaryResponse) => response.data,
      providesTags: ['Borrow'],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
