import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAddBookMutation } from "../features/books/booksApi";
import { toast } from "react-toastify";

const genreOptions = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

const AddBook = () => {
  const navigate = useNavigate();
  const [addBook] = useAddBookMutation();

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "copies" ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBook({ ...form }).unwrap();
      toast.success("Book added successfully!");
      navigate("/");
    } catch (error: unknown) {
      interface ErrorWithMessage {
        data: {
          message: string;
        };
      }
      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as ErrorWithMessage).data === "object" &&
        (error as ErrorWithMessage).data !== null &&
        "message" in (error as ErrorWithMessage).data
      ) {
        toast.error((error as ErrorWithMessage).data.message);
      } else {
        toast.error("Failed to add book");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="genre"
          value={form.genre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">-- Select Genre --</option>
          {genreOptions.map((genre) => (
            <option key={genre} value={genre}>
              {genre.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())}
            </option>
          ))}
        </select>
        <input
          name="isbn"
          value={form.isbn}
          onChange={handleChange}
          placeholder="ISBN"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="copies"
          type="number"
          value={form.copies}
          onChange={handleChange}
          placeholder="Copies"
          className="w-full border p-2 rounded"
          min="1"
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
