import { useParams, Link } from "react-router-dom";
import { useGetBookQuery } from "../features/books/booksApi";

const BookDetails = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useGetBookQuery(id!);

  if (isLoading) return <p className="p-4">Loading book details...</p>;
  if (isError || !book)
    return <p className="p-4 text-red-600">Failed to load book details.</p>;

   return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{book.title}</h1>
          <p className="text-gray-600 mb-6">By {book.author}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Genre</h2>
              <p className="text-gray-900">{book.genre}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">ISBN</h2>
              <p className="text-gray-900">{book.isbn}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Copies Available</h2>
              <p className="text-gray-900">{book.copies}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Status</h2>
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {book.available ? "Available" : "Unavailable"}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-500">Description</h2>
            <p className="text-gray-900 mt-1">{book.description}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to={`/edit-book/${book._id}`}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit
            </Link>
            <Link
              to={`/borrow/${book._id}`}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Borrow
            </Link>
            <Link
              to="/"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookDetails;
