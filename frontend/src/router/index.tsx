import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Books from "../pages/Books";
import AddBook from "../pages/AddBook";
import EditBook from "../pages/EditBook";
import Borrow from "../pages/Borrow";
import BorrowSummary from "../pages/BorrowSummary";
import BookDetails from "../pages/BookDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Books },
      { path: "books", Component: Books },
      { path: "books/:id", Component: BookDetails },
      { path: "create-book", Component: AddBook },
      { path: "edit-book/:id", Component: EditBook },
      { path: "borrow/:bookId", Component: Borrow },
      { path: "borrow-summary", Component: BorrowSummary },
    ],
  },
]);

export default router;
