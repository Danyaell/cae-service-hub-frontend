import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Navbar />
      <div>
        <h1 className={styles.title}>Sistema del CAE</h1>
        <p className={styles.subtitle}>CENTRO DE APOYO EXTRACURRICULAR</p>
      </div>
      <div>
        <Link to="/reports">
          <button className={styles.linkButton}>REPORTES</button>
        </Link>
      </div>
      <div>
        <Link to="/requests">
          <button className={styles.linkButton}>SOLICITUDES</button>
        </Link>
      </div>
    </header>
  );
}
