import { Link } from "react-router-dom";
import { useGetBooksQuery, useDeleteBookMutation } from "../features/books/booksApi";

const Books = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  if (isLoading) return <p className="p-4">Loading books...</p>;
  if (isError) return <p className="p-4 text-red-600">Error loading books</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Books</h1>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Author</th>
            <th className="p-2 border">Genre</th>
            <th className="p-2 border">ISBN</th>
            <th className="p-2 border">Copies</th>
            <th className="p-2 border">Available</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book) => (
            <tr key={book._id} className="border-b">
              <td className="p-2 border">{book.title}</td>
              <td className="p-2 border">{book.author}</td>
              <td className="p-2 border">{book.genre}</td>
              <td className="p-2 border">{book.isbn}</td>
              <td className="p-2 border">{book.copies}</td>
              <td className="p-2 border">{book.available ? "Yes" : "No"}</td>
              <td className="p-2 border space-x-2">
                <Link
                  to={`/edit-book/${book._id}`}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteBook(book._id!)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
                <Link
                  to={`/borrow/${book._id}`}
                  className="px-2 py-1 bg-green-600 text-white rounded"
                >
                  Borrow
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
