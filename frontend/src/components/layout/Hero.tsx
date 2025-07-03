import { Link } from "react-router-dom";
import { FiBookOpen } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative bg-sky-50 text-sky-900 py-24 overflow-hidden">
      
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://www.samdu.uz/upload/cover-images/63b451b1cbc7f-63b451b1cbc82-63b451b1cbc83-63b451b1cbc84.jpg')",
        }}
      ></div>


      {/* ✅ Foreground Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon and heading */}
          <div className="flex justify-center mb-6">
            <FiBookOpen className="text-sky-100 text-5xl" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
            Discover Your Next Great Read
          </h1>

          <p className="text-xl mb-8 text-sky-100">
            Explore our vast collection of books and manage your personal library
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/books"
              className="px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors shadow-lg flex items-center justify-center"
            >
              Browse Collection
            </Link>
            <Link
              to="/create-book"
              className="px-8 py-3 border-2 border-sky-100 hover:bg-sky-100 hover:text-sky-900 font-semibold rounded-lg transition-colors flex items-center justify-center text-sky-100"
            >
              Add New Book
            </Link>
          </div>
        </div>
      </div>

      {/* Optional: Animated floating book icons */}
      <div className="absolute bottom-0 left-0 w-full h-20 overflow-hidden z-10">
        {['📚', '📖', '🖋️', '📕', '📗', '📘', '📙','📚', '📖', '🖋️', '📕', '📗', '📘', '📙'].map((icon, index) => (
          <div
            key={index}
            className="absolute text-2xl opacity-70 text-sky-100"
            style={{
              bottom: '10%',
              left: `${Math.random() * 100}%`,
              animation: `float ${6 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      {/* CSS for floating animation */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
