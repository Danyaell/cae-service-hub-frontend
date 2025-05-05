import Header from "../components/Header/Header";
import Home from "../pages/Home/Home";
import Reports from "../pages/Reports/Reports";
import Requests from "../pages/Requests/Requests";
import Result from "../pages/Result/Result";
import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Footer from "../components/Footer/Footer";

function App() {
  return (
    <div className={styles.documentContainer}>
      <Header />
      <div className={styles.container}>
        <div className={styles.backgroundColored}></div>
      </div>
      <div className={styles.bodyConainer}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/result" element={<Result />} />
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
