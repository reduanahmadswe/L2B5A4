import { useParams, useNavigate } from "react-router-dom";
import { useGetBookQuery } from "../features/books/booksApi";
import { useBorrowBookMutation } from "../features/borrow/borrowApi";
import { useState } from "react";
import { toast } from "react-toastify";

const Borrow = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading, isError } = useGetBookQuery(bookId!);
  const [borrowBook] = useBorrowBookMutation();

  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!book) {
      toast.error("Book not found");
      return;
    }

    if (quantity < 1 || quantity > book.copies) {
      toast.error("Invalid quantity");
      return;
    }

    if (!dueDate) {
      toast.error("Due date is required");
      return;
    }

    try {
      await borrowBook({
        book: bookId!,
        quantity,
        dueDate,
      }).unwrap();

      toast.success("Book borrowed successfully");
      navigate("/borrow-summary");
    } catch (err: unknown) {
      let errorMessage = "Failed to borrow book";
      if (
        err &&
        typeof err === "object" &&
        "data" in err &&
        err.data &&
        typeof (err as { data: unknown }).data === "object" &&
        "message" in (err as { data: { message?: string } }).data
      ) {
        errorMessage = ((err as { data: { message?: string } }).data.message) || errorMessage;
      }
      toast.error(errorMessage);
    }
  };

  if (isLoading) return <p className="p-4">Loading book details...</p>;
  if (isError || !book)
    return <p className="p-4 text-red-600">Error loading book</p>;

   return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Borrow Book</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">{book.title}</h2>
          <p className="text-gray-600">By {book.author}</p>
          <p className="text-sm text-gray-500 mt-2">
            Available Copies: <span className="font-medium">{book.copies}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              min="1"
              max={book.copies}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Borrow Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Borrow;
