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




// UI/UX
// Minimalist UI: clean and featureful UI using Tailwind CSS or plain CSS.
// User Experience: Easy navigation between pages, clearly labeled buttons, and simple forms.
// Responsive: The layout must be fully responsive and adapt seamlessly to mobile, tablet, and desktop devices.
// Frontend	React + TypeScript
// Styling	Tailwind CSS or any basic CSS framework