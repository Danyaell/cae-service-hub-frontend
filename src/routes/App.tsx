import Header from "../components/Header/Header";
import Home from "../pages/Home/Home";
import CreateReport from "../pages/CreateReport/CreateReport";
import CreateRequest from "../pages/CreateRequest/CreateRequest";
import Result from "../pages/Result/Result";
import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Footer from "../components/Footer/Footer";
import Login from "../pages/Login/Login";
import { useAuthStrore } from "../store/login.store";
import Reports from "../pages/Reports/Reports";
import Requests from "../pages/Requests/Requests";
import { useEffect } from "react";

function App() {
  const initialize = useAuthStrore((state) => state.initialize);
  const user = useAuthStrore((state) => state.user);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className={styles.documentContainer}>
      <Header />
      <div className={styles.container}>
        <div className={styles.backgroundColored}></div>
      </div>
      <div className={styles.bodyConainer}>
        <Routes>
          <Route path="/" element={<Home />} />
          {user && <Route path="/reports" element={<Reports />} />}
          <Route path="/create-report" element={<CreateReport />} />
          {user && <Route path="/requests" element={<Requests />} />}
          <Route path="/create-request" element={<CreateRequest />} />
          <Route path="/result" element={<Result />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <div className={styles.footContainer}>
        <div className={styles.backgroundColored}></div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
