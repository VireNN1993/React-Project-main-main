// src/App.tsx
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "./auth/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter basename="/React-Project-main-main">
      <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
        <AuthProvider>
          {/* Navbar קבוע בחלק העליון */}
          <header className="sticky top-0 z-50">
            <Navbar />
          </header>

          {/* התוכן הראשי */}
          <main className="flex-grow">
            <AppRouter />
          </main>

          {/* Footer */}
          <Footer />

          {/* Toast notifications */}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
