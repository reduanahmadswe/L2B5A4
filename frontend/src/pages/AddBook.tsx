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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Add New Book</h1>
          <p className="mt-2 text-sm text-gray-600">Fill in the details below to add a new book to the library</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={form.title}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    placeholder="Enter book title"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                  Author *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="author"
                    id="author"
                    value={form.author}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    placeholder="Enter author name"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                  Genre *
                </label>
                <div className="mt-1">
                  <select
                    id="genre"
                    name="genre"
                    value={form.genre}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    required
                  >
                    <option value="">Select a genre</option>
                    {genreOptions.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
                  ISBN *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="isbn"
                    id="isbn"
                    value={form.isbn}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    placeholder="Enter ISBN number"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="copies" className="block text-sm font-medium text-gray-700">
                  Copies Available *
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="copies"
                    id="copies"
                    min="1"
                    value={form.copies}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={form.description}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    placeholder="Enter book description"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;