import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <div className="text-lg font-bold">
        <Link to="/">Library System</Link>
      </div>
      <div className="space-x-4">
        <Link to="/books">All Books</Link>
        <Link to="/create-book">Add Book</Link>
        <Link to="/borrow-summary">Borrow Summary</Link>
      </div>
    </nav>
  );
};

export default Navbar;
