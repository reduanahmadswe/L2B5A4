import { useParams, useNavigate } from "react-router-dom";
import { useGetBookQuery, useUpdateBookMutation } from "../features/books/booksApi";
import { useState, useEffect } from "react";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book } = useGetBookQuery(id!);
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
    await updateBook({ id: id!, book: { ...form, copies: Number(form.copies) } });
    navigate("/");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input name="title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="author" value={form.author} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="genre" value={form.genre} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="isbn" value={form.isbn} onChange={handleChange} className="w-full border p-2 rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="copies" type="number" value={form.copies} onChange={handleChange} className="w-full border p-2 rounded" min="0" />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
