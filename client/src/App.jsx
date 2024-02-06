import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import { LandingPage } from "./Pages/Landingpage";
import { Register } from "./Pages/Register";
import { Login } from "./Pages/Login";
import { Nopage } from "./Pages/NoPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";
import { NavBar } from "./components/Navbar";
import { Email } from "./Pages/reset/Email";
import { ChangePassword } from "./Pages/reset/Chamgepassword";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email" element={<Email />} />
          <Route path="/reset-password" element={<ChangePassword />} />
          <Route path="/dashboard" element={<LandingPage />} />

          <Route path="/*" element={<Nopage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
};

export default App;
