import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-sky-950 p-4 text-white shadow-md z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-bold mb-4 md:mb-0">
          <Link to="/" className="hover:text-indigo-200 transition-colors">
            LibroVault
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <Link 
            to="/books" 
            className="px-3 py-1 rounded hover:bg-sky-900 transition-colors"
          >
            All Books
          </Link>
          <Link 
            to="/create-book" 
            className="px-3 py-1 rounded hover:bg-sky-900 transition-colors"
          >
            Add Book
          </Link>
          <Link 
            to="/borrow-summary" 
            className="px-3 py-1 rounded hover:bg-sky-900 transition-colors"
          >
            Borrow Summary
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
