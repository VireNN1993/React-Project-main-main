// src/App.tsx
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import Navbar from "./components/Navbar";
import AuthProvider from "./auth/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter basename="/React-Project-main-main">
      {" "}
      {/* שים כאן את השם של הריפו שלך ב־GitHub */}
      <AuthProvider>
        <Navbar />
        <AppRouter />
        <ToastContainer position="top-center" />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
