// App.tsx
import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div className="max-w-6xl mx-auto">
      <Navbar />
      <ToastContainer position="bottom-right" autoClose={3000} />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}