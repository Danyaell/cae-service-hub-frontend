import { NavLink } from "react-router-dom";
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
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.navButtonActive : styles.navButton
              }
            >
              INICIO
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                isActive ? styles.navButtonActive : styles.navButton
              }
            >
              REPORTES
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/requests"
              className={({ isActive }) =>
                isActive ? styles.navButtonActive : styles.navButton
              }
            >
              SOLICITUDES
            </NavLink>
          </li>
          <li>
            <NavLink to="/help" className={styles.navButtonHelp}>
              LOGIN
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
