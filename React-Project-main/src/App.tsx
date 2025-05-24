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
      <div className="flex min-h-screen flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">
            <AppRouter />
          </main>
          <Footer />
          <ToastContainer position="top-center" />
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
