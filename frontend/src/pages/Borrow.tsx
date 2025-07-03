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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Borrow Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <p className="text-lg font-semibold">{book.title}</p>
          <p className="text-gray-600">By {book.author}</p>
          <p className="text-sm mt-1 text-gray-500">
            Available Copies: {book.copies}
          </p>
        </div>

        <div>
          <label className="block mb-1">Quantity</label>
          <input
            type="number"
            min="1"
            max={book.copies}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Borrow
        </button>
      </form>
    </div>
  );
};

export default Borrow;
