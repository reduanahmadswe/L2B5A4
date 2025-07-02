import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available?: boolean;
}

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    getBooks: builder.query<IBook[], void>({
      query: () => '/books',
      providesTags: ['Books'],
    }),
    getBook: builder.query<IBook, string>({
      query: (id) => `/books/${id}`,
      providesTags: ['Books'],
    }),
    addBook: builder.mutation<IBook, Partial<IBook>>({
      query: (newBook) => ({
        url: '/books',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['Books'],
    }),
    updateBook: builder.mutation<IBook, { id: string; book: Partial<IBook> }>({
      query: ({ id, book }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: book,
      }),
      invalidatesTags: ['Books'],
    }),
    deleteBook: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;
