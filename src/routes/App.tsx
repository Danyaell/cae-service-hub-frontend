import Header from "../components/Header/Header";
import Home from "../pages/Home/Home";
import CreateReport from "../pages/Reports/CreateReport/CreateReport";
import CreateRequest from "../pages/Requests/CreateRequest/CreateRequest";
import Result from "../pages/Result/Result";
import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Footer from "../components/Footer/Footer";
import Login from "../pages/Login/Login";
import { useAuthStrore } from "../store/login.store";
import Reports from "../pages/Reports/Reports";
import Requests from "../pages/Requests/Requests";
import { useEffect } from "react";
import EditReport from "../pages/Reports/EditReport/EditReport";
import EditRequest from "../pages/Requests/EditRequest/EditRequest";

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
          {user && <Route path="/edit-report/:id" element={<EditReport />} />}
          <Route path="/create-report" element={<CreateReport />} />
          {user && <Route path="/requests" element={<Requests />} />}
          {user && <Route path="/edit-request/:id" element={<EditRequest />} />}
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
