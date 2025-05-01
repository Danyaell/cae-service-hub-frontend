import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav>
      <ul className={styles.nav}>
        <li>
          <Link to="/">
            <button>Home</button>
          </Link>
        </li>
        <li>
          <Link to="/reports">
            <button>Reportes</button>
          </Link>
        </li>
        <li>
          <Link to="/requests">
            <button>Solicitudes</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
