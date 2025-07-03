
import { useParams, useNavigate } from "react-router-dom";
import { useDeleteBookMutation, useGetBookQuery } from "../features/books/booksApi";
import { toast } from "react-toastify";

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: book, isLoading, isError } = useGetBookQuery(id!);
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      await deleteBook(id!).unwrap();
      toast.success("Book deleted successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete the book");
    }
  };

  if (isLoading) return <p className="p-4">Loading book details...</p>;
  if (isError || !book) return <p className="p-4 text-red-600">Error loading book</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Delete Book</h1>
      <p>Are you sure you want to delete <strong>{book.title}</strong> by {book.author}?</p>
      <div className="mt-4 space-x-4">
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Yes, Delete
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-400 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
