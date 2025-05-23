import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-10 bg-gray-100 py-4 shadow-inner dark:bg-gray-800">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-300">
        <p>&copy; {new Date().getFullYear()} כל הזכויות שמורות | אתר הדוגמה</p>
        <div className="mt-2 space-x-4">
          <Link to="/about" className="hover:underline">
            אודות
          </Link>
          <Link to="/" className="hover:underline">
            דף הבית
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
