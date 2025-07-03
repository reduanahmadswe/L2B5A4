// pages/EditBook.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useGetBookQuery, useUpdateBookMutation } from "../features/books/booksApi";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading, isError } = useGetBookQuery(id!);
  const [updateBook] = useUpdateBookMutation();
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
  });

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description,
        copies: book.copies,
      });
    }
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBook({ id: id!, book: { ...form, copies: Number(form.copies) } }).unwrap();
      toast.success("Book updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update book");
    }
  };

  if (isLoading) return <p className="p-4">Loading book details...</p>;
  if (isError) return <p className="p-4 text-red-600">Error loading book details</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        {/* Add similar fields for other properties */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;