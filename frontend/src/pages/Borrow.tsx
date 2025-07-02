import { useParams, useNavigate } from "react-router-dom";
import { useGetBookQuery } from "../features/books/booksApi";
import { useBorrowBookMutation } from "../features/borrow/borrowApi";
import { useState } from "react";

const Borrow = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { data: book } = useGetBookQuery(bookId!);
  const [borrowBook] = useBorrowBookMutation();
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity > (book?.copies || 0)) {
      alert("Quantity exceeds available copies");
      return;
    }
    await borrowBook({ bookId: bookId!, quantity, dueDate });
    navigate("/borrow-summary");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Borrow Book</h1>
      {book && (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <p><strong>{book.title}</strong> by {book.author}</p>
          <input type="number" value={quantity} min="1" max={book.copies} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full border p-2 rounded" />
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full border p-2 rounded" required />
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Borrow</button>
        </form>
      )}
    </div>
  );
};

export default Borrow;
