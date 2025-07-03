import { useParams, Link } from "react-router-dom";
import { useGetBookQuery } from "../features/books/booksApi";

const BookDetails = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useGetBookQuery(id!);

  if (isLoading) return <p className="p-4">Loading book details...</p>;
  if (isError || !book)
    return <p className="p-4 text-red-600">Failed to load book details.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>

      <p className="mb-2"><strong>Author:</strong> {book.author}</p>
      <p className="mb-2"><strong>Genre:</strong> {book.genre}</p>
      {/* <p className="mb-2"><strong>Publication Date:</strong> {book.publishedDate}</p> */}
      <p className="mb-2"><strong>ISBN:</strong> {book.isbn}</p>
      <p className="mb-2"><strong>Copies Available:</strong> {book.copies}</p>
      {/* <p className="mb-4"><strong>Status:</strong> {book.status}</p> */}

      <div className="flex gap-4 mt-6">
        <Link
          to={`/edit-book/${book._id}`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </Link>

        <Link
          to={`/borrow/${book._id}`}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Borrow
        </Link>
      </div>
    </div>
  );
};

export default BookDetails;
