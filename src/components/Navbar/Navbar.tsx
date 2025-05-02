import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav>
      <ul className={styles.nav}>
        <li>
          <Link to="/">
            <button className={styles.navButton}>Home</button>
          </Link>
        </li>
        <li>
          <Link to="/reports">
            <button className={styles.navButton}>Reportes</button>
          </Link>
        </li>
        <li>
          <Link to="/requests">
            <button className={styles.navButton}>Solicitudes</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
