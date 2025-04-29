import Home from "../pages/Home/Home";
import Reports from "../pages/Reports/Reports";
import Requests from "../pages/Requests/Requests";
import Result from "../pages/Result/Result";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <>
        <Link to="/">Home</Link>
        <Link to="/reports">Reportes</Link>
        <Link to="/requests">Solicitudes</Link>
      </>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </>
  );
}

export default App;
