import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "./Pages/Users";
import Products from "./Pages/Products";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
