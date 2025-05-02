import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.logo}>
        <img src="../../../public/logo-unam.png" className={styles.logoUnam} />
        <img src="../../../public/logo-fes.png" className={styles.logoFes} />
      </div>
      <nav>
        <ul className={styles.nav}>
          <li>
            <Link to="/">
              <button className={styles.navButton}>INICIO</button>
            </Link>
          </li>
          <li>
            <Link to="/reports">
              <button className={styles.navButton}>REPORTES</button>
            </Link>
          </li>
          <li>
            <Link to="/requests">
              <button className={styles.navButton}>SOLICITUDES</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
