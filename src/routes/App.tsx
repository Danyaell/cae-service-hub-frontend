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

function App() {
  const user = useAuthStrore((state) => state.user);

  return (
    <div className={styles.documentContainer}>
      <Header />
      <div className={styles.container}>
        <div className={styles.backgroundColored}></div>
      </div>
      <div className={styles.bodyConainer}>
        <Routes>
          <Route path="/" element={<Home />} />
          {user && <Route path="/reports" element={<CreateReport />} />}
          <Route path="/createReport" element={<CreateReport />} />
          {user && <Route path="/requests" element={<CreateRequest />} />}
          <Route path="/createRequest" element={<CreateRequest />} />
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
