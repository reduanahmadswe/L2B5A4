// pages/EditBook.tsx
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetBookQuery,
  useUpdateBookMutation,
} from "../features/books/booksApi";
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBook({
        id: id!,
        book: {
          ...form,
          copies: Number(form.copies),
          available: Number(form.copies) > 0,
        },
      }).unwrap();
      toast.success("Book updated successfully");
      navigate("/");
    } catch {
      toast.error("Failed to update book");
    }
  };

  if (isLoading) return <p className="p-4">Loading book details...</p>;
  if (isError)
    return <p className="p-4 text-red-600">Error loading book details</p>;

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
        <div>
          <label className="block mb-1">Author</label>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Genre</label>
          <select
            name="genre"
            value={form.genre}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select Genre --</option>
            <option value="FICTION">Fiction</option>
            <option value="NON_FICTION">Non-fiction</option>
            <option value="SCIENCE">Science</option>
            <option value="HISTORY">History</option>
            <option value="BIOGRAPHY">Biography</option>
            <option value="FANTASY">Fantasy</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">ISBN</label>
          <input
            name="isbn"
            value={form.isbn}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Copies</label>
          <input
            name="copies"
            type="number"
            min="0"
            value={form.copies}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

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
