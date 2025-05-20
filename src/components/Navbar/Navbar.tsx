import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuthStrore } from "../../store/login.store";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const user = useAuthStrore(state => state.user);

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
            {!user && (
              <NavLink to="/login" className={styles.navButtonLogin}>
              LOGIN
            </NavLink>
            ) || user && (
              <button className={styles.navUserButton}>
                <FaUserCircle className={styles.navUserIcon}/>
              </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
