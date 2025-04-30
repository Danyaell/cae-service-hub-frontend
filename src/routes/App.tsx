import Navbar from "../components/Navbar";
import Home from "../pages/Home/Home";
import Reports from "../pages/Reports/Reports";
import Requests from "../pages/Requests/Requests";
import Result from "../pages/Result/Result";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
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
